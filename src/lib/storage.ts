import { QuizAttempt, QuizHistory } from "./types";

const STORAGE_KEY = "canada-quiz-history";
const MAX_ATTEMPTS = 50;
const SCHEMA_VERSION = 1;

function emptyHistory(): QuizHistory {
  return { version: SCHEMA_VERSION, attempts: [] };
}

export function loadHistory(): QuizHistory {
  if (typeof window === "undefined") return emptyHistory();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyHistory();
    const parsed = JSON.parse(raw) as QuizHistory;
    if (parsed.version !== SCHEMA_VERSION || !Array.isArray(parsed.attempts)) {
      return emptyHistory();
    }
    return parsed;
  } catch {
    return emptyHistory();
  }
}

export function saveHistory(history: QuizHistory): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch {
    // Storage quota exceeded or unavailable — silently ignore
  }
}

export function appendAttempt(attempt: QuizAttempt): void {
  const history = loadHistory();
  const attempts = [attempt, ...history.attempts].slice(0, MAX_ATTEMPTS);
  saveHistory({ ...history, attempts });
}

export function getAttemptById(id: string): QuizAttempt | null {
  const history = loadHistory();
  return history.attempts.find((a) => a.id === id) ?? null;
}

export function clearHistory(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}
