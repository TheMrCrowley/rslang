import { UserWordResponse } from '../../services/user-words/userWordsServiceTypes';
import {
  WordWithCustomProps,
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
  words: WordWithCustomProps[];
  allAnswers: string[];
  gameStatus: AudioCallStatus;
  request: boolean;
  correctAnswers: number;
  group: number;
  initialPage: number;
  currentPage: number;
  book: boolean;
}

export enum AudioCallGameActions {
  REQUEST_AUDIOCALL_DATA = 'REQUEST_AUDIOCALL_DATA',
  SET_AUDIOCALL_DATA = 'SET_AUDIOCALL_DATA',
  AUDIOCALL_REQUEST_START = 'AUDIOCALL_REQUEST_START',
  AUDIOCALL_REQUEST_END = 'AUDIOCALL_REQUEST_END',
  CHNAGE_AUDIOCALL_STATUS = 'CHNAGE_AUDIOCALL_STATUS',
  RESET_AUDIOCALL_STATE = 'RESET_AUDIOCALL_STATE',
  SET_AUDIOCALL_WORDS_SECTION = 'SET_AUDIOCALL_WORDS_SECTION',
  AUDIOCALL_CORRECT_ANSWER = 'AUDIOCALL_CORRECT_ANSWER',
  AUDIOCALL_INCORRECT_ANSWER = 'AUDIOCALL_INCORRECT_ANSWER',
  SET_AUDIOCALL_BOOK = 'SET_AUDIOCALL_BOOK',
  CHANGE_AUDIOCALL_CURRENT_PAGE = 'CHANGE_AUDIOCALL_CURRENT_PAGE',
  REQUEST_AUDIOCALL_HARD_WORDS = 'REQUEST_AUDIOCALL_HARD_WORDS',
}

export interface RequestAudiocallHardWords {
  type: AudioCallGameActions.REQUEST_AUDIOCALL_HARD_WORDS;
  payload: { userId: string };
}

export interface ChangeAudiocallCurrentPageAction {
  type: AudioCallGameActions.CHANGE_AUDIOCALL_CURRENT_PAGE;
}

export interface SetAudiocallBookAction {
  type: AudioCallGameActions.SET_AUDIOCALL_BOOK;
}

export interface AudioCallCorrectAction {
  type: AudioCallGameActions.AUDIOCALL_CORRECT_ANSWER;
  payload: {
    userId: string;
    wordId: string;
    words: UserWordResponse[];
  };
}

export interface AudioCallInCorrectAction {
  type: AudioCallGameActions.AUDIOCALL_INCORRECT_ANSWER;
  payload: {
    userId: string;
    wordId: string;
    words: UserWordResponse[];
  };
}

export interface RequestAucioCallDataAction {
  type: AudioCallGameActions.REQUEST_AUDIOCALL_DATA;
  payload: { group: number; page: number; book?: boolean; userId?: string };
}

export interface SetAucioCallDataAction {
  type: AudioCallGameActions.SET_AUDIOCALL_DATA;
  payload: { wordsForQuestions: WordWithCustomProps[]; answers: string[] };
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
  | ChangeAucioCallGameStatusAction
  | ResetAucioCallStateAction
  | AudioCallCorrectAction
  | AudioCallInCorrectAction
  | SetAudiocallBookAction
  | ChangeAudiocallCurrentPageAction
  | RequestAudiocallHardWords;
