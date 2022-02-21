import { useMemo } from 'react';
import { WordStatisticType } from '../services/statistic/statisticServiceTypes';
import { learnedLongStatistics, longWordStatistic } from '../components/statistic/statisticDataHelpers';

const useLearnedWordData = (wordStatistic: WordStatisticType) => {
  const graphData = useMemo(() => {
    return learnedLongStatistics(wordStatistic);
  }, [wordStatistic]);
  return graphData;
};

export default useLearnedWordData;
