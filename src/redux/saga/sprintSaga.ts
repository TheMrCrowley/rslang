import { call, put, takeEvery } from 'redux-saga/effects';
import {
  checkStatisticDataKey,
  compareDiff,
  isNewWord,
} from '../../helpers/statisticHandlers';
import {
  setWordsSectionAction,
  sprintRequestEndAction,
  setSprintDataAction,
  sprintRequestStartAction,
  changeSprintStatusAction,
  setSprintBookAction,
} from '../store/reducers/sprintGameReducer';
import WordsService from '../../services/words/wordsService';
import { WordWithCustomProps } from '../../services/words/wordsServiceTypes';
import {
  RequestSprintDataAction,
  RequestSprintHardWordsAction,
  SprintCorrectAction,
  SprintGameActions,
  SprintGameStatus,
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
  changeSprintNewWordAction,
  decreaseLearnedWordsAtion,
  increaseLearnedWordsAtion,
  increaseSaveTrackerAction,
  setStatisticAction,
} from '../store/reducers/statisticReducer';
import { setOneUserWordAction } from '../store/reducers/userWordsReducer';
import { getAllTranslates } from '../../helpers/gameHelpers';
import { StatisticState } from '../types/statisticTypes';

function* requestSprintDataWorker(data: RequestSprintDataAction) {
  try {
    yield put(sprintRequestStartAction());
    const { group, page, userId, book } = data.payload;
    yield put(setWordsSectionAction({ group, page }));
    const wordsResponse: WordWithCustomProps[] = yield call(
      WordsService.getWords,
      group,
      page
    );
    if (book && userId) {
      console.log('from book');
      yield put(setSprintBookAction());
      const notStudiedWords: WordWithCustomProps[] = yield call(
        WordsService.getNotStudiedWords,
        userId,
        group,
        page
      );
      yield put(
        setSprintDataAction({
          wordsForQuestion: notStudiedWords,
          answers: getAllTranslates(wordsResponse),
        })
      );
    } else {
      console.log('not userId');
      yield put(
        setSprintDataAction({
          wordsForQuestion: wordsResponse,
          answers: getAllTranslates(wordsResponse),
        })
      );
    }
    yield put(sprintRequestEndAction());
    yield put(changeSprintStatusAction(SprintGameStatus.INRUN));
  } catch (e) {
    console.log(e);
  }
}

function* requestSprintHardWordsAction(data: RequestSprintHardWordsAction) {
  try {
    yield put(sprintRequestStartAction());
    // TODO magic number
    yield put(setWordsSectionAction({ group: 6, page: 77 }));
    const { userId } = data.payload;
    const hardWordsResponse: WordWithCustomProps[] = yield call(
      WordsService.getHardWords,
      userId
    );
    yield put(
      setSprintDataAction({
        wordsForQuestion: hardWordsResponse,
        answers: getAllTranslates(hardWordsResponse),
      })
    );
    yield put(sprintRequestEndAction());
    yield put(changeSprintStatusAction(SprintGameStatus.INRUN));
  } catch (e) {
    console.log(e);
  }
}

function* sprintCorrectAnswerWorker(data: SprintCorrectAction) {
  try {
    const { words, userId, wordId } = data.payload;
    const method = requestMethodChoiser(words, wordId);
    //
    const statisticStatus: StatisticState = yield call(
      checkStatisticDataKey,
      userId
    );
    yield put(setStatisticAction(statisticStatus));
    //
    if (isNewWord(words, wordId)) {
      yield put(changeSprintNewWordAction());
    }
    yield put(changeSprintCorrectAnswersAction());
    if (method === 'POST') {
      const newWord: UserWordResponse = yield call(
        UserWordsService.setUserWord,
        userId,
        wordId,
        userWordFromSprintCorrect()
      );
      yield put(setOneUserWordAction(newWord));
    } else {
      const chosenWord = words.find(
        wordItem => wordItem.wordId === wordId
      ) as UserWordResponse;
      const updatedUserWord: UserWord = yield call(
        updateAfterCorrectAnswer,
        chosenWord,
        'sprint'
      );
      const updatedWord: UserWordResponse = yield call(
        UserWordsService.updateUserWord,
        userId,
        wordId,
        updatedUserWord
      );
      if (!compareDiff(chosenWord, updatedUserWord)) {
        yield put(increaseLearnedWordsAtion());
      }
      yield put(setOneUserWordAction(updatedWord));
    }
    yield put(increaseSaveTrackerAction());
  } catch (e) {
    console.log(e);
  }
}

function* sprintInCorrectAnswerWorker(data: SprintInCorrectAction) {
  try {
    const { words, userId, wordId } = data.payload;
    const method = requestMethodChoiser(words, wordId);
    //
    const statisticStatus: StatisticState = yield call(
      checkStatisticDataKey,
      userId
    );
    yield put(setStatisticAction(statisticStatus));
    //
    if (isNewWord(words, wordId)) {
      yield put(changeSprintNewWordAction());
    }
    yield put(changeSprintIncorrectAnswersAction());
    if (method === 'POST') {
      const newWord: UserWordResponse = yield call(
        UserWordsService.setUserWord,
        userId,
        wordId,
        userWordFromSprintIncorrect()
      );
      yield put(setOneUserWordAction(newWord));
    } else {
      const chosenWord = words.find(
        wordItem => wordItem.wordId === wordId
      ) as UserWordResponse;
      const updatedUserWord: UserWord = yield call(
        updateAfterIncorrectAnswer,
        chosenWord,
        'sprint'
      );
      const updatedWord: UserWordResponse = yield call(
        UserWordsService.updateUserWord,
        userId,
        wordId,
        updatedUserWord
      );
      if (!compareDiff(chosenWord, updatedUserWord)) {
        yield put(decreaseLearnedWordsAtion());
      }
      yield put(setOneUserWordAction(updatedWord));
    }
    yield put(increaseSaveTrackerAction());
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
  yield takeEvery(
    SprintGameActions.REQUEST_SPRINT_HARD_WORDS,
    requestSprintHardWordsAction
  );
}

export default sprintGameWatcher;
