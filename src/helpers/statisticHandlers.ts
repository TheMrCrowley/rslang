import { StatisticState } from '../redux/types/statisticTypes';
import {
  StatisticRequest,
  StatisticResponse,
  WordStatisticItem,
  GameStatisticItem,
  StatisticOptional,
} from '../services/statistic/statisticServiceTypes';
import {
  UserWord,
  UserWordResponse,
} from '../services/user-words/userWordsServiceTypes';

export const getDate = () => new Date().toLocaleDateString();

const getStatisticFromResponse = (
  statistic: StatisticResponse
): StatisticRequest => {
  const { learnedWords, optional } = statistic;
  const optionalCopy: StatisticOptional = JSON.parse(JSON.stringify(optional));
  return {
    learnedWords,
    optional: optionalCopy,
  };
};

export const createWordStatisticItem = (): WordStatisticItem => {
  return {
    correctAnswers: 0,
    learnedWords: 0,
    newWords: 0,
    totalAnswers: 0,
  };
};

export const createGameStatisticItem = (): GameStatisticItem => {
  return {
    correctAnswers: 0,
    longestStreak: 0,
    newWords: 0,
    totalAnswers: 0,
  };
};

export const createAfterRegistration = (): StatisticRequest => {
  const dataKey = getDate();
  return {
    learnedWords: 0,
    optional: {
      gameStatistic: {
        sprint: {
          [dataKey]: createGameStatisticItem(),
        },
        audiocall: {
          [dataKey]: createGameStatisticItem(),
        },
      },
      wordStatistic: {
        [dataKey]: createWordStatisticItem(),
      },
    },
  };
};

export const updateStatisticAfterSignIn = (
  oldStatistic: StatisticResponse
): StatisticRequest => {
  const dataKey = getDate();
  const statistic = getStatisticFromResponse(oldStatistic);
  return {
    ...statistic,
    optional: {
      wordStatistic: {
        ...statistic.optional.wordStatistic,
        [dataKey]: createWordStatisticItem(),
      },
      gameStatistic: {
        audiocall: {
          ...statistic.optional.gameStatistic.audiocall,
          [dataKey]: createGameStatisticItem(),
        },
        sprint: {
          ...statistic.optional.gameStatistic.sprint,
          [dataKey]: createGameStatisticItem(),
        },
      },
    },
  };
};

export const getStatisticState = (
  statistic: StatisticResponse
): StatisticState => {
  const dataKey = getDate();

  const { learnedWords } = statistic;
  const sprint = statistic.optional.gameStatistic.sprint[dataKey];
  const audiocall = statistic.optional.gameStatistic.audiocall[dataKey];
  const word = statistic.optional.wordStatistic[dataKey];
  return {
    completeStatistic: JSON.parse(JSON.stringify(statistic)),
    learnedWords,
    sprintStatistic: { ...sprint },
    audiocallStatistic: { ...audiocall },
    wordStatistic: { ...word },
    sprintCurrentStreak: 0,
    audiocallCurrentStreak: 0,
  };
};

export const updateStatistic = (
  statisticForUpdate: StatisticState
): StatisticRequest => {
  const dataKey = getDate();
  const {
    learnedWords,
    audiocallStatistic,
    sprintStatistic,
    wordStatistic,
    completeStatistic,
  } = statisticForUpdate;
  const statisticBody = getStatisticFromResponse(completeStatistic);
  statisticBody.learnedWords = learnedWords;
  statisticBody.optional.wordStatistic[dataKey] = wordStatistic;
  statisticBody.optional.gameStatistic.sprint[dataKey] = sprintStatistic;
  statisticBody.optional.gameStatistic.audiocall[dataKey] = audiocallStatistic;
  return statisticBody;
};

export const isNewWord = (
  words: UserWordResponse[],
  wordId: string
): boolean => {
  const word = words.find(item => item.wordId === wordId);
  if (word) {
    return !word.optional.sprint && !word.optional.audiocall;
  }
  return true;
};

export const compareDiff = (
  before: UserWordResponse,
  after: UserWord
): boolean => {
  return before.difficulty === after.difficulty;
};

