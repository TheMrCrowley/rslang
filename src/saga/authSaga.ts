import { put, takeEvery, call } from 'redux-saga/effects';
import AuthService from '../services/authService';

function* authWorker(data) {
  console.log('data:', data);
  yield call(AuthService.registration);
}

function* authWatcher() {
  yield takeEvery('REGISTRATION', authWorker);
}

export default authWatcher;
