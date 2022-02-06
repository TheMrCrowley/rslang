import { MAX_PROGRESS_ITEMS, MIN_PROGRESS_ITEMS } from './cosnstants';

type Attempst = {
  total: number;
  successful: number;
};

type Test = {
  isDifficult: boolean;
  isStudied: boolean;
  progress: number;
  attempts: Attempst;
  isInLearning: boolean;
};

export default function test(): Test {
  const isInLearning = Math.random() > 0.5;
  const total = Math.floor(Math.random() * 20);
  const successful = Math.ceil(Math.random() * total);
  const attempts = { total, successful };
  const isDifficult = Math.random() > 0.5;
  let isStudied = false;

  if (successful > 2 && !isDifficult) {
    isStudied = Math.random() > 0.5;
  }

  const progress = Math.floor(
    Math.random() *
      (isDifficult ? MAX_PROGRESS_ITEMS - 1 : MIN_PROGRESS_ITEMS - 1)
  );

  return { isDifficult, isStudied, progress, attempts, isInLearning };
}
