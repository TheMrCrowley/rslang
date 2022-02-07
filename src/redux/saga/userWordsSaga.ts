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
      const wordBody: UserWord = {
        difficulty,
        optional: {
          totalAnswers: 0,
          correctStreak: 0,
          totalCorrectAnswers: 0,
        },
      };
      yield call(UserWordsService.setUserWord, userId, wordId, wordBody);
    } else {
      const wordBody: UserWordResponse = yield call(
        UserWordsService.getOneUserWord,
        userId,
        wordId
      );
      const newWordBody: UserWord = {
        difficulty,
        optional: { ...wordBody.optional },
      };
      yield call(UserWordsService.updateUserWord, userId, wordId, newWordBody);
    }
    yield put(getUserWordsAction({ userId }));
  } catch (e) {
    console.log(e);
  }
}

function* correctAnswerWorker(data: CorrectAnswerAction) {
  try {
    const { userId, wordId, method } = data.payload;
    if (method === 'POST') {
      const wordBody: UserWord = {
        difficulty: 'learning',
        optional: {
          totalAnswers: 1,
          totalCorrectAnswers: 1,
          correctStreak: 1,
        },
      };
      yield call(UserWordsService.setUserWord, userId, wordId, wordBody);
    } else {
      const userWord: UserWordResponse = yield call(
        UserWordsService.getOneUserWord,
        userId,
        wordId
      );
      const newWordBody: UserWord = {
        difficulty: userWord.difficulty,
        optional: {
          totalAnswers: userWord.optional.totalAnswers + 1,
          totalCorrectAnswers: userWord.optional.totalCorrectAnswers + 1,
          correctStreak: userWord.optional.correctStreak + 1,
        },
      };
      yield call(UserWordsService.updateUserWord, userId, wordId, newWordBody);
    }
    yield put(getUserWordsAction({ userId }));
  } catch (e) {
    console.log(e);
  }
}

function* incorrectAnswerWorker(data: InCorrectAnswerAction) {
  try {
    const { userId, wordId, method } = data.payload;
    if (method === 'POST') {
      const wordBody: UserWord = {
        difficulty: 'learning',
        optional: {
          totalAnswers: 1,
          correctStreak: 0,
          totalCorrectAnswers: 0,
        },
      };
      yield call(UserWordsService.setUserWord, userId, wordId, wordBody);
    } else {
      const { difficulty, optional }: UserWordResponse = yield call(
        UserWordsService.getOneUserWord,
        userId,
        wordId
      );
      const newWordBody: UserWord = {
        difficulty,
        optional: {
          totalAnswers: optional.totalAnswers + 1,
          totalCorrectAnswers: optional.totalCorrectAnswers,
          correctStreak: 0,
        },
      };
      yield call(UserWordsService.updateUserWord, userId, wordId, newWordBody);
    }
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
