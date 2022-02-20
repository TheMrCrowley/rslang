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
import useWordsShortData from '../../hooks/useWordsShortData';
import { WordStatisticItem } from '../../services/statistic/statisticServiceTypes';
import {
  chartDarkPurpleColor,
  chartGreenColor,
  chartSkyBlueColor,
} from '../e-book/cosnstants';
import { statHeight, statWidht } from './statContstants';

interface WordsShortStatisticProps {
  wordsStatistic: WordStatisticItem;
}

const WordsShortStatistic: FC<WordsShortStatisticProps> = ({
  wordsStatistic,
}) => {
  const graphData = useWordsShortData(wordsStatistic);
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
            dataKey="learnedWords"
            name="Learned words"
            fill={chartGreenColor}
          />
          <Bar
            dataKey="procent"
            name="Learned from new, %"
            fill={chartDarkPurpleColor}
          />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default WordsShortStatistic;
