import { put, takeEvery } from 'redux-saga/effects';
import { setWordAction, setWordsAction } from '../store/reducers/wordsReducer';
import { IWord, WordsResponse } from '../../services/types';
import {
  RequestWordAction,
  WordsActionTypes,
  RequestWordsAction,
} from '../types/wordsTypes';
import WordsService from '../../services/wordsService';
import { requestActionCreator } from '../store/reducers/requestReducer';
import { RequestActionTypes } from '../types/requestTypes';

function* requestWordsWorker(data: RequestWordsAction) {
  try {
    yield put(requestActionCreator(RequestActionTypes.REQUEST_START));
    const { group, page } = data.payload;
    const wordsResponse: WordsResponse = yield WordsService.getWords(
      group,
      page
    );
    yield put(setWordsAction(wordsResponse));
    yield put(requestActionCreator(RequestActionTypes.REQUEST_SUCCESS));
  } catch (e) {
    yield put(requestActionCreator(RequestActionTypes.REQUEST_ERROR));
  }
}

function* requestWordWorker(data: RequestWordAction) {
  try {
    yield put(requestActionCreator(RequestActionTypes.REQUEST_START));
    const { wordId } = data.payload;
    const getWordResponse: IWord = yield WordsService.getWord(wordId);
    yield put(setWordAction(getWordResponse));
    yield put(requestActionCreator(RequestActionTypes.REQUEST_SUCCESS));
  } catch (e) {
    yield put(requestActionCreator(RequestActionTypes.REQUEST_ERROR));
  }
}

function* wordsWatcher() {
  yield takeEvery(WordsActionTypes.REQUEST_WORDS, requestWordsWorker);
  yield takeEvery(WordsActionTypes.REQUEST_WORD, requestWordWorker);
}

export default wordsWatcher;
