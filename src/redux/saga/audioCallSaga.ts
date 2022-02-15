import { call, put, takeEvery } from 'redux-saga/effects';
import { useDispatch } from 'react-redux';
import { compareDiff } from '../../helpers/statisticHandlers';
import {
  userWordFromAudioCallCorrect,
  userWordFromAudioCallInCorrect,
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
import { WordWithCustomProps } from '../../services/words/wordsServiceTypes';
import {
  audioCallRequestEndAction,
  audioCallRequestStartAction,
  changeAudioCallStatusAction,
  setAudiocallBookAction,
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
  AudioCallGameStatus,
  AudioCallInCorrectAction,
  RequestAucioCallDataAction,
} from '../types/audioCallTypes';
import { setOneUserWordAction } from '../store/reducers/userWordsReducer';

function* requestAudioCallDataWorker(data: RequestAucioCallDataAction) {
  try {
    yield put(audioCallRequestStartAction());
    const { group, page, userId, book } = data.payload;
    yield put(setAudioCallWordsSectionAction({ group, page }));
    if (book && userId) {
      yield put(setAudiocallBookAction());
      const wordsResponse: WordWithCustomProps[] = yield call(
        WordsService.getNotStudiedWords,
        userId,
        group,
        page
      );
      yield put(setAudioCallDataAction(wordsResponse));
    } else {
      const wordsResponse: WordWithCustomProps[] = yield call(
        WordsService.getWords,
        group,
        page
      );
      yield put(setAudioCallDataAction(wordsResponse));
    }
    yield put(audioCallRequestEndAction());
    yield put(changeAudioCallStatusAction(AudioCallGameStatus.INRUN));
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
      const newWord: UserWordResponse = yield call(
        UserWordsService.setUserWord,
        userId,
        wordId,
        userWordFromAudioCallCorrect()
      );
      yield put(setOneUserWordAction(newWord));
    } else {
      const chosenWord = words.find(
        wordItem => wordItem.wordId === wordId
      ) as UserWordResponse;
      const updatedUserWord: UserWord = yield call(
        updateAfterCorrectAnswer,
        chosenWord,
        'audiocall'
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
      const newWord: UserWordResponse = yield call(
        UserWordsService.setUserWord,
        userId,
        wordId,
        userWordFromAudioCallInCorrect()
      );
      yield put(setOneUserWordAction(newWord));
    } else {
      const chosenWord = words.find(
        wordItem => wordItem.wordId === wordId
      ) as UserWordResponse;
      const updatedUserWord: UserWord = yield call(
        updateAfterIncorrectAnswer,
        chosenWord,
        'audiocall'
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