export const increaseLearnedWordsHelper = (
  statistic: StatisticState
): StatisticState => {
  return {
    ...statistic,
    learnedWords: statistic.learnedWords + 1,
    wordStatistic: {
      ...statistic.wordStatistic,
      learnedWords: statistic.wordStatistic.learnedWords + 1,
    },
  };
};

export const decreaseLearnedWordsHelper = (
  statistic: StatisticState
): StatisticState => {
  return {
    ...statistic,
    learnedWords: statistic.learnedWords - 1,
    wordStatistic: {
      ...statistic.wordStatistic,
      learnedWords: statistic.wordStatistic.learnedWords - 1,
    },
  };
};

export const changeSprintNewWordHelper = (
  statistic: StatisticState
): StatisticState => {
  return {
    ...statistic,
    wordStatistic: {
      ...statistic.wordStatistic,
      newWords: statistic.wordStatistic.newWords + 1,
    },
    sprintStatistic: {
      ...statistic.sprintStatistic,
      newWords: statistic.sprintStatistic.newWords + 1,
    },
  };
};

export const changeSprintCorrectAnswersHelper = (
  statistic: StatisticState
): StatisticState => {
  return {
    ...statistic,
    sprintCurrentStreak: statistic.sprintCurrentStreak + 1,
    wordStatistic: {
      ...statistic.wordStatistic,
      totalAnswers: statistic.wordStatistic.totalAnswers + 1,
      correctAnswers: statistic.wordStatistic.correctAnswers + 1,
    },
    sprintStatistic: {
      ...statistic.sprintStatistic,
      correctAnswers: statistic.sprintStatistic.correctAnswers + 1,
      totalAnswers: statistic.sprintStatistic.totalAnswers + 1,
      longestStreak:
        statistic.sprintStatistic.longestStreak < statistic.sprintCurrentStreak
          ? statistic.sprintCurrentStreak + 1
          : statistic.sprintStatistic.longestStreak,
    },
  };
};

export const changeSprintIncorrectAnswersHelper = (
  statistic: StatisticState
): StatisticState => {
  return {
    ...statistic,
    sprintCurrentStreak: 0,
    wordStatistic: {
      ...statistic.wordStatistic,
      totalAnswers: statistic.wordStatistic.totalAnswers + 1,
    },
    sprintStatistic: {
      ...statistic.sprintStatistic,
      totalAnswers: statistic.sprintStatistic.totalAnswers + 1,
    },
  };
};

export const changeAudioCallNewWordHelper = (
  statistic: StatisticState
): StatisticState => {
  return {
    ...statistic,
    wordStatistic: {
      ...statistic.wordStatistic,
      newWords: statistic.wordStatistic.newWords + 1,
    },
    audiocallStatistic: {
      ...statistic.audiocallStatistic,
      newWords: statistic.audiocallStatistic.newWords + 1,
    },
  };
};

export const changeAudioCallCorrectAnswersHelper = (
  statistic: StatisticState
): StatisticState => {
  return {
    ...statistic,
    audiocallCurrentStreak: statistic.audiocallCurrentStreak + 1,
    wordStatistic: {
      ...statistic.wordStatistic,
      totalAnswers: statistic.wordStatistic.totalAnswers + 1,
      correctAnswers: statistic.wordStatistic.correctAnswers + 1,
    },
    audiocallStatistic: {
      ...statistic.audiocallStatistic,
      correctAnswers: statistic.audiocallStatistic.correctAnswers + 1,
      totalAnswers: statistic.audiocallStatistic.totalAnswers + 1,
      longestStreak:
        statistic.audiocallStatistic.longestStreak <
        statistic.audiocallCurrentStreak
          ? statistic.audiocallCurrentStreak + 1
          : statistic.audiocallStatistic.longestStreak,
    },
  };
};

export const changeAudioCallIncorrectAnswersHelper = (
  statistic: StatisticState
): StatisticState => {
  return {
    ...statistic,
    audiocallCurrentStreak: 0,
    wordStatistic: {
      ...statistic.wordStatistic,
      totalAnswers: statistic.wordStatistic.totalAnswers + 1,
    },
    audiocallStatistic: {
      ...statistic.audiocallStatistic,
      totalAnswers: statistic.audiocallStatistic.totalAnswers + 1,
    },
  };
};
