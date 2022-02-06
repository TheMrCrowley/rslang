import { MAX_PROGRESS_ITEMS, MIN_PROGRESS_ITEMS } from './cosnstants';

type Test = {
  isDifficult: boolean;
  isStudied: boolean;
  progress: number;
};

export default function test(): Test {
  const isStudied = Math.random() > 0.5;
  let isDifficult = Math.random() > 0.5;
  if (isStudied) {
    isDifficult = false;
  }

  let progress = Math.floor(
    Math.random() * (isDifficult ? MAX_PROGRESS_ITEMS : MIN_PROGRESS_ITEMS)
  );
  if (
    (isDifficult && progress === MAX_PROGRESS_ITEMS) ||
    (!isDifficult && progress === MIN_PROGRESS_ITEMS)
  ) {
    progress = 0;
  }

  return { isDifficult, isStudied, progress };
}
