import { put, takeEvery, call } from 'redux-saga/effects';
import { StorageKeys } from '../../services/enum';
import AuthService from '../../services/auth/authService';
import {
  setIsAuthAction,
  setUserDataAction,
} from '../store/reducers/authReducer';
import {
  AuthActionsTypes,
  RegistrationAction,
  SigninAction,
} from '../types/authTypes';
import { RequestActionTypes } from '../types/requestTypes';
import { requestActionCreator } from '../store/reducers/requestReducer';
import LocalStorageService from '../../services/localStorageService';

import { LoginResponseData } from '../../services/auth/authServiceTypes';

function* registrationWorker(data: RegistrationAction) {
  try {
    yield put(requestActionCreator(RequestActionTypes.REQUEST_START));
    const { name, email, password } = data.payload;
    yield AuthService.registration({ name, email, password });
    const signinResponse: LoginResponseData = yield call(AuthService.login, {
      email,
      password,
    });
    LocalStorageService.setItemToStorage<LoginResponseData>(
      StorageKeys.USER_DATA,
      signinResponse
    );
    yield put(setUserDataAction(signinResponse));
    yield put(setIsAuthAction());
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
    const signinResponse: LoginResponseData = yield call(AuthService.login, {
      email,
      password,
    });
    LocalStorageService.setItemToStorage<LoginResponseData>(
      StorageKeys.USER_DATA,
      signinResponse
    );
    yield put(setUserDataAction(signinResponse));
    yield put(setIsAuthAction());
    yield put(requestActionCreator(RequestActionTypes.REQUEST_SUCCESS));
  } catch (e) {
    yield put(requestActionCreator(RequestActionTypes.REQUEST_ERROR));
  }
  yield put(requestActionCreator(RequestActionTypes.REQUEST_RESET));
}

function* checkAuth() {
  try {
    const { userId } = LocalStorageService.getParsedItem<LoginResponseData>(
      StorageKeys.USER_DATA
    );
    yield call(AuthService.refreshTokens, userId);
    const userData: LoginResponseData =
      yield LocalStorageService.getParsedItem<LoginResponseData>(
        StorageKeys.USER_DATA
      );
    yield put(setUserDataAction(userData));
    yield put(setIsAuthAction());
  } catch (e) {
    console.log(e);
  }
}

function* logoutWorker() {
  yield call(LocalStorageService.remove, StorageKeys.USER_DATA);
}

function* authWatcher() {
  yield takeEvery(AuthActionsTypes.REGISTRATION, registrationWorker);
  yield takeEvery(AuthActionsTypes.SIGNIN, signInWorker);
  yield takeEvery(AuthActionsTypes.CHECK_AUTH, checkAuth);
  yield takeEvery(AuthActionsTypes.LOGOUT, logoutWorker);
}

export default authWatcher;
