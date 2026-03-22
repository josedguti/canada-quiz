export type Topic =
  | "rights-and-responsibilities"
  | "history"
  | "government"
  | "geography"
  | "economy"
  | "symbols";

export type QuestionType =
  | "multiple-choice"
  | "true-false"
  | "fill-in-the-blank";

export interface Question {
  id: string;
  type: QuestionType;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  studyGuidePage: number;
  topic: Topic;
}

export interface AnsweredQuestion {
  questionId: string;
  selectedIndex: number;
  isCorrect: boolean;
}

export interface QuizSession {
  id: string;
  startedAt: string;
  questionIds: string[];
  answers: AnsweredQuestion[];
  currentIndex: number;
  isComplete: boolean;
  testNumber: number;
}

export interface TopicBreakdown {
  topic: Topic;
  correct: number;
  total: number;
}

export interface QuizAttempt {
  id: string;
  completedAt: string;
  testNumber: number;
  totalQuestions: number;
  correctCount: number;
  scorePercent: number;
  passed: boolean;
  topicBreakdown: TopicBreakdown[];
  answers: AnsweredQuestion[];
}

export interface QuizHistory {
  version: number;
  attempts: QuizAttempt[];
}
