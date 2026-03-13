import { AnsweredQuestion, Question, QuizAttempt, TopicBreakdown } from "./types";

export function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function computeAttempt(
  id: string,
  answers: AnsweredQuestion[],
  questions: Question[],
  testNumber: number
): QuizAttempt {
  const correctCount = answers.filter((a) => a.isCorrect).length;
  const totalQuestions = answers.length;
  const scorePercent = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

  const topicMap = new Map<string, TopicBreakdown>();
  for (const answer of answers) {
    const q = questions.find((q) => q.id === answer.questionId);
    if (!q) continue;
    const existing = topicMap.get(q.topic) ?? { topic: q.topic, correct: 0, total: 0 };
    topicMap.set(q.topic, {
      ...existing,
      correct: existing.correct + (answer.isCorrect ? 1 : 0),
      total: existing.total + 1,
    });
  }

  return {
    id,
    completedAt: new Date().toISOString(),
    testNumber,
    totalQuestions,
    correctCount,
    scorePercent,
    passed: scorePercent >= 75,
    topicBreakdown: Array.from(topicMap.values()),
    answers,
  };
}

const SESSION_KEY = "canada-quiz-active";

export function saveSessionSnapshot(session: object): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } catch {
    // ignore
  }
}

export function loadSessionSnapshot<T>(): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

export function clearSessionSnapshot(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(SESSION_KEY);
}

export function topicLabel(topic: string): string {
  const labels: Record<string, string> = {
    "rights-and-responsibilities": "Rights & Responsibilities",
    history: "History",
    government: "Government",
    geography: "Geography",
    economy: "Economy",
    symbols: "Symbols",
  };
  return labels[topic] ?? topic;
}
