import { call, put, takeEvery } from 'redux-saga/effects';
import {
  CorrectAnswerAction,
  GetUserWordsAction,
  InCorrectAnswerAction,
  SetWordDifficulty,
  UserWordsActionTypes,
} from '../types/userWordsTypes';
import UserWordsService from '../../services/user-words/userWordsService';
import {
  UserWord,
  UserWordResponse,
} from '../../services/user-words/userWordsServiceTypes';
import {
  getUserWordsAction,
  setUserWordsAction,
} from '../store/reducers/userWordsReducer';
import createUserWordBody from '../../helpers/createUserWordBody';
import CreateUserWordMode from '../../helpers/helpersTypes';
import updateUserWordBody from '../../helpers/updateUserWordBody';

function* getUserWordsWorker(data: GetUserWordsAction) {
  try {
    const { userId } = data.payload;
    const userWords: UserWordResponse[] = yield call(
      UserWordsService.getUserWords,
      userId
    );
    yield put(setUserWordsAction(userWords));
  } catch (e) {
    console.log(e);
  }
}

function* setWordDifficultyWorker(data: SetWordDifficulty) {
  try {
    const { userId, wordId, method, difficulty } = data.payload;
    if (method === 'POST') {
      const wordBody: UserWord = yield call(
        createUserWordBody,
        CreateUserWordMode.CHANGE_DIFFICULTY,
        difficulty
      );
      yield call(UserWordsService.setUserWord, userId, wordId, wordBody);
    } else {
      const newWordBody: UserWord = yield call(
        updateUserWordBody,
        userId,
        wordId,
        CreateUserWordMode.CHANGE_DIFFICULTY,
        difficulty
      );
      yield call(UserWordsService.updateUserWord, userId, wordId, newWordBody);
    }
    yield put(getUserWordsAction({ userId }));
  } catch (e) {
    console.log(e);
  }
}

function* correctAnswerWorker(data: CorrectAnswerAction) {
  try {
    const { userId, wordId, method, from } = data.payload;
    if (method === 'POST') {
      const wordBody: UserWord = yield call(
        createUserWordBody,
        CreateUserWordMode.CORRECT_ANSWER,
        undefined,
        from
      );
      yield call(UserWordsService.setUserWord, userId, wordId, wordBody);
    } else {
      const newWordBody: UserWord = yield call(
        updateUserWordBody,
        userId,
        wordId,
        CreateUserWordMode.CORRECT_ANSWER,
        undefined,
        from
      );
      yield call(UserWordsService.updateUserWord, userId, wordId, newWordBody);
    }
    yield put(getUserWordsAction({ userId }));
  } catch (e) {
    console.log(e);
  }
}

function* incorrectAnswerWorker(data: InCorrectAnswerAction) {
  try {
    const { userId, wordId, method, from } = data.payload;
    if (method === 'POST') {
      const wordBody: UserWord = yield call(
        createUserWordBody,
        CreateUserWordMode.INCORRECT_ANSWER,
        undefined,
        from
      );
      yield call(UserWordsService.setUserWord, userId, wordId, wordBody);
    } else {
      const newWordBody: UserWord = yield call(
        updateUserWordBody,
        userId,
        wordId,
        CreateUserWordMode.INCORRECT_ANSWER,
        undefined,
        from
      );
      yield call(UserWordsService.updateUserWord, userId, wordId, newWordBody);
    }
    yield put(getUserWordsAction({ userId }));
  } catch (e) {
    console.log(e);
  }
}

function* userWordsWatcher() {
  yield takeEvery(UserWordsActionTypes.GET_USER_WORDS, getUserWordsWorker);
  yield takeEvery(
    UserWordsActionTypes.SET_WORD_DIFFICULTY,
    setWordDifficultyWorker
  );
  yield takeEvery(UserWordsActionTypes.CORRECT_ANSWER, correctAnswerWorker);
  yield takeEvery(UserWordsActionTypes.INCORRECT_ANSWER, incorrectAnswerWorker);
}

export default userWordsWatcher;
