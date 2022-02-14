import React, { FC } from 'react';
import useStatistic from '../../hooks/useStatistic';
import AudiocallShortStatistic from './AudiocallShortStatistic';
import SprintShortStatistic from './SprintShortStatistic';
import WordsShortStatistic from './WordsShortStatistic';

interface StatisticPageProps {
  isAuth: boolean;
  userId: string;
}

const StatisticPage: FC<StatisticPageProps> = ({ isAuth, userId }) => {
  const statistic = useStatistic(isAuth, userId);

  if (isAuth) {
    return <div>Not auth</div>;
  }
  return (
    <>
      <SprintShortStatistic sprintStatistic={statistic.sprintStatistic} />
      <AudiocallShortStatistic
        audiocallStatistic={statistic.audiocallStatistic}
      />
      <WordsShortStatistic wordsStatistic={statistic.wordStatistic} />
    </>
  );
};
export default StatisticPage;
