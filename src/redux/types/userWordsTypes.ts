import { UserWord } from '../../services/types';

export enum UserWordsActionTypes {
  GET_USER_WORDS = 'GET_USER_WORDS',
  REQUEST_SET_WORD = 'REQUEST_SET_WORD',
  SET_WORD = 'SET_WORD',
  GET_ONE_WORD = 'GET_ONE_WORD',
  UPDATE_USER_WORD = 'UPDATE_USER_WORD',
  DELETE_USER_WORD = 'DELETE_USER_WORD',
  SET_HARD_WORD = 'SET_HARD_WORD',
  SET_STUDIED_WORD = 'SET_STUDIED_WORD',
  SET_USER_WORDS = 'SET_USER_WORDS',
}

export interface UserWordsState {
  userWords: UserWord[];
}

export interface GetUserWordsAction {
  type: UserWordsActionTypes.GET_USER_WORDS;
  payload: PayloadUserId;
}

export interface RequestSetWordAction {
  type: UserWordsActionTypes.REQUEST_SET_WORD;
  payload: PayloadUserAndWordId;
}

export interface SetWordAction {
  type: UserWordsActionTypes.SET_WORD;
  payload: UserWord;
}

export interface GetOneWordAction {
  type: UserWordsActionTypes.GET_ONE_WORD;
  payload: PayloadUserAndWordId;
}

export interface SetHardWordAction {
  type: UserWordsActionTypes.SET_HARD_WORD;
  payload: PayloadUserAndWordId;
}

export interface SetUserWordsAction {
  type: UserWordsActionTypes.SET_USER_WORDS;
  payload: UserWord[];
}

export interface PayloadUserId {
  userId: string;
}

export interface PayloadUserAndWordId {
  userId: string;
  wordId: string;
}
export type UserWordsAction =
  | GetUserWordsAction
  | SetUserWordsAction
  | SetHardWordAction;
