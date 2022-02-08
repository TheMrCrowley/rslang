import { all } from 'redux-saga/effects';
import wordsWatcher from './wordsSaga';
import authWatcher from './authSaga';
import userWordsWatcher from './userWordsSaga';
import sprintGameWatcher from './sprintSaga';

function* rootWatcher() {
  yield all([
    wordsWatcher(),
    authWatcher(),
    userWordsWatcher(),
    sprintGameWatcher(),
  ]);
}

export default rootWatcher;
