import { useMemo } from 'react';
import { shortWordStatistic } from '../components/statistic/statisticDataHelpers';
import { WordStatisticItem } from '../services/statistic/statisticServiceTypes';

const useWordsShortData = (wordStatistic: WordStatisticItem) => {
  const graphData = useMemo(() => {
    return shortWordStatistic(wordStatistic);
  }, [wordStatistic]);
  return [graphData];
};

export default useWordsShortData;
