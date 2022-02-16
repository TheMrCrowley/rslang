import React, { FC } from 'react';
import { Box, styled, Typography } from '@mui/material';
import useStatistic from '../../hooks/useStatistic';
import AudiocallShortStatistic from './AudiocallShortStatistic';
import SprintShortStatistic from './SprintShortStatistic';
import WordsShortStatistic from './WordsShortStatistic';
import useAuth from '../../hooks/useAuth';
import WordsLongStatistic from './WordsLongStatistic';
import ChartWrapper from '../ui/ChartWrapper';
import { darkBgColor } from '../e-book/cosnstants';

const StatisticsWrapper = styled(Box)`
  flex: 1 1;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
`;

const StatisticPage: FC = () => {
  const { isAuth, userId } = useAuth();
  const statistic = useStatistic(isAuth, userId);
  if (!isAuth) {
    return (
      <Typography
        variant="h3"
        textAlign="center"
        color={darkBgColor}
        sx={{ margin: 'auto 10%' }}
      >
        To access our detailed statistics feature please create an account
      </Typography>
    );
  }
  return (
    <StatisticsWrapper>
      {statistic.wordStatistic && (
        <ChartWrapper text="Today learning progress">
          <WordsShortStatistic wordsStatistic={statistic.wordStatistic} />
        </ChartWrapper>
      )}
      {statistic?.completeStatistic?.optional?.wordStatistic && (
        <ChartWrapper text="Total progress">
          <WordsLongStatistic
            wordsStatistic={
              statistic?.completeStatistic?.optional?.wordStatistic
            }
          />
        </ChartWrapper>
      )}
      {statistic.sprintStatistic && (
        <ChartWrapper text="Today Sprint progress">
          <SprintShortStatistic sprintStatistic={statistic.sprintStatistic} />
        </ChartWrapper>
      )}
      {statistic.audiocallStatistic && (
        <ChartWrapper text="Today Audiocall progress">
          <AudiocallShortStatistic
            audiocallStatistic={statistic.audiocallStatistic}
          />
        </ChartWrapper>
      )}
    </StatisticsWrapper>
  );
};
export default StatisticPage;
