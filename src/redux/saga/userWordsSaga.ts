import { call, put, takeEvery } from 'redux-saga/effects';
import {
  GetUserWordsAction,
  SetHardWordAction,
  UserWordsActionTypes,
} from '../types/userWordsTypes';
import { requestActionCreator } from '../store/reducers/requestReducer';
import { RequestActionTypes } from '../types/requestTypes';
import { UserWord } from '../../services/types';
import UserWordsService from '../../services/userWordsService';
import { setUserWordsAction } from '../store/reducers/userWordsReducer';

function* getUserWords(data: GetUserWordsAction) {
  try {
    yield put(requestActionCreator(RequestActionTypes.REQUEST_START));
    const { userId } = data.payload;
    const userWordsResponse: UserWord[] = yield UserWordsService.getUserWords(
      userId
    );
    yield put(setUserWordsAction(userWordsResponse));
    yield put(requestActionCreator(RequestActionTypes.REQUEST_SUCCESS));
  } catch (e) {
    yield put(requestActionCreator(RequestActionTypes.REQUEST_ERROR));
  }
}

function* setHardWord(data: SetHardWordAction) {
  try {
    const { userId, wordId } = data.payload;
    const optional: UserWord = {
      difficulty: 'hard',
      optional: {
        totalCorrectAnswers: 0,
        totalAnswers: 0,
        correctStreak: 0,
      },
    };
    yield call(UserWordsService.setUserWord, userId, wordId, optional);
  } catch (e) {
    console.log(e);
  }
}

function* userWordsWatcher() {
  yield takeEvery(UserWordsActionTypes.GET_USER_WORDS, getUserWords);
  yield takeEvery(UserWordsActionTypes.SET_HARD_WORD, setHardWord);
}

export default userWordsWatcher;
