import {
  WordWithCustomProps,
  Word,
  WordsRequestData,
} from '../../services/words/wordsServiceTypes';

export enum AudioCallGameStatus {
  PREPARE = 'PREPARE',
  INRUN = 'INRUN',
  END = 'END',
}

export type AudioCallStatus =
  | AudioCallGameStatus.PREPARE
  | AudioCallGameStatus.INRUN
  | AudioCallGameStatus.END;

export interface AudioCallState {
  words: Word[] | WordWithCustomProps[];
  gameStatus: AudioCallStatus;
  request: boolean;
  correctAnswers: number;
  group: number;
  page: number;
}

export enum AudioCallGameActions {
  REQUEST_AUDIOCALL_DATA = 'REQUEST_AUDIOCALL_DATA',
  SET_AUDIOCALL_DATA = 'SET_AUDIOCALL_DATA',
  AUDIOCALL_REQUEST_START = 'AUDIOCALL_REQUEST_START',
  AUDIOCALL_REQUEST_END = 'AUDIOCALL_REQUEST_END',
  INCREASE_AUDIOCALL_CORRECT_ASWERS = 'INCREASE_AUDIOCALL_CORRECT_ASWERS',
  CHNAGE_AUDIOCALL_STATUS = 'CHNAGE_AUDIOCALL_STATUS',
  RESET_AUDIOCALL_STATE = 'RESET_AUDIOCALL_STATE',
  SET_AUDIOCALL_WORDS_SECTION = 'SET_AUDIOCALL_WORDS_SECTION',
}

export interface RequestAucioCallDataAction {
  type: AudioCallGameActions.REQUEST_AUDIOCALL_DATA;
  payload: WordsRequestData;
}

export interface SetAucioCallDataAction {
  type: AudioCallGameActions.SET_AUDIOCALL_DATA;
  payload: Word[] | WordWithCustomProps[];
}

export interface SetWordsAucioCallAction {
  type: AudioCallGameActions.SET_AUDIOCALL_WORDS_SECTION;
  payload: WordsRequestData;
}

export interface AucioCallRequestStartAction {
  type: AudioCallGameActions.AUDIOCALL_REQUEST_START;
}

export interface AucioCallRequestEndAction {
  type: AudioCallGameActions.AUDIOCALL_REQUEST_END;
}

export interface IncreaseAucioCallCorrectAnswersAction {
  type: AudioCallGameActions.INCREASE_AUDIOCALL_CORRECT_ASWERS;
}

export interface ChangeAucioCallGameStatusAction {
  type: AudioCallGameActions.CHNAGE_AUDIOCALL_STATUS;
  payload: AudioCallStatus;
}

export interface ResetAucioCallStateAction {
  type: AudioCallGameActions.RESET_AUDIOCALL_STATE;
}

export type AudioCallGameAction =
  | RequestAucioCallDataAction
  | SetAucioCallDataAction
  | SetWordsAucioCallAction
  | AucioCallRequestStartAction
  | AucioCallRequestEndAction
  | IncreaseAucioCallCorrectAnswersAction
  | ChangeAucioCallGameStatusAction
  | ResetAucioCallStateAction;
