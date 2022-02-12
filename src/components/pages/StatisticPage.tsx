import React, { useMemo } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  GameStatisticItem,
  GameStatisticType,
} from '../../services/statistic/statisticServiceTypes';
import useTypedSelector from '../../hooks/useTypedSelector';

const sprintData: GameStatisticType = {
  '09.02.2022': {
    correctAnswers: 10,
    totalAnswers: 20,
    longestStreak: 5,
    newWords: 4,
  },
  '10.02.2022': {
    correctAnswers: 15,
    totalAnswers: 20,
    longestStreak: 9,
    newWords: 8,
  },
  '11.02.2022': {
    correctAnswers: 4,
    totalAnswers: 20,
    longestStreak: 2,
    newWords: 8,
  },
};

type GameChartData = GameChartItem[];

interface GameChartItem {
  name: string;
  newWords: number;
  streak: number;
  procent: number;
}

const statisticToChartData = (gameData: GameStatisticType): GameChartData => {
  const datas = Object.keys(gameData);
  return datas.map(dataKey => {
    return {
      name: dataKey,
      newWords: gameData[dataKey].newWords,
      streak: gameData[dataKey].longestStreak,
      procent:
        (gameData[dataKey].correctAnswers * 100) /
        gameData[dataKey].totalAnswers,
    };
  });
};

const data = statisticToChartData(sprintData);

const StatisticPage = () => {
  const { completeStatistic } = useTypedSelector(store => store.statistic);
  const graphData = useMemo(() => {
    if (completeStatistic?.optional?.gameStatistic?.sprint) {
      return statisticToChartData(
        completeStatistic.optional.gameStatistic.sprint
      );
    }
    return [];
  }, [completeStatistic]);
  return (
    <BarChart width={730} height={250} data={graphData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="newWords" fill="#8884d8" />
      <Bar dataKey="streak" fill="#82ca9d" />
      <Bar dataKey="procent" fill="#82ca9d" />
    </BarChart>
  );
};
export default StatisticPage;
