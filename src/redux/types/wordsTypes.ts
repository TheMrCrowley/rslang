import {
  Word,
  WordsRequestData,
  WordWithCustomProps,
  WordWithCustomPropsRequest,
} from '../../services/words/wordsServiceTypes';

export enum WordsActionTypes {
  REQUEST_WORDS = 'REQUEST_WORDS',
  REQUEST_WORDS_PROPS = 'REQUEST_WORDS_PROPS',
  SET_WORDS = 'SET_WORDS',
  SET_WORDS_WITH_PROPS = 'SET_WORDS_WITH_PROPS',
}

export interface WordsState {
  words: WordWithCustomProps[] | Word[];
}

export interface RequestWordsAction {
  type: WordsActionTypes.REQUEST_WORDS;
  payload: WordsRequestData;
}

export interface RequestWordsWithPropsAction {
  type: WordsActionTypes.REQUEST_WORDS_PROPS;
  payload: WordWithCustomPropsRequest;
}

export interface SetWordsAction {
  type: WordsActionTypes.SET_WORDS;
  payload: Word[];
}

export interface SetWordsWithProps {
  type: WordsActionTypes.SET_WORDS_WITH_PROPS;
  payload: WordWithCustomProps[];
}

export type WordsAction =
  | SetWordsWithProps
  | RequestWordsWithPropsAction
  | RequestWordsAction
  | SetWordsAction;
