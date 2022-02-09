import { call, takeEvery, put } from 'redux-saga/effects';
import { getStatisticState } from '../../helpers/statisticHandlers';
import StatisticService from '../../services/statistic/statisticService';
import { StatisticResponse } from '../../services/statistic/statisticServiceTypes';
import { setStatisticAction } from '../store/reducers/statisticReducer';
import {
  RequestStatisticAction,
  StatisticActionTypes,
} from '../types/statisticTypes';

function* requestStatisticWorker(data: RequestStatisticAction) {
  try {
    const { userId } = data.payload;
    const statistic: StatisticResponse = yield call(
      StatisticService.getStatistic,
      userId
    );
    yield put(setStatisticAction({ data: getStatisticState(statistic) }));
  } catch (e) {
    console.log(e);
  }
}

function* statisticWatcher() {
  yield takeEvery(
    StatisticActionTypes.REQUEST_STATISTIC,
    requestStatisticWorker
  );
}

export default statisticWatcher;
