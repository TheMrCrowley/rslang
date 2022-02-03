import { put, takeEvery } from 'redux-saga/effects';
import AuthService from '../../services/authService';
import { AuthorizationResponse } from '../../services/types';
import {
  setUserDataAction,
  signinAfterRegistration,
} from '../store/reducers/authReducer';
import {
  AuthActionsTypes,
  RegistrationAction,
  SigninAction,
} from '../types/authTypes';

function* registrationWorker(data: RegistrationAction) {
  const { name, email, password } = data.payload;
  yield AuthService.registration(name, email, password);
  const signinResponse: AuthorizationResponse = yield AuthService.login(
    email,
    password
  );
  localStorage.setItem('userData', JSON.stringify(signinResponse));
  yield put(signinAfterRegistration());
  yield put(setUserDataAction(signinResponse));
}

function* signInWorker(data: SigninAction) {
  console.log(data);
  const { email, password } = data.payload;
  const signinResponse: AuthorizationResponse = yield AuthService.login(
    email,
    password
  );
  localStorage.setItem('userData', JSON.stringify(signinResponse));
  yield put(setUserDataAction(signinResponse));
}

function* authWatcher() {
  yield takeEvery(AuthActionsTypes.REGISTRATION, registrationWorker);
  yield takeEvery(AuthActionsTypes.SIGNIN, signInWorker);
}

export default authWatcher;
