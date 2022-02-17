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
import { WordStatisticType } from '../../services/statistic/statisticServiceTypes';
import useWordsLongData from '../../hooks/useWordsLongData';

interface WordsLongStatisticProps {
  wordsStatistic: WordStatisticType;
}

const WordsLongStatistic: FC<WordsLongStatisticProps> = ({
  wordsStatistic,
}) => {
  const graphData = useWordsLongData(wordsStatistic);
  console.log(graphData);
  return (
    <BarChart width={730} height={250} data={graphData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="learnedWords" fill="#82ca9d" />
    </BarChart>
  );
};

export default WordsLongStatistic;
