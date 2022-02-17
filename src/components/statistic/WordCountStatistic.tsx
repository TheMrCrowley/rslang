import { Box } from '@mui/material';
import React, { FC } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import {
  chartGreenColor,
  chartLemonGreenColor,
  chartPurpleColor,
  chartSkyBlueColor,
  colors,
} from '../e-book/cosnstants';

interface NewWordsStatisticsProps {
  studied: number;
  difficult: number;
}

const WordCountStatistic: FC<NewWordsStatisticsProps> = ({
  studied,
  difficult,
}) => {
  const TOTAL_WORDS = 3600;
  const COLORS = [chartGreenColor, chartPurpleColor, chartSkyBlueColor];
  const WordsTypes = ['Learned', 'Difficult', 'Rest'];
  const RADIAN = Math.PI / 180;

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

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
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
