import { UserWord } from '../services/user-words/userWordsServiceTypes';

export const createHardUserWord = (): UserWord => {
  return {
    difficulty: 'hard',
    optional: {
      totalAnswers: 0,
      totalCorrectAnswers: 0,
      correctStreak: 0,
      sprint: false,
      audiocall: false,
    },
  };
};

export const createStudiedUserWord = (): UserWord => {
  return {
    difficulty: 'studied',
    optional: {
      totalAnswers: 0,
      totalCorrectAnswers: 0,
      correctStreak: 0,
      sprint: false,
      audiocall: false,
    },
  };
};

export const userWordFromSprintCorrect = (): UserWord => {
  return {
    difficulty: 'learning',
    optional: {
      totalAnswers: 1,
      totalCorrectAnswers: 1,
      correctStreak: 1,
      sprint: true,
      audiocall: false,
    },
  };
};

export const userWordFromSprintIncorrect = (): UserWord => {
  return {
    difficulty: 'learning',
    optional: {
      totalAnswers: 1,
      totalCorrectAnswers: 0,
      correctStreak: 0,
      sprint: true,
      audiocall: false,
    },
  };
};

export const userWordFromAudioCallCorrect = (): UserWord => {
  return {
    difficulty: 'learning',
    optional: {
      totalAnswers: 1,
      totalCorrectAnswers: 1,
      correctStreak: 1,
      sprint: false,
      audiocall: true,
    },
  };
};

export const userWordFromAudioCallInCorrect = (): UserWord => {
  return {
    difficulty: 'learning',
    optional: {
      totalAnswers: 1,
      totalCorrectAnswers: 0,
      correctStreak: 0,
      sprint: false,
      audiocall: true,
    },
  };
};
