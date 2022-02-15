/* eslint-disable @typescript-eslint/default-param-last */
import { UserWordResponse } from '../../../services/user-words/userWordsServiceTypes';
import {
  WordsRequestData,
  WordWithCustomProps,
} from '../../../services/words/wordsServiceTypes';
import {
  AudioCallGameAction,
  AudioCallGameActions,
  AudioCallGameStatus,
  AudioCallState,
  AudioCallStatus,
} from '../../types/audioCallTypes';

const audioCallInitialState: AudioCallState = {
  words: [],
  correctAnswers: 0,
  request: false,
  gameStatus: AudioCallGameStatus.PREPARE,
  group: 0,
  initialPage: 0,
  currentPage: 0,
  book: false,
};

export const audioCallGameReducer = (
  state = audioCallInitialState,
  action: AudioCallGameAction
): AudioCallState => {
  switch (action.type) {
    case AudioCallGameActions.AUDIOCALL_REQUEST_START:
      return { ...state, request: true };
    case AudioCallGameActions.AUDIOCALL_REQUEST_END:
      return { ...state, request: false };
    case AudioCallGameActions.SET_AUDIOCALL_DATA:
      return { ...state, words: [...action.payload] };
    case AudioCallGameActions.CHNAGE_AUDIOCALL_STATUS:
      return { ...state, gameStatus: action.payload };
    case AudioCallGameActions.SET_AUDIOCALL_WORDS_SECTION: {
      return {
        ...state,
        group: action.payload.group,
        initialPage: action.payload.page,
        currentPage: action.payload.page,
      };
    }
    case AudioCallGameActions.CHANGE_AUDIOCALL_CURRENT_PAGE:
      return {
        ...state,
        currentPage: state.currentPage - 1,
      };
    case AudioCallGameActions.RESET_AUDIOCALL_STATE:
      return { ...audioCallInitialState };
    case AudioCallGameActions.SET_AUDIOCALL_BOOK:
      return { ...state, book: true };
    default:
      return state;
  }
};

export const changeAudiocallPageAction = (): AudioCallGameAction => ({
  type: AudioCallGameActions.CHANGE_AUDIOCALL_CURRENT_PAGE,
});

export const requestAudioCallDataAction = (payload: {
  group: number;
  page: number;
  book?: boolean;
  userId?: string;
}): AudioCallGameAction => ({
  type: AudioCallGameActions.REQUEST_AUDIOCALL_DATA,
  payload,
});

export const setAudioCallDataAction = (
  payload: WordWithCustomProps[]
): AudioCallGameAction => {
  console.log('payload', payload[0]);
  return {
    type: AudioCallGameActions.SET_AUDIOCALL_DATA,
    payload,
  };
};

export const changeAudioCallStatusAction = (
  payload: AudioCallStatus
): AudioCallGameAction => ({
  type: AudioCallGameActions.CHNAGE_AUDIOCALL_STATUS,
  payload,
});

export const setAudioCallWordsSectionAction = (
  payload: WordsRequestData
): AudioCallGameAction => ({
  type: AudioCallGameActions.SET_AUDIOCALL_WORDS_SECTION,
  payload,
});

export const audioCallRequestStartAction = (): AudioCallGameAction => ({
  type: AudioCallGameActions.AUDIOCALL_REQUEST_START,
});

export const audioCallRequestEndAction = (): AudioCallGameAction => ({
  type: AudioCallGameActions.AUDIOCALL_REQUEST_END,
});

export const resetAudioCallStateAction = (): AudioCallGameAction => ({
  type: AudioCallGameActions.RESET_AUDIOCALL_STATE,
});

export const audiocallCorrectAction = (payload: {
  userId: string;
  wordId: string;
  words: UserWordResponse[];
}): AudioCallGameAction => ({
  type: AudioCallGameActions.AUDIOCALL_CORRECT_ANSWER,
  payload,
});

export const audiocallInCorrectAction = (payload: {
  userId: string;
  wordId: string;
  words: UserWordResponse[];
}): AudioCallGameAction => ({
  type: AudioCallGameActions.AUDIOCALL_INCORRECT_ANSWER,
  payload,
});

export const setAudiocallBookAction = (): AudioCallGameAction => ({
  type: AudioCallGameActions.SET_AUDIOCALL_BOOK,
});
