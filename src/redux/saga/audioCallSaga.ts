import { call, put, takeEvery } from 'redux-saga/effects';
import WordsService from '../../services/words/wordsService';
import { Word } from '../../services/words/wordsServiceTypes';
import {
  audioCallRequestEndAction,
  audioCallRequestStartAction,
  setAudioCallDataAction,
  setAudioCallWordsSectionAction,
} from '../store/reducers/audioCallReducer';
import {
  AudioCallGameActions,
  RequestAucioCallDataAction,
} from '../types/audioCallTypes';

function* requestAudioCallDataWorker(data: RequestAucioCallDataAction) {
  try {
    yield put(audioCallRequestStartAction());
    const { group, page } = data.payload;
    yield put(setAudioCallWordsSectionAction({ group, page }));
    const wordsResponse: Word[] = yield call(
      WordsService.getWords,
      group,
      page
    );
    yield put(setAudioCallDataAction(wordsResponse));
    yield put(audioCallRequestEndAction());
  } catch (e) {
    console.log(e);
  }
}

function* audioCallGameWatcher() {
  yield takeEvery(
    AudioCallGameActions.REQUEST_AUDIOCALL_DATA,
    requestAudioCallDataWorker
  );
}

export default audioCallGameWatcher;
