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
import { RequestActionTypes } from '../types/requestTypes';
import { requestActionCreator } from '../store/reducers/requestReducer';

function* registrationWorker(data: RegistrationAction) {
  try {
    yield put(requestActionCreator(RequestActionTypes.REQUEST_START));
    const { name, email, password } = data.payload;
    yield AuthService.registration(name, email, password);
    const signinResponse: AuthorizationResponse = yield AuthService.login(
      email,
      password
    );
    localStorage.setItem('userData', JSON.stringify(signinResponse));
    yield put(signinAfterRegistration());
    yield put(setUserDataAction(signinResponse));
    yield put(requestActionCreator(RequestActionTypes.REQUEST_SUCCESS));
  } catch (e) {
    yield put(requestActionCreator(RequestActionTypes.REQUEST_ERROR));
  }
  yield put(requestActionCreator(RequestActionTypes.REQUEST_RESET));
}

function* signInWorker(data: SigninAction) {
  try {
    yield put(requestActionCreator(RequestActionTypes.REQUEST_START));
    const { email, password } = data.payload;
    const signinResponse: AuthorizationResponse = yield AuthService.login(
      email,
      password
    );
    localStorage.setItem('userData', JSON.stringify(signinResponse));
    yield put(setUserDataAction(signinResponse));
    yield put(requestActionCreator(RequestActionTypes.REQUEST_SUCCESS));
  } catch (e) {
    yield put(requestActionCreator(RequestActionTypes.REQUEST_ERROR));
  }
  yield put(requestActionCreator(RequestActionTypes.REQUEST_RESET));
}

function* authWatcher() {
  yield takeEvery(AuthActionsTypes.REGISTRATION, registrationWorker);
  yield takeEvery(AuthActionsTypes.SIGNIN, signInWorker);
}

export default authWatcher;
