import { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { requestStatisticAction } from '../redux/store/reducers/statisticReducer';
import useTypedSelector from './useTypedSelector';

const useStatistic = (isAuth: boolean, userId: string) => {
  const statistic = useTypedSelector(store => store.statistic);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuth) {
      dispatch(requestStatisticAction({ userId }));
    }
  }, []);
  return useMemo(() => statistic, [statistic]);
};

export default useStatistic;
