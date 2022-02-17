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
import useWordsShortData from '../../hooks/useWordsShortData';
import { WordStatisticItem } from '../../services/statistic/statisticServiceTypes';

interface WordsShortStatisticProps {
  wordsStatistic: WordStatisticItem;
}

const WordsShortStatistic: FC<WordsShortStatisticProps> = ({
  wordsStatistic,
}) => {
  const graphData = useWordsShortData(wordsStatistic);
  return (
    <BarChart width={730} height={250} data={graphData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="newWords" name="new words" fill="#8884d8" />
      <Bar dataKey="learnedWords" name="learned words" fill="#82ca9d" />
      <Bar dataKey="procent" fill="#82ca9d" />
    </BarChart>
  );
};

export default WordsShortStatistic;
