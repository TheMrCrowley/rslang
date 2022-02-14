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
import useAudiocallShortData from '../../hooks/useAudiocallShortData';
import { GameStatisticItem } from '../../services/statistic/statisticServiceTypes';

interface AudiocallStatisticProps {
  audiocallStatistic: GameStatisticItem;
}

const AudiocallShortStatistic: FC<AudiocallStatisticProps> = ({
  audiocallStatistic,
}) => {
  const graphData = useAudiocallShortData(audiocallStatistic);
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

export default AudiocallShortStatistic;
