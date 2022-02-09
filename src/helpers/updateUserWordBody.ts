import {
  UserWord,
  UserWordResponse,
} from '../services/user-words/userWordsServiceTypes';

export const updateUserWordsState = (
  words: UserWordResponse[],
  word: UserWordResponse
): UserWordResponse[] => {
  const wordsWithoutWord = words.filter(
    wordItem => wordItem.wordId !== word.wordId
  );
  return [...wordsWithoutWord, { ...word }];
};

export const changeToHard = (word: UserWordResponse): UserWord => {
  return {
    difficulty: 'hard',
    optional: {
      ...word.optional,
    },
  };
};

export const changeToStudied = (word: UserWordResponse): UserWord => {
  return {
    difficulty: 'studied',
    optional: {
      ...word.optional,
    },
  };
};

export const updateAfterCorrectAnswer = (word: UserWordResponse): UserWord => {
  const updatedUserWord = {
    difficulty: word.difficulty,
    optional: {
      ...word.optional,
      totalAnswers: word.optional.totalAnswers + 1,
      totalCorrectAnswers: word.optional.totalCorrectAnswers + 1,
      correctStreak: word.optional.correctStreak + 1,
    },
  };
  if (
    updatedUserWord.difficulty === 'hard' &&
    updatedUserWord.optional.correctStreak === 5
  ) {
    updatedUserWord.difficulty = 'studied';
  }
  if (
    updatedUserWord.difficulty === 'learning' &&
    updatedUserWord.optional.correctStreak === 3
  ) {
    updatedUserWord.difficulty = 'studied';
  }
  return updatedUserWord;
};

export const updateAfterIncorrectAnswer = (
  word: UserWordResponse
): UserWord => {
  const updatedUserWord: UserWord = {
    difficulty: word.difficulty,
    optional: {
      ...word.optional,
      totalAnswers: word.optional.totalAnswers + 1,
      totalCorrectAnswers: word.optional.totalCorrectAnswers,
      correctStreak: 0,
    },
  };
  if (updatedUserWord.difficulty === 'studied') {
    updatedUserWord.difficulty = 'learning';
  }
  return updatedUserWord;
};
