import {
  RequestUserWordsData,
  UserWordResponse,
} from '../../services/user-words/userWordsServiceTypes';

export interface UserWordsState {
  userWords: UserWordResponse[];
}

export enum UserWordsActionTypes {
  GET_USER_WORDS = 'GET_USER_WORDS',
  SET_USER_WORDS = 'SET_USER_WORDS',
  CREATE_HARD_USER_WORD = 'CREATE_HARD_USER_WORD',
  CREATE_STUDIED_USER_WORD = 'CREATE_STUDIED_USER_WORD',
  SET_ONE_USER_WORD = 'SET_ONE_USER_WORD',
  CHANGE_TO_HARD = 'CHANGE_TO_HARD',
  CHANGE_TO_STUDIED = 'CHANGE_TO_STUDIED',
}

export interface GetUserWordsAction {
  type: UserWordsActionTypes.GET_USER_WORDS;
  payload: RequestUserWordsData;
}

export interface SetUserWordsAction {
  type: UserWordsActionTypes.SET_USER_WORDS;
  payload: UserWordResponse[];
}

export interface CreateHardUserWordAction {
  type: UserWordsActionTypes.CREATE_HARD_USER_WORD;
  payload: { userId: string; wordId: string };
}

export interface CreateStudiedUserWordAction {
  type: UserWordsActionTypes.CREATE_STUDIED_USER_WORD;
  payload: { userId: string; wordId: string };
}

export interface SetOneUserWordAction {
  type: UserWordsActionTypes.SET_ONE_USER_WORD;
  payload: UserWordResponse;
}

export interface ChangeToHardAction {
  type: UserWordsActionTypes.CHANGE_TO_HARD;
  payload: {
    userId: string;
    wordId: string;
    words: UserWordResponse[];
  };
}

export interface ChangeToStudiedAction {
  type: UserWordsActionTypes.CHANGE_TO_STUDIED;
  payload: {
    userId: string;
    wordId: string;
    words: UserWordResponse[];
  };
}

export type UserWordsAction =
  | GetUserWordsAction
  | SetUserWordsAction
  | ChangeToHardAction
  | ChangeToStudiedAction
  | SetOneUserWordAction
  | CreateHardUserWordAction
  | CreateStudiedUserWordAction;
