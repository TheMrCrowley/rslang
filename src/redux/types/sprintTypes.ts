import {
  WordWithCustomProps,
  Word,
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
  words: Word[] | WordWithCustomProps[];
  gameStatus: SprintStatus;
  request: boolean;
  correctAnswers: number;
  group: number;
  page: number;
}

export enum SprintGameActions {
  REQUEST_SPRINT_DATA = 'REQUEST_SPRINT_DATA',
  SET_SPRINT_DATA = 'SET_SPRINT_DATA',
  SPRINT_REQUEST_START = 'SPRINT_REQUEST_START',
  SPRINT_REQUEST_END = 'SPRINT_REQUEST_END',
  INCREASE_CORRECT_ANSWERS = 'INCREASE_CORRECT_ANSWERS',
  CHANGE_SPRINT_STATUS = 'CHANGE_SPRINT_STATUS',
  RESET_SPRINT_STATE = 'RESET_SPRINT_STATE',
  SET_WORDS_SECTION = 'SET_WORDS_SECTION',
  SPRINT_CORRECT_ANSWER = 'SPRINT_CORRECT_ANSWER',
  SPRINT_INCORRECT_ANSWER = 'SPRINT_INCORRECT_ANSWER',
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
  payload: WordsRequestData;
}

export interface SetSprintDataAction {
  type: SprintGameActions.SET_SPRINT_DATA;
  payload: Word[] | WordWithCustomProps[];
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

export interface IncreaseCorrectAnswersAction {
  type: SprintGameActions.INCREASE_CORRECT_ANSWERS;
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
  | IncreaseCorrectAnswersAction
  | ChangeGameStatusAction
  | ResetSprintStateAction
  | SetWordsSectionAction
  | SprintCorrectAction
  | SprintInCorrectAction;
