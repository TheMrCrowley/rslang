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

const changeDifficultyAfterStreak = (word: UserWord) => {
  if (word.difficulty === 'hard' && word.optional.correctStreak === 5) {
    word.difficulty = 'studied';
  }
  if (word.difficulty === 'learning' && word.optional.correctStreak === 3) {
    word.difficulty = 'studied';
  }
};

const resetDifficultyByStreak = (word: UserWord) => {
  if (word.difficulty === 'studied') {
    word.difficulty = 'learning';
  }
};

const setGame = (word: UserWord, game: 'sprint' | 'audiocall') => {
  if (game === 'sprint') {
    word.optional.sprint = true;
  } else {
    word.optional.audiocall = true;
  }
};

export const updateAfterCorrectAnswer = (
  word: UserWordResponse,
  game: 'sprint' | 'audiocall'
): UserWord => {
  const updatedUserWord: UserWord = {
    difficulty: word.difficulty,
    optional: {
      ...word.optional,
      totalAnswers: word.optional.totalAnswers + 1,
      totalCorrectAnswers: word.optional.totalCorrectAnswers + 1,
      correctStreak: word.optional.correctStreak + 1,
    },
  };
  changeDifficultyAfterStreak(updatedUserWord);
  setGame(updatedUserWord, game);
  return updatedUserWord;
};

export const updateAfterIncorrectAnswer = (
  word: UserWordResponse,
  game: 'sprint' | 'audiocall'
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
  resetDifficultyByStreak(updatedUserWord);
  setGame(updatedUserWord, game);
  return updatedUserWord;
};
