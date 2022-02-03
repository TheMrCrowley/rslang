/* eslint-disable @typescript-eslint/default-param-last */
import {
  WordsQueryParams,
  WordsResponse,
  IWord,
  WordById,
} from '../../../services/types';

import {
  WordsState,
  WordsAction,
  WordsActionTypes,
  SetWordsAction,
  SetWordAction,
} from '../../types/wordsTypes';

const wordsInitialState: WordsState = {
  words: [] as WordsResponse,
  word: {} as IWord,
};

export const wordsReducer = (
  state = wordsInitialState,
  action: WordsAction
): WordsState => {
  switch (action.type) {
    case WordsActionTypes.REQUEST_WORDS:
      return state;
    case WordsActionTypes.REQUEST_WORD:
      return state;
    case WordsActionTypes.SET_WORDS:
      return { ...state, words: [...(action as SetWordsAction).payload] };
    case WordsActionTypes.SET_WORD:
      return { ...state, word: (action as SetWordAction).payload };
    default:
      return state;
  }
};

export const requestWordsAction = (payload: WordsQueryParams): WordsAction => ({
  type: WordsActionTypes.REQUEST_WORDS,
  payload,
});

export const requestWordAction = (payload: WordById): WordsAction => ({
  type: WordsActionTypes.REQUEST_WORD,
  payload,
});

export const setWordsAction = (payload: WordsResponse): WordsAction => ({
  type: WordsActionTypes.SET_WORDS,
  payload,
});

export const setWordAction = (payload: IWord): WordsAction => ({
  type: WordsActionTypes.SET_WORD,
  payload,
});
