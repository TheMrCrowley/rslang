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
import { Box } from '@mui/material';
import { WordStatisticType } from '../../services/statistic/statisticServiceTypes';
import { statHeight, statWidht } from './statContstants';
import { chartGreenColor } from '../e-book/cosnstants';
import useLearnedWordData from '../../hooks/useLearnedWordData';

interface WordsLongStatisticProps {
  wordsStatistic: WordStatisticType;
}

const LearnedWordsStatisticsProgress: FC<WordsLongStatisticProps> = ({
  wordsStatistic,
}) => {
  const graphData = useLearnedWordData(wordsStatistic);
  return (
    <Box sx={{ width: '100%', height: '300px' }}>
      <ResponsiveContainer>
        <BarChart width={statWidht} height={statHeight} data={graphData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="learnedWord"
            name="New words per day"
            fill={chartGreenColor}
          />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default LearnedWordsStatisticsProgress;
