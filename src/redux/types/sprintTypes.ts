import {
  WordWithCustomProps,
  WordsRequestData,
} from '../../services/words/wordsServiceTypes';
import { UserWordResponse } from '../../services/user-words/userWordsServiceTypes';

export enum SprintGameStatus {
  PREPARE = 'PREPARE',
  INRUN = 'INRUN',
  END = 'END',
}

export type SprintStatus =
  | SprintGameStatus.PREPARE
  | SprintGameStatus.INRUN
  | SprintGameStatus.END;

export interface SprintState {
  words: WordWithCustomProps[];
  allAnswers: string[];
  gameStatus: SprintStatus;
  request: boolean;
  group: number;
  initialPage: number;
  currentPage: number;
  book: boolean;
}

export enum SprintGameActions {
  REQUEST_SPRINT_DATA = 'REQUEST_SPRINT_DATA',
  SET_SPRINT_DATA = 'SET_SPRINT_DATA',
  SPRINT_REQUEST_START = 'SPRINT_REQUEST_START',
  SPRINT_REQUEST_END = 'SPRINT_REQUEST_END',
  CHANGE_SPRINT_STATUS = 'CHANGE_SPRINT_STATUS',
  RESET_SPRINT_STATE = 'RESET_SPRINT_STATE',
  SET_WORDS_SECTION = 'SET_WORDS_SECTION',
  SPRINT_CORRECT_ANSWER = 'SPRINT_CORRECT_ANSWER',
  SPRINT_INCORRECT_ANSWER = 'SPRINT_INCORRECT_ANSWER',
  SET_SPRINT_BOOK = 'SET_SPRINT_BOOK',
  CHANGE_SPRINT_CURRENT_PAGE = 'CHANGE_SPRINT_CURRENT_PAGE',
}

interface ChangeCurrentPageAction {
  type: SprintGameActions.CHANGE_SPRINT_CURRENT_PAGE;
}

export interface SetSprintBookAction {
  type: SprintGameActions.SET_SPRINT_BOOK;
}

export interface SprintCorrectAction {
  type: SprintGameActions.SPRINT_CORRECT_ANSWER;
  payload: {
    userId: string;
    wordId: string;
    words: UserWordResponse[];
  };
}

export interface SprintInCorrectAction {
  type: SprintGameActions.SPRINT_INCORRECT_ANSWER;
  payload: {
    userId: string;
    wordId: string;
    words: UserWordResponse[];
  };
}

export interface RequestSprintDataAction {
  type: SprintGameActions.REQUEST_SPRINT_DATA;
  payload: { group: number; page: number; book?: boolean; userId?: string };
}

export interface SetSprintDataAction {
  type: SprintGameActions.SET_SPRINT_DATA;
  payload: { wordsForQuestion: WordWithCustomProps[]; answers: string[] };
}

export interface SetWordsSectionAction {
  type: SprintGameActions.SET_WORDS_SECTION;
  payload: WordsRequestData;
}

export interface SprintRequestStartAction {
  type: SprintGameActions.SPRINT_REQUEST_START;
}

export interface SprintRequestEndAction {
  type: SprintGameActions.SPRINT_REQUEST_END;
}

export interface ChangeGameStatusAction {
  type: SprintGameActions.CHANGE_SPRINT_STATUS;
  payload: SprintStatus;
}

export interface ResetSprintStateAction {
  type: SprintGameActions.RESET_SPRINT_STATE;
}

export type SprintGameAction =
  | RequestSprintDataAction
  | SetSprintDataAction
  | SprintRequestStartAction
  | SprintRequestEndAction
  | ChangeGameStatusAction
  | ResetSprintStateAction
  | SetWordsSectionAction
  | SprintCorrectAction
  | SprintInCorrectAction
  | SetSprintBookAction
  | ChangeCurrentPageAction;
