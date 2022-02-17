import React, { FC } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import useSprintShortData from '../../hooks/useSprintShortData';
import { GameStatisticItem } from '../../services/statistic/statisticServiceTypes';

interface SprintStatisticProps {
  sprintStatistic: GameStatisticItem;
}

const SprintShortStatistic: FC<SprintStatisticProps> = ({
  sprintStatistic,
}) => {
  const graphData = useSprintShortData(sprintStatistic);
  return (
    <BarChart width={730} height={250} data={graphData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="newWords" name="new words" fill="#8884d8" />
      <Bar dataKey="streak" fill="#82ca9d" />
      <Bar dataKey="procent" fill="#82ca9d" />
    </BarChart>
  );
};

export default SprintShortStatistic;
