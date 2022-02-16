import { Box, Typography } from '@mui/material';
import React, { FC } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import useSprintShortData from '../../hooks/useSprintShortData';
import { GameStatisticItem } from '../../services/statistic/statisticServiceTypes';
import {
  chartDarkBlueColor,
  chartLemonGreenColor,
  chartSkyBlueColor,
} from '../e-book/cosnstants';
import { statHeight, statWidht } from './statContstants';

interface SprintStatisticProps {
  sprintStatistic: GameStatisticItem;
}

const SprintShortStatistic: FC<SprintStatisticProps> = ({
  sprintStatistic,
}) => {
  const graphData = useSprintShortData(sprintStatistic);
  return (
    <Box sx={{ width: '100%', height: '300px' }}>
      <ResponsiveContainer>
        <BarChart width={statWidht} height={statHeight} data={graphData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="newWords" name="New words" fill={chartSkyBlueColor} />
          <Bar
            dataKey="procent"
            name="Correct answers, %"
            fill={chartLemonGreenColor}
          />
          <Bar
            dataKey="streak"
            name="max. successful answers in a row"
            fill={chartDarkBlueColor}
          />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default SprintShortStatistic;
