import {
  IWord,
  WordById,
  WordsQueryParams,
  WordsResponse,
} from '../../services/types';

export enum WordsActionTypes {
  REQUEST_WORDS = 'REQUEST_WORDS',
  REQUEST_WORD = 'REQUEST_WORD',
  SET_WORDS = 'SET_WORDS',
  SET_WORD = 'SET_WORD',
}

export interface WordsState {
  words: WordsResponse;
  word: IWord;
}

export interface RequestWordsAction {
  type: WordsActionTypes.REQUEST_WORDS;
  payload: WordsQueryParams;
}

export interface RequestWordAction {
  type: WordsActionTypes.REQUEST_WORD;
  payload: WordById;
}

export interface SetWordsAction {
  type: WordsActionTypes.SET_WORDS;
  payload: WordsResponse;
}

export interface SetWordAction {
  type: WordsActionTypes.SET_WORD;
  payload: IWord;
}

export type WordsAction =
  | RequestWordsAction
  | RequestWordAction
  | SetWordsAction
  | SetWordAction;
