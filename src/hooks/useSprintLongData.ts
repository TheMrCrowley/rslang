import { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { longGameStatistic } from '../components/statistic/statisticDataHelpers';
import { requestStatisticAction } from '../redux/store/reducers/statisticReducer';
import useTypedSelector from './useTypedSelector';

const useGameChart = (
  isAuth: boolean,
  userId: string,
  game: 'sprint' | 'audiocall'
) => {
  const { completeStatistic } = useTypedSelector(store => store.statistic);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isAuth) {
      dispatch(requestStatisticAction({ userId }));
    }
  }, []);

  const graphData = useMemo(() => {
    if (game === 'sprint') {
      if (completeStatistic?.optional?.gameStatistic?.sprint) {
        return longGameStatistic(
          completeStatistic.optional.gameStatistic.sprint
        );
      }
    }
    if (game === 'audiocall') {
      if (completeStatistic?.optional?.gameStatistic?.audiocall) {
        return longGameStatistic(
          completeStatistic.optional.gameStatistic.audiocall
        );
      }
    }
    return [];
  }, [completeStatistic]);
  return graphData;
};

export default useGameChart;
