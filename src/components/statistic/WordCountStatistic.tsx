import { Box } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts';
import WordsService from '../../services/words/wordsService';
import {
  chartGreenColor,
  chartPurpleColor,
  chartSkyBlueColor,
} from '../e-book/cosnstants';

interface NewWordsStatisticsProps {
  userId: string;
}
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const WordCountStatistic: FC<NewWordsStatisticsProps> = ({ userId }) => {
  const [studied, setStudied] = useState(0);
  const [difficult, setDifficult] = useState(0);

  useEffect(() => {
    WordsService.getStudiedWordCount(userId).then(data => {
      setStudied(data);
    });

    WordsService.getHardWords(userId).then(data => {
      setDifficult(data.length);
    });
  }, []);
  
  //TODO implement function and move code below

  const TOTAL_WORDS = 3600;
  const COLORS = [chartGreenColor, chartPurpleColor, chartSkyBlueColor];
  const WordsTypes = ['Learned', 'Difficult', 'Rest'];

  const studiedDataItem = {
    name: WordsTypes[0],
    value: studied,
  };

  const difficulltDataItem = {
    name: WordsTypes[1],
    value: difficult,
  };

  const restDataItem = {
    name: WordsTypes[2],
    value: TOTAL_WORDS - (studied + difficult),
  };

  const data = [studiedDataItem, difficulltDataItem, restDataItem];
  console.log(data);

  return (
    <Box sx={{ width: '100%', height: '300px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={100}
            fill="#000000"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${entry.name}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default WordCountStatistic;
