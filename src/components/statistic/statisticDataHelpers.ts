import {
  GameStatisticItem,
  GameStatisticType,
  WordStatisticItem,
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
