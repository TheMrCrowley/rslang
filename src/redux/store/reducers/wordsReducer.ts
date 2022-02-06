/* eslint-disable @typescript-eslint/default-param-last */
import {
  IWord,
  IWordWithUserProps,
  WordById,
  WordsQueryParams,
  WordsQueryWithProps,
} from '../../../services/types';

import {
  SetWordAction,
  SetWordsAction,
  SetWordsWithProps,
  WordsAction,
  WordsActionTypes,
  WordsState,
} from '../../types/wordsTypes';

const wordsInitialState: WordsState = {
  words: [] as IWordWithUserProps[],
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
    case WordsActionTypes.REQUEST_WORDS_PROPS:
      return state;
    case WordsActionTypes.SET_WORDS:
      return { ...state, words: [...(action as SetWordsAction).payload] };
    case WordsActionTypes.SET_WORDS_WITH_PROPS:
      return {
        ...state,
        words: (action as SetWordsWithProps).payload[0].paginatedResults,
      };
    default:
      return state;
  }
};

export const requestWordsAction = (payload: WordsQueryParams): WordsAction => ({
  type: WordsActionTypes.REQUEST_WORDS,
  payload,
});

export const requestWordsWithPropsAction = (
  payload: WordsQueryWithProps
): WordsAction => ({ type: WordsActionTypes.REQUEST_WORDS_PROPS, payload });

export const requestWordAction = (payload: WordById): WordsAction => ({
  type: WordsActionTypes.REQUEST_WORD,
  payload,
});

export const setWordsAction = (payload: IWordWithUserProps[]): WordsAction => ({
  type: WordsActionTypes.SET_WORDS,
  payload,
});

export const setWordAction = (payload: IWord): WordsAction => ({
  type: WordsActionTypes.SET_WORD,
  payload,
});
