import { put, takeEvery, call } from 'redux-saga/effects';
import { StorageKeys } from '../../services/enum';
import AuthService from '../../services/auth/authService';
import {
  authRequestErrorAction,
  authRequestResetAction,
  authRequestStartAction,
  authRequestSuccessAction,
  setIsAuthAction,
  setUserDataAction,
} from '../store/reducers/authReducer';
import {
  AuthActionsTypes,
  RegistrationAction,
  SigninAction,
} from '../types/authTypes';
import LocalStorageService from '../../services/localStorageService';

import { LoginResponseData } from '../../services/auth/authServiceTypes';
import StatisticService from '../../services/statistic/statisticService';
import {
  checkStatisticDataKey,
  createAfterRegistration,
  getDate,
  updateStatisticAfterSignIn,
} from '../../helpers/statisticHandlers';
import {
  StatisticRequest,
  StatisticResponse,
} from '../../services/statistic/statisticServiceTypes';
import { setStatisticAction } from '../store/reducers/statisticReducer';
import { StatisticState } from '../types/statisticTypes';

function* registrationWorker(data: RegistrationAction) {
  const { name, email, password } = data.payload;
  try {
    yield put(authRequestStartAction());
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
    yield put(authRequestSuccessAction());
  } catch (e) {
    if (e.response.status === 417) {
      yield put(authRequestErrorAction());
    }
  }
}

function* signInWorker(data: SigninAction) {
  const { email, password } = data.payload;
  try {
    yield put(authRequestStartAction());
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
    yield put(authRequestSuccessAction());
  } catch (e) {
    if (e.response.status === 403) {
      yield put(authRequestErrorAction());
    }
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
    const statisticStatus: StatisticState = yield call(
      checkStatisticDataKey,
      userId
    );
    yield put(setStatisticAction(statisticStatus));
    yield put(setUserDataAction(userData));
    yield put(setIsAuthAction());
    yield put(authRequestSuccessAction());
  } catch (e) {
    yield call(LocalStorageService.remove, StorageKeys.USER_DATA);
    yield put(authRequestResetAction());
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
