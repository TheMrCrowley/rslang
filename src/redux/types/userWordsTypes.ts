import {
  ChangeDifficultyRequest,
  ChangeOptionalRequest,
  RequestUserWordsData,
  UserWordResponse,
} from '../../services/user-words/userWordsServiceTypes';

export interface UserWordsState {
  userWords: UserWordResponse[];
}

export enum UserWordsActionTypes {
  GET_USER_WORDS = 'GET_USER_WORDS',
  SET_USER_WORDS = 'SET_USER_WORDS',
  SET_WORD_DIFFICULTY = 'SET_WORD_DIFFICULTY',
  CORRECT_ANSWER = 'CORRECT_ANSWER',
  INCORRECT_ANSWER = 'INCORRECT_ANSWER',
}

export interface GetUserWordsAction {
  type: UserWordsActionTypes.GET_USER_WORDS;
  payload: RequestUserWordsData;
}

export interface SetUserWordsAction {
  type: UserWordsActionTypes.SET_USER_WORDS;
  payload: UserWordResponse[];
}

export interface SetWordDifficulty {
  type: UserWordsActionTypes.SET_WORD_DIFFICULTY;
  payload: ChangeDifficultyRequest;
}

export interface CorrectAnswerAction {
  type: UserWordsActionTypes.CORRECT_ANSWER;
  payload: ChangeOptionalRequest;
}

export interface InCorrectAnswerAction {
  type: UserWordsActionTypes.INCORRECT_ANSWER;
  payload: ChangeOptionalRequest;
}

export type UserWordsAction =
  | GetUserWordsAction
  | SetUserWordsAction
  | SetWordDifficulty
  | CorrectAnswerAction
  | InCorrectAnswerAction;
