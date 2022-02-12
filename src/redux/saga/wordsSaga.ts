import { call, put, takeEvery } from 'redux-saga/effects';
import {
  WordsActionTypes,
  RequestWordsAction,
  RequestWordsWithPropsAction,
} from '../types/wordsTypes';
import WordsService from '../../services/words/wordsService';
import { requestActionCreator } from '../store/reducers/requestReducer';
import { RequestActionTypes } from '../types/requestTypes';
import {
  setWordsAction,
  wordsRequestEndAction,
  wordsRequestStartAction,
} from '../store/reducers/wordsReducer';
import {
  Word,
  WordWithCustomProps,
} from '../../services/words/wordsServiceTypes';

function* requestWordsWorker(data: RequestWordsAction) {
  try {
    yield put(wordsRequestStartAction());
    const { group, page } = data.payload;
    const wordsResponse: Word[] = yield call(
      WordsService.getWords,
      group,
      page
    );
    yield put(setWordsAction(wordsResponse));
    yield put(wordsRequestEndAction());
  } catch (e) {
    yield put(requestActionCreator(RequestActionTypes.REQUEST_ERROR));
  }
}

function* requestWordsWithCustomProps(data: RequestWordsWithPropsAction) {
  try {
    yield put(wordsRequestStartAction());
    const { userId, group, page } = data.payload;
    const wordsResponse: WordWithCustomProps[] = yield call(
      WordsService.getWordsWithCustomProps,
      userId,
      group,
      page
    );
    yield put(setWordsAction(wordsResponse));
    yield put(wordsRequestEndAction());
  } catch (e) {
    yield put(requestActionCreator(RequestActionTypes.REQUEST_ERROR));
  }
}

function* wordsWatcher() {
  yield takeEvery(WordsActionTypes.REQUEST_WORDS, requestWordsWorker);
  yield takeEvery(
    WordsActionTypes.REQUEST_WORDS_PROPS,
    requestWordsWithCustomProps
  );
}

export default wordsWatcher;
