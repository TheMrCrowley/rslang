import { useMemo } from 'react';
import { shortGameStatistic } from '../components/statistic/statisticDataHelpers';
import { GameStatisticItem } from '../services/statistic/statisticServiceTypes';

const useAudiocallShortData = (audiocallStatistic: GameStatisticItem) => {
  const graphData = useMemo(() => {
    return shortGameStatistic(audiocallStatistic);
  }, [audiocallStatistic]);
  return [graphData];
};

export default useAudiocallShortData;
