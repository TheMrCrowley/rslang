import { StatisticState } from '../redux/types/statisticTypes';
import {
  StatisticRequest,
  StatisticResponse,
  WordStatisticItem,
  GameStatisticItem,
  StatisticOptional,
} from '../services/statistic/statisticServiceTypes';

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

const createWordStatisticItem = (): WordStatisticItem => {
  return {
    correctAnswers: 0,
    learnedWords: 0,
    newWords: 0,
    totalAnswers: 0,
  };
};

const createGameStatisticItem = (): GameStatisticItem => {
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
    learnedWords,
    sprintStatistic: { ...sprint },
    audiocallStatistic: { ...audiocall },
    wordStatistic: { ...word },
  };
};
