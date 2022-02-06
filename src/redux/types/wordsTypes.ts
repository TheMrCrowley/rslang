import {
  AggregatedWordsItem,
  IWord,
  WordById,
  WordsQueryParams,
  WordsQueryWithProps,
} from '../../services/types';

export enum WordsActionTypes {
  REQUEST_WORDS = 'REQUEST_WORDS',
  REQUEST_WORDS_PROPS = 'REQUEST_WORDS_PROPS',
  REQUEST_WORD = 'REQUEST_WORD',
  SET_WORDS = 'SET_WORDS',
  SET_WORD = 'SET_WORD',
  SET_WORDS_WITH_PROPS = 'SET_WORDS_WITH_PROPS',
}

export interface WordsState {
  words: IWord[];
  word: IWord;
}

export interface RequestWordsAction {
  type: WordsActionTypes.REQUEST_WORDS;
  payload: WordsQueryParams;
}

export interface RequestWordsWithPropsAction {
  type: WordsActionTypes.REQUEST_WORDS_PROPS;
  payload: WordsQueryWithProps;
}

export interface RequestWordAction {
  type: WordsActionTypes.REQUEST_WORD;
  payload: WordById;
}

export interface SetWordsAction {
  type: WordsActionTypes.SET_WORDS;
  payload: IWord[];
}

export interface SetWordsWithProps {
  type: WordsActionTypes.SET_WORDS_WITH_PROPS;
  payload: AggregatedWordsItem[];
}

export interface SetWordAction {
  type: WordsActionTypes.SET_WORD;
  payload: IWord;
}

export type WordsAction =
  | SetWordsWithProps
  | RequestWordsWithPropsAction
  | RequestWordsAction
  | RequestWordAction
  | SetWordsAction
  | SetWordAction;
