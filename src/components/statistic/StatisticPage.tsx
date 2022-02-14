import React, { FC } from 'react';
import useStatistic from '../../hooks/useStatistic';
import AudiocallShortStatistic from './AudiocallShortStatistic';
import SprintShortStatistic from './SprintShortStatistic';
import WordsShortStatistic from './WordsShortStatistic';
import useAuth from '../../hooks/useAuth';
import WordsLongStatistic from './WordsLongStatistic';

const StatisticPage: FC = () => {
  const { isAuth, userId } = useAuth();
  const statistic = useStatistic(isAuth, userId);
  if (!isAuth) {
    return <div>Not auth</div>;
  }
  return (
    <>
      {statistic.sprintStatistic && (
        <SprintShortStatistic sprintStatistic={statistic.sprintStatistic} />
      )}
      {statistic.audiocallStatistic && (
        <AudiocallShortStatistic
          audiocallStatistic={statistic.audiocallStatistic}
        />
      )}
      {statistic.wordStatistic && (
        <WordsShortStatistic wordsStatistic={statistic.wordStatistic} />
      )}
      {statistic?.completeStatistic?.optional?.wordStatistic && (
        <WordsLongStatistic
          wordsStatistic={statistic?.completeStatistic?.optional?.wordStatistic}
        />
      )}
    </>
  );
};
export default StatisticPage;
