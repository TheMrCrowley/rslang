import { call, takeEvery, put } from 'redux-saga/effects';
import {
  getStatisticState,
  updateStatistic,
} from '../../helpers/statisticHandlers';
import StatisticService from '../../services/statistic/statisticService';
import {
  StatisticRequest,
  StatisticResponse,
} from '../../services/statistic/statisticServiceTypes';
import { setStatisticAction } from '../store/reducers/statisticReducer';
import {
  RequestStatisticAction,
  SaveStatisticAction,
  StatisticActionTypes,
} from '../types/statisticTypes';

function* requestStatisticWorker(data: RequestStatisticAction) {
  try {
    const { userId } = data.payload;
    const statistic: StatisticResponse = yield call(
      StatisticService.getStatistic,
      userId
    );
    yield put(setStatisticAction(getStatisticState(statistic)));
  } catch (e) {
    console.log(e);
  }
}

function* updateStatisticWorker(data: SaveStatisticAction) {
  try {
    const { newStatistic, userId } = data.payload;
    const updatedStatistic: StatisticRequest = yield call(
      updateStatistic,
      newStatistic
    );
    console.log(updatedStatistic);
    yield call(StatisticService.updateStatistic, userId, updatedStatistic);
  } catch (e) {
    console.log(e);
  }
}

function* statisticWatcher() {
  yield takeEvery(
    StatisticActionTypes.REQUEST_STATISTIC,
    requestStatisticWorker
  );
  yield takeEvery(StatisticActionTypes.SAVE_STATISTIC, updateStatisticWorker);
}

export default statisticWatcher;
