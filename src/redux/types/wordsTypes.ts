import {
  WordsRequestData,
  WordWithCustomProps,
  WordWithCustomPropsRequest,
} from '../../services/words/wordsServiceTypes';

export interface WordsState {
  words: WordWithCustomProps[];
  hardWords: WordWithCustomProps[];
  request: boolean;
}
export enum WordsActionTypes {
  REQUEST_WORDS = 'REQUEST_WORDS',
  REQUEST_WORDS_PROPS = 'REQUEST_WORDS_PROPS',
  REQUEST_HARD_WORDS = 'REQUEST_HARD_WORDS',
  SET_HARD_WORDS = 'SET_HARD_WORDS',
  SET_WORDS = 'SET_WORDS',
  SET_WORDS_WITH_PROPS = 'SET_WORDS_WITH_PROPS',
  SET_ONE_WORD = 'SET_ONE_WORD',
  REMOVE_ONE_HARD_WORD = 'REMOVE_ONE_HARD_WORD',
  WORDS_REQUEST_START = 'WORDS_REQUEST_START',
  WORDS_REQUEST_END = 'WORDS_REQUEST_END',
}

interface SetHardWordsAction {
  type: WordsActionTypes.SET_HARD_WORDS;
  payload: WordWithCustomProps[];
}
interface RemoveOneHardWordAction {
  type: WordsActionTypes.REMOVE_ONE_HARD_WORD;
  payload: WordWithCustomProps;
}
export interface RequestHardWordsAction {
  type: WordsActionTypes.REQUEST_HARD_WORDS;
  payload: { userId: string };
}

interface UpdateOneWordAction {
  type: WordsActionTypes.SET_ONE_WORD;
  payload: WordWithCustomProps;
}

export interface WordsRequestStartAction {
  type: WordsActionTypes.WORDS_REQUEST_START;
}

export interface WordsRequestEndAction {
  type: WordsActionTypes.WORDS_REQUEST_END;
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
  payload: WordWithCustomProps[];
}

export interface SetWordsWithProps {
  type: WordsActionTypes.SET_WORDS_WITH_PROPS;
  payload: WordWithCustomProps[];
}

export type WordsAction =
  | SetWordsWithProps
  | RequestWordsWithPropsAction
  | RequestWordsAction
  | SetWordsAction
  | WordsRequestStartAction
  | WordsRequestEndAction
  | UpdateOneWordAction
  | RequestHardWordsAction
  | SetHardWordsAction
  | RemoveOneHardWordAction;
