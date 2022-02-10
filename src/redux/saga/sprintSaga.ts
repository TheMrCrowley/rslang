import { call, put, takeEvery } from 'redux-saga/effects';
import { compareDiff } from '../../helpers/statisticHandlers';
import {
  setWordsSectionAction,
  sprintRequestEndAction,
  setSprintDataAction,
  sprintRequestStartAction,
} from '../store/reducers/sprintGameReducer';
import WordsService from '../../services/words/wordsService';
import { Word } from '../../services/words/wordsServiceTypes';
import {
  RequestSprintDataAction,
  SprintCorrectAction,
  SprintGameActions,
  SprintInCorrectAction,
} from '../types/sprintTypes';
import {
  userWordFromSprintCorrect,
  userWordFromSprintIncorrect,
} from '../../helpers/createUserWordBody';
import UserWordsService from '../../services/user-words/userWordsService';
import {
  UserWord,
  UserWordResponse,
} from '../../services/user-words/userWordsServiceTypes';
import {
  updateAfterCorrectAnswer,
  updateAfterIncorrectAnswer,
} from '../../helpers/updateUserWordBody';
import requestMethodChoiser from '../../helpers/requestMethodChoiser';

import {
  changeSprintCorrectAnswersAction,
  changeSprintIncorrectAnswersAction,
  decreaseLearnedWordsAtion,
  increaseLearnedWordsAtion,
} from '../store/reducers/statisticReducer';

function* requestSprintDataWorker(data: RequestSprintDataAction) {
  try {
    yield put(sprintRequestStartAction());
    const { group, page } = data.payload;
    yield put(setWordsSectionAction({ group, page }));
    const wordsResponse: Word[] = yield call(
      WordsService.getWords,
      group,
      page
    );
    yield put(setSprintDataAction(wordsResponse));
    yield put(sprintRequestEndAction());
  } catch (e) {
    console.log(e);
  }
}

function* sprintCorrectAnswerWorker(data: SprintCorrectAction) {
  try {
    const { words, userId, wordId } = data.payload;
    const method = requestMethodChoiser(words, wordId);
    yield put(changeSprintCorrectAnswersAction());
    if (method === 'POST') {
      yield call(
        UserWordsService.setUserWord,
        userId,
        wordId,
        userWordFromSprintCorrect()
      );
    } else {
      const chosenWord = words.find(
        wordItem => wordItem.wordId === wordId
      ) as UserWordResponse;
      const updatedUserWord: UserWord = yield call(
        updateAfterCorrectAnswer,
        chosenWord,
        'sprint'
      );
      yield call(
        UserWordsService.updateUserWord,
        userId,
        wordId,
        updatedUserWord
      );
      if (!compareDiff(chosenWord, updatedUserWord)) {
        yield put(increaseLearnedWordsAtion());
      }
    }
  } catch (e) {
    console.log(e);
  }
}

function* sprintInCorrectAnswerWorker(data: SprintInCorrectAction) {
  try {
    const { words, userId, wordId } = data.payload;
    const method = requestMethodChoiser(words, wordId);
    yield put(changeSprintIncorrectAnswersAction());
    if (method === 'POST') {
      yield call(
        UserWordsService.setUserWord,
        userId,
        wordId,
        userWordFromSprintIncorrect()
      );
    } else {
      const chosenWord = words.find(
        wordItem => wordItem.wordId === wordId
      ) as UserWordResponse;
      const updatedUserWord: UserWord = yield call(
        updateAfterIncorrectAnswer,
        chosenWord,
        'sprint'
      );
      yield call(
        UserWordsService.updateUserWord,
        userId,
        wordId,
        updatedUserWord
      );
      if (!compareDiff(chosenWord, updatedUserWord)) {
        yield put(decreaseLearnedWordsAtion());
      }
    }
  } catch (e) {
    console.log(e);
  }
}

function* sprintGameWatcher() {
  yield takeEvery(
    SprintGameActions.REQUEST_SPRINT_DATA,
    requestSprintDataWorker
  );
  yield takeEvery(
    SprintGameActions.SPRINT_CORRECT_ANSWER,
    sprintCorrectAnswerWorker
  );
  yield takeEvery(
    SprintGameActions.SPRINT_INCORRECT_ANSWER,
    sprintInCorrectAnswerWorker
  );
}

export default sprintGameWatcher;
