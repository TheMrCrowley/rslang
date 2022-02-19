import { Box } from '@mui/material';
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
import useAudiocallShortData from '../../hooks/useAudiocallShortData';
import { GameStatisticItem } from '../../services/statistic/statisticServiceTypes';
import {
  chartDarkBlueColor,
  chartLemonGreenColor,
  chartSkyBlueColor,
} from '../e-book/cosnstants';
import { statHeight, statWidht } from './statContstants';

interface AudiocallStatisticProps {
  audiocallStatistic: GameStatisticItem;
}

const AudiocallShortStatistic: FC<AudiocallStatisticProps> = ({
  audiocallStatistic,
}) => {
  const graphData = useAudiocallShortData(audiocallStatistic);
  return (
    <Box sx={{ width: '100%', height: '300px' }}>
      <ResponsiveContainer>
        <BarChart width={statWidht} height={statHeight} data={graphData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis width={40} />
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

export default AudiocallShortStatistic;
