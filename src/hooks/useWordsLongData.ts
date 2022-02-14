import { useMemo } from 'react';
import { WordStatisticType } from '../services/statistic/statisticServiceTypes';
import { longWordStatistic } from '../components/statistic/statisticDataHelpers';

const useWordsLongData = (wordStatistic: WordStatisticType) => {
  const graphData = useMemo(() => {
    return longWordStatistic(wordStatistic);
  }, [wordStatistic]);
  return graphData;
};

export default useWordsLongData;
