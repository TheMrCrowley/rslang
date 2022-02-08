import {
  Word,
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

/* eslint-disable @typescript-eslint/default-param-last */
const audioCallInitialState: AudioCallState = {
  words: [] as Word[],
  correctAnswers: 0,
  request: false,
  gameStatus: AudioCallGameStatus.PREPARE,
  group: 0,
  page: 0,
};

export const audioCallGameReducer = (
  state = audioCallInitialState,
  action: AudioCallGameAction
): AudioCallState => {
  switch (action.type) {
    case AudioCallGameActions.REQUEST_AUDIOCALL_DATA:
      return state;
    case AudioCallGameActions.AUDIOCALL_REQUEST_START:
      return { ...state, request: true };
    case AudioCallGameActions.AUDIOCALL_REQUEST_END:
      return { ...state, request: false };
    case AudioCallGameActions.INCREASE_AUDIOCALL_CORRECT_ASWERS:
      return { ...state, correctAnswers: state.correctAnswers + 1 };
    case AudioCallGameActions.SET_AUDIOCALL_DATA:
      return { ...state, words: [...action.payload] };
    case AudioCallGameActions.CHNAGE_AUDIOCALL_STATUS:
      return { ...state, gameStatus: action.payload };
    case AudioCallGameActions.SET_AUDIOCALL_WORDS_SECTION: {
      return {
        ...state,
        group: action.payload.group,
        page: action.payload.page,
      };
    }
    case AudioCallGameActions.RESET_AUDIOCALL_STATE:
      return { ...audioCallInitialState };
    default:
      return state;
  }
};

export const requestAudioCallDataAction = (
  payload: WordsRequestData
): AudioCallGameAction => ({
  type: AudioCallGameActions.REQUEST_AUDIOCALL_DATA,
  payload,
});

export const setAudioCallDataAction = (
  payload: Word[] | WordWithCustomProps[]
): AudioCallGameAction => ({
  type: AudioCallGameActions.SET_AUDIOCALL_DATA,
  payload,
});

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

export const audioCallIncreaseAnswerAction = (): AudioCallGameAction => ({
  type: AudioCallGameActions.INCREASE_AUDIOCALL_CORRECT_ASWERS,
});

export const resetAudioCallStateAction = (): AudioCallGameAction => ({
  type: AudioCallGameActions.RESET_AUDIOCALL_STATE,
});
