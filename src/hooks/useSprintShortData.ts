import { useMemo } from 'react';
import { GameStatisticItem } from '../services/statistic/statisticServiceTypes';
import { shortGameStatistic } from '../components/statistic/statisticDataHelpers';

const useSprintShortData = (sprintStatistic: GameStatisticItem) => {
  const graphData = useMemo(() => {
    return shortGameStatistic(sprintStatistic);
  }, [sprintStatistic]);
  return [graphData];
};

export default useSprintShortData;
