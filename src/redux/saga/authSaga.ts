import { put, takeEvery } from 'redux-saga/effects';
import AuthService from '../../services/authService';
import { AuthorizationResponse } from '../../services/types';
import {
  RegistrationAction,
  signinAction,
} from '../store/reducers/authReducer';

function* registrationWorker(data: RegistrationAction) {
  const { name, email, password } = data.payload;
  yield AuthService.registration(name, email, password);
  const signinResponse: AuthorizationResponse = yield AuthService.login(
    email,
    password
  );
  localStorage.setItem('access-token', signinResponse.token);
  yield put(signinAction(signinResponse));
}

function* authWatcher() {
  yield takeEvery('REGISTRATION', registrationWorker);
}

export default authWatcher;
