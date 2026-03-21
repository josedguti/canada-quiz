"use client";

import { useCallback, useEffect, useState } from "react";
import { questions as allQuestions } from "@/lib/questions";
import { clampTestNumber, getQuestionsForTest } from "@/lib/quiz-config";
import {
  clearSessionSnapshot,
  computeAttempt,
  loadSessionSnapshot,
  saveSessionSnapshot,
} from "@/lib/quiz-utils";
import { appendAttempt } from "@/lib/storage";
import { AnsweredQuestion, Question, QuizAttempt, QuizSession } from "@/lib/types";

function buildSession(testNumber: number): QuizSession {
  const clampedTest = clampTestNumber(testNumber);
  const testQuestions = getQuestionsForTest(allQuestions, clampedTest);

  return {
    id: crypto.randomUUID(),
    startedAt: new Date().toISOString(),
    questionIds: testQuestions.map((q) => q.id),
    answers: [],
    currentIndex: 0,
    isComplete: false,
    testNumber: clampedTest,
  };
}

function getOrderedQuestions(session: QuizSession): Question[] {
  return session.questionIds.map(
    (id) => allQuestions.find((q) => q.id === id)!
  );
}

export type AnswerState = "unanswered" | "answered";

interface QuizSessionState {
  session: QuizSession;
  orderedQuestions: Question[];
  currentQuestion: Question;
  answerState: AnswerState;
  selectedIndex: number | null;
  isLastQuestion: boolean;
  completedAttempt: QuizAttempt | null;
  recordAnswer: (index: number) => void;
  advance: () => QuizAttempt | null;
}

export function useQuizSession(testNumber: number = 1): QuizSessionState {
  const clampedTestNumber = clampTestNumber(testNumber);

  const [session, setSession] = useState<QuizSession>(() => {
    const snapshot = loadSessionSnapshot<QuizSession>();
    if (snapshot && !snapshot.isComplete && snapshot.testNumber === clampedTestNumber) {
      return snapshot;
    }

    return buildSession(clampedTestNumber);
  });

  const [answerState, setAnswerState] = useState<AnswerState>("unanswered");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [completedAttempt, setCompletedAttempt] = useState<QuizAttempt | null>(null);

  const orderedQuestions = getOrderedQuestions(session);
  const currentQuestion = orderedQuestions[session.currentIndex];
  const isLastQuestion = session.currentIndex === session.questionIds.length - 1;

  useEffect(() => {
    saveSessionSnapshot(session);
  }, [session]);

  const recordAnswer = useCallback(
    (index: number) => {
      if (answerState === "answered") return;
      const isCorrect = index === currentQuestion.correctIndex;
      const answered: AnsweredQuestion = {
        questionId: currentQuestion.id,
        selectedIndex: index,
        isCorrect,
      };
      setSelectedIndex(index);
      setAnswerState("answered");
      setSession((prev) => ({
        ...prev,
        answers: [...prev.answers, answered],
      }));
    },
    [answerState, currentQuestion]
  );

  const advance = useCallback((): QuizAttempt | null => {
    if (isLastQuestion) {
      const attempt = computeAttempt(session.id, session.answers, orderedQuestions, session.testNumber);
      appendAttempt(attempt);
      clearSessionSnapshot();
      setCompletedAttempt(attempt);
      setSession((prev) => ({ ...prev, isComplete: true }));
      return attempt;
    }
    setAnswerState("unanswered");
    setSelectedIndex(null);
    setSession((prev) => ({ ...prev, currentIndex: prev.currentIndex + 1 }));
    return null;
  }, [isLastQuestion, session, orderedQuestions]);

  return {
    session,
    orderedQuestions,
    currentQuestion,
    answerState,
    selectedIndex,
    isLastQuestion,
    completedAttempt,
    recordAnswer,
    advance,
  };
}
