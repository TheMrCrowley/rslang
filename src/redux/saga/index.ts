import { all } from 'redux-saga/effects';
import wordsWatcher from './wordsSaga';
import authWatcher from './authSaga';
import userWordsWatcher from './userWordsSaga';

function* rootWatcher() {
  yield all([wordsWatcher(), authWatcher(), userWordsWatcher()]);
}

export default rootWatcher;
