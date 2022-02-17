import {
  GameStatisticItem,
  GameStatisticType,
  WordStatisticItem,
  WordStatisticType,
} from '../../services/statistic/statisticServiceTypes';

type GameChartData = GameChartItem[];

interface GameChartItem {
  name?: string;
  newWords: number;
  streak: number;
  procent: number;
}

interface WordChartItem {
  name?: string;
  newWords: number;
  learnedWords: number;
  procent: number;
}

interface WordLongChardData {
  name: string;
  newWords: number;
}

interface LearnedLongStatistics {
  name: string;
  learnedWord: number;
}

export const learnedLongStatistics = (
  wordsData: WordStatisticType
): LearnedLongStatistics[] => {
  const res: LearnedLongStatistics[] = [];

  Object.entries(wordsData).reduce((acc, current) => {
    // eslint-disable-next-line no-param-reassign
    acc += current[1].learnedWords || 0;
    res.push({
      name: current[0],
      learnedWord: acc,
    });
    return acc;
  }, 0);
  return res;
};

export const longGameStatistic = (
  gameData: GameStatisticType
): GameChartData => {
  const datas = Object.keys(gameData);
  return datas.map(dataKey => {
    return {
      name: dataKey,
      newWords: gameData[dataKey].newWords || 0,
      streak: gameData[dataKey].longestStreak || 0,
      procent:
        (gameData[dataKey].correctAnswers * 100) /
          gameData[dataKey].totalAnswers || 0,
    };
  });
};

export const shortGameStatistic = (
  gameData: GameStatisticItem
): GameChartItem => {
  return {
    newWords: gameData.newWords || 0,
    streak: gameData.longestStreak || 0,
    procent: (gameData.correctAnswers * 100) / gameData.totalAnswers || 0,
  };
};

export const shortWordStatistic = (
  wordData: WordStatisticItem
): WordChartItem => {
  return {
    newWords: wordData.newWords || 0,
    learnedWords: wordData.learnedWords || 0,
    procent: (wordData.correctAnswers * 100) / wordData.totalAnswers || 0,
  };
};

export const longWordStatistic = (
  wordData: WordStatisticType
): WordLongChardData[] => {
  const datas = Object.keys(wordData);
  return datas.map(dataKey => {
    return {
      name: dataKey,
      newWords: wordData[dataKey].newWords || 0,
    };
  });
};
