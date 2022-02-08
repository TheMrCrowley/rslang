import { call, put, takeEvery } from 'redux-saga/effects';
import {
  setWordsSectionAction,
  sprintRequestEndAction,
  setSprintDataAction,
  sprintRequestStartAction,
} from '../store/reducers/sprintGameReducer';
import WordsService from '../../services/words/wordsService';
import { Word } from '../../services/words/wordsServiceTypes';
import {
  RequestSprintDataAction,
  SprintGameActions,
} from '../types/sprintTypes';

function* requestSprintDataWorker(data: RequestSprintDataAction) {
  try {
    yield put(sprintRequestStartAction());
    const { group, page } = data.payload;
    yield put(setWordsSectionAction({ group, page }));
    const wordsResponse: Word[] = yield call(
      WordsService.getWords,
      group,
      page
    );
    yield put(setSprintDataAction(wordsResponse));
    yield put(sprintRequestEndAction());
  } catch (e) {
    console.log(e);
  }
}

function* sprintGameWatcher() {
  yield takeEvery(
    SprintGameActions.REQUEST_SPRINT_DATA,
    requestSprintDataWorker
  );
}

export default sprintGameWatcher;
