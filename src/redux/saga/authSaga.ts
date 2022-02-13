import { put, takeEvery, call } from 'redux-saga/effects';
import { StorageKeys } from '../../services/enum';
import AuthService from '../../services/auth/authService';
import {
  authRequestEndAction,
  authRequestStartAction,
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
import StatisticService from '../../services/statistic/statisticService';
import {
  createAfterRegistration,
  getDate,
  updateStatisticAfterSignIn,
} from '../../helpers/statisticHandlers';
import {
  StatisticRequest,
  StatisticResponse,
} from '../../services/statistic/statisticServiceTypes';

function* registrationWorker(data: RegistrationAction) {
  try {
    yield put(authRequestStartAction());
    const { name, email, password } = data.payload;
    yield call(AuthService.registration, { name, email, password });
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
    yield call(
      StatisticService.updateStatistic,
      signinResponse.userId,
      createAfterRegistration()
    );
    yield put(authRequestEndAction());
  } catch (e) {
    yield put(requestActionCreator(RequestActionTypes.REQUEST_ERROR));
  }
}

function* signInWorker(data: SigninAction) {
  try {
    yield put(authRequestStartAction());
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
    const statistic: StatisticResponse = yield call(
      StatisticService.getStatistic,
      signinResponse.userId
    );
    console.log(statistic);
    if (!statistic.optional.wordStatistic[getDate()]) {
      const newStatistic: StatisticRequest = yield call(
        updateStatisticAfterSignIn,
        statistic
      );
      yield call(
        StatisticService.updateStatistic,
        signinResponse.userId,
        newStatistic
      );
    }
    yield put(authRequestEndAction());
  } catch (e) {
    yield put(requestActionCreator(RequestActionTypes.REQUEST_ERROR));
  }
}

function* checkAuth() {
  try {
    yield put(authRequestStartAction());
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
    yield put(authRequestEndAction());
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
