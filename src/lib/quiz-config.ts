import { Question } from "./types";

export const QUESTIONS_PER_TEST = 20;
export const NUM_TESTS = 20;
const TEST_BANK_SEED = 20260321;

export function clampTestNumber(testNumber: number): number {
  if (!Number.isFinite(testNumber)) {
    return 1;
  }

  return Math.max(1, Math.min(testNumber, NUM_TESTS));
}

function createSeededRandom(seed: number): () => number {
  let state = seed >>> 0;

  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let result = Math.imul(state ^ (state >>> 15), 1 | state);
    result ^= result + Math.imul(result ^ (result >>> 7), 61 | result);
    return ((result ^ (result >>> 14)) >>> 0) / 4294967296;
  };
}

function seededShuffle<T>(items: T[], seed: number): T[] {
  const random = createSeededRandom(seed);
  const copy = [...items];

  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }

  return copy;
}

export function getQuestionsForTest(
  questions: Question[],
  testNumber: number
): Question[] {
  const clampedTestNumber = clampTestNumber(testNumber);
  const start = (clampedTestNumber - 1) * QUESTIONS_PER_TEST;
  const end = start + QUESTIONS_PER_TEST;
  const shuffledQuestions = seededShuffle(questions, TEST_BANK_SEED);

  return shuffledQuestions.slice(start, end);
}
