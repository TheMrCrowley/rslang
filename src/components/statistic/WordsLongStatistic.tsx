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
import useWordsLongData from '../../hooks/useWordsLongData';
import { statHeight, statWidht } from './statContstants';
import { chartGreenColor } from '../e-book/cosnstants';

interface WordsLongStatisticProps {
  wordsStatistic: WordStatisticType;
}

const WordsLongStatistic: FC<WordsLongStatisticProps> = ({
  wordsStatistic,
}) => {
  const graphData = useWordsLongData(wordsStatistic);
  return (
    <Box sx={{ width: '100%', height: '300px' }}>
      <ResponsiveContainer>
        <BarChart width={statWidht} height={statHeight} data={graphData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis width={40} />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="newWords"
            name="New words per day"
            fill={chartGreenColor}
          />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default WordsLongStatistic;
