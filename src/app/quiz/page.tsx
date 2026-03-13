"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { QuizHeader } from "@/components/quiz/QuizHeader";
import { QuestionCard } from "@/components/quiz/QuestionCard";
import { Button } from "@/components/ui/Button";
import { useQuizSession } from "@/hooks/useQuizSession";

function QuizContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const testNumber = parseInt(searchParams.get("test") ?? "1", 10);
  const {
    session,
    currentQuestion,
    answerState,
    selectedIndex,
    isLastQuestion,
    recordAnswer,
    advance,
  } = useQuizSession(testNumber);

  if (session.isComplete) {
    return null;
  }

  function handleAdvance() {
    const attempt = advance();
    if (attempt) {
      router.push(`/results?id=${attempt.id}`);
    }
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="max-w-2xl mx-auto px-4 py-8 md:py-16">
        <QuizHeader
          current={session.currentIndex + 1}
          total={session.questionIds.length}
          topic={currentQuestion.topic}
          testNumber={testNumber}
          onQuit={() => router.push("/")}
        />

        <QuestionCard
          question={currentQuestion}
          selectedIndex={selectedIndex}
          isRevealed={answerState === "answered"}
          onSelect={recordAnswer}
        />

        {answerState === "answered" && (
          <div className="mt-5 flex justify-end">
            <Button onClick={handleAdvance}>
              {isLastQuestion ? "See Results" : "Next Question"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function QuizPage() {
  return (
    <Suspense>
      <QuizContent />
    </Suspense>
  );
}
