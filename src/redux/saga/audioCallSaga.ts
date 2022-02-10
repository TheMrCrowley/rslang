import { call, put, takeEvery } from 'redux-saga/effects';
import { compareDiff } from '../../helpers/statisticHandlers';
import {
  userWordFromAudioCallInCorrect,
  userWordFromAudioCallCorrect,
} from '../../helpers/createUserWordBody';

import requestMethodChoiser from '../../helpers/requestMethodChoiser';
import {
  updateAfterCorrectAnswer,
  updateAfterIncorrectAnswer,
} from '../../helpers/updateUserWordBody';
import UserWordsService from '../../services/user-words/userWordsService';
import {
  UserWord,
  UserWordResponse,
} from '../../services/user-words/userWordsServiceTypes';
import WordsService from '../../services/words/wordsService';
import { Word } from '../../services/words/wordsServiceTypes';
import {
  audioCallRequestEndAction,
  audioCallRequestStartAction,
  setAudioCallDataAction,
  setAudioCallWordsSectionAction,
} from '../store/reducers/audioCallReducer';
import {
  changeAudioCallCorrectAnswerAction,
  changeAudioCallIncorrectAnswerAction,
  decreaseLearnedWordsAtion,
  increaseLearnedWordsAtion,
} from '../store/reducers/statisticReducer';
import {
  AudioCallCorrectAction,
  AudioCallGameActions,
  AudioCallInCorrectAction,
  RequestAucioCallDataAction,
} from '../types/audioCallTypes';

function* requestAudioCallDataWorker(data: RequestAucioCallDataAction) {
  try {
    yield put(audioCallRequestStartAction());
    const { group, page } = data.payload;
    yield put(setAudioCallWordsSectionAction({ group, page }));
    const wordsResponse: Word[] = yield call(
      WordsService.getWords,
      group,
      page
    );
    yield put(setAudioCallDataAction(wordsResponse));
    yield put(audioCallRequestEndAction());
  } catch (e) {
    console.log(e);
  }
}

function* audiocallCorrectAnswerWorker(data: AudioCallCorrectAction) {
  try {
    const { userId, wordId, words } = data.payload;
    const method = requestMethodChoiser(words, wordId);
    yield put(changeAudioCallCorrectAnswerAction());
    if (method === 'POST') {
      yield call(
        UserWordsService.setUserWord,
        userId,
        wordId,
        userWordFromAudioCallCorrect()
      );
    } else {
      const chosenWord = words.find(
        wordItem => wordItem.wordId === wordId
      ) as UserWordResponse;
      const updatedUserWord: UserWord = yield call(
        updateAfterCorrectAnswer,
        chosenWord,
        'audiocall'
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

function* audiocallInCorrectAnswerWorker(data: AudioCallInCorrectAction) {
  try {
    const { words, userId, wordId } = data.payload;
    const method = requestMethodChoiser(words, wordId);
    yield put(changeAudioCallIncorrectAnswerAction());
    if (method === 'POST') {
      yield call(
        UserWordsService.setUserWord,
        userId,
        wordId,
        userWordFromAudioCallInCorrect()
      );
    } else {
      const chosenWord = words.find(
        wordItem => wordItem.wordId === wordId
      ) as UserWordResponse;
      const updatedUserWord: UserWord = yield call(
        updateAfterIncorrectAnswer,
        chosenWord,
        'audiocall'
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

function* audioCallGameWatcher() {
  yield takeEvery(
    AudioCallGameActions.REQUEST_AUDIOCALL_DATA,
    requestAudioCallDataWorker
  );
  yield takeEvery(
    AudioCallGameActions.AUDIOCALL_CORRECT_ANSWER,
    audiocallCorrectAnswerWorker
  );
  yield takeEvery(
    AudioCallGameActions.AUDIOCALL_INCORRECT_ANSWER,
    audiocallInCorrectAnswerWorker
  );
}

export default audioCallGameWatcher;
