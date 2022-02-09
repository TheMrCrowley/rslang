import { UserWordResponse } from '../services/user-words/userWordsServiceTypes';

export const isNewSprintWord = (words: UserWordResponse[], wordId: string) => {
  const word = words.find(item => item.wordId === wordId);
  if (word) {
    return !word.optional.sprint;
  }
  return true;
};

export const isNewAucioCallWord = (
  words: UserWordResponse[],
  wordId: string
) => {
  const word = words.find(item => item.wordId === wordId);
  if (word) {
    return !word.optional.audiocall;
  }
  return true;
};
