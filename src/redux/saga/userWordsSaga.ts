import { call, put, takeEvery } from 'redux-saga/effects';
import {
  increaseSaveTrackerAction,
  increaseLearnedWordsAtion,
  setStatisticAction,
} from '../store/reducers/statisticReducer';

import {
  ChangeToHardAction,
  ChangeToStudiedAction,
  CreateHardUserWordAction,
  CreateStudiedUserWordAction,
  GetUserWordsAction,
  UserWordsActionTypes,
} from '../types/userWordsTypes';
import UserWordsService from '../../services/user-words/userWordsService';
import {
  UserWord,
  UserWordResponse,
} from '../../services/user-words/userWordsServiceTypes';
import {
  setOneUserWordAction,
  setUserWordsAction,
} from '../store/reducers/userWordsReducer';
import {
  createHardUserWord,
  createStudiedUserWord,
} from '../../helpers/createUserWordBody';
import {
  changeToHard,
  changeToStudied,
  updateUserWordsState,
} from '../../helpers/updateUserWordBody';
import WordsService from '../../services/words/wordsService';
import { WordWithCustomProps } from '../../services/words/wordsServiceTypes';
import {
  removeOneHardWordAction,
  setOneWordAction,
} from '../store/reducers/wordsReducer';
import { checkStatisticDataKey } from '../../helpers/statisticHandlers';
import { StatisticState } from '../types/statisticTypes';

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

function* createHardUserWordWorker(data: CreateHardUserWordAction) {
  try {
    const { userId, wordId } = data.payload;
    const hardUserWord = createHardUserWord();
    const userWord: UserWordResponse = yield call(
      UserWordsService.setUserWord,
      userId,
      wordId,
      hardUserWord
    );
    yield put(setOneUserWordAction(userWord));
    const newWord: WordWithCustomProps = yield call(
      WordsService.getOneWordWithCustomProps,
      userId,
      wordId
    );
    yield put(setOneWordAction(newWord));
  } catch (e) {
    console.log(e);
  }
}

function* createStudiedUserWordWroker(data: CreateStudiedUserWordAction) {
  try {
    const { userId, wordId } = data.payload;
    const studiedUserWord = createStudiedUserWord();
    const userWord: UserWordResponse = yield call(
      UserWordsService.setUserWord,
      userId,
      wordId,
      studiedUserWord
    );
    yield put(setOneUserWordAction(userWord));
    const newWord: WordWithCustomProps = yield call(
      WordsService.getOneWordWithCustomProps,
      userId,
      wordId
    );
    const statisticStatus: StatisticState = yield call(
      checkStatisticDataKey,
      userId
    );
    yield put(setStatisticAction(statisticStatus));
    yield put(setOneWordAction(newWord));
    yield put(increaseLearnedWordsAtion());
    yield put(increaseSaveTrackerAction());
  } catch (e) {
    console.log(e);
  }
}

function* changeToHardWorker(data: ChangeToHardAction) {
  try {
    const { userId, wordId, words } = data.payload;
    const chosenWord = words.find(
      wordItem => wordItem.wordId === wordId
    ) as UserWordResponse;
    const updatedUserWords = updateUserWordsState(words, chosenWord);
    const updatedUserWord: UserWord = yield changeToHard(chosenWord);
    yield call(
      UserWordsService.updateUserWord,
      userId,
      wordId,
      updatedUserWord
    );
    yield put(setUserWordsAction(updatedUserWords));
    const newWord: WordWithCustomProps = yield call(
      WordsService.getOneWordWithCustomProps,
      userId,
      wordId
    );
    yield put(setOneWordAction(newWord));
  } catch (e) {
    console.log(e);
  }
}

function* changeToStudiedWorker(data: ChangeToStudiedAction) {
  try {
    const { userId, wordId, words } = data.payload;
    const chosenWord = words.find(
      wordItem => wordItem.wordId === wordId
    ) as UserWordResponse;
    const updatedUserWords = updateUserWordsState(words, chosenWord);
    const updatedUserWord: UserWord = yield changeToStudied(chosenWord);
    yield call(
      UserWordsService.updateUserWord,
      userId,
      wordId,
      updatedUserWord
    );
    yield put(increaseLearnedWordsAtion());
    yield put(setUserWordsAction(updatedUserWords));
    const newWord: WordWithCustomProps = yield call(
      WordsService.getOneWordWithCustomProps,
      userId,
      wordId
    );
    yield put(setOneWordAction(newWord));
    yield put(removeOneHardWordAction(newWord));
  } catch (e) {
    console.log(e);
  }
}

function* userWordsWatcher() {
  yield takeEvery(UserWordsActionTypes.GET_USER_WORDS, getUserWordsWorker);
  yield takeEvery(
    UserWordsActionTypes.CREATE_HARD_USER_WORD,
    createHardUserWordWorker
  );
  yield takeEvery(
    UserWordsActionTypes.CREATE_STUDIED_USER_WORD,
    createStudiedUserWordWroker
  );
  yield takeEvery(UserWordsActionTypes.CHANGE_TO_HARD, changeToHardWorker);
  yield takeEvery(
    UserWordsActionTypes.CHANGE_TO_STUDIED,
    changeToStudiedWorker
  );
}

export default userWordsWatcher;
