import { put, takeEvery } from 'redux-saga/effects';
import { setWordAction, setWordsAction } from '../store/reducers/wordsReducer';
import { IWord, WordsResponse } from '../../services/types';
import {
  RequestWordAction,
  WordsActionTypes,
  RequestWordsAction,
} from '../types/wordsTypes';
import WordsService from '../../services/wordsService';

function* requestWordsWorker(data: RequestWordsAction) {
  const { group, page } = data.payload;
  const wordsResponse: WordsResponse = yield WordsService.getWords(group, page);
  yield put(setWordsAction(wordsResponse));
}

function* requestWordWorker(data: RequestWordAction) {
  const { wordId } = data.payload;
  const getWordResponse: IWord = yield WordsService.getWord(wordId);
  yield put(setWordAction(getWordResponse));
}

function* wordsWatcher() {
  yield takeEvery(WordsActionTypes.REQUEST_WORDS, requestWordsWorker);
  yield takeEvery(WordsActionTypes.REQUEST_WORD, requestWordWorker);
}

export default wordsWatcher;
