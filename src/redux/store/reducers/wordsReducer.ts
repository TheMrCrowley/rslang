/* eslint-disable @typescript-eslint/default-param-last */
import {
  SetWordsAction,
  WordsAction,
  WordsActionTypes,
  WordsState,
} from '../../types/wordsTypes';
import {
  Word,
  WordsRequestData,
  WordWithCustomProps,
  WordWithCustomPropsRequest,
} from '../../../services/words/wordsServiceTypes';

const wordsInitialState: WordsState = {
  words: [] as Word[],
};

export const wordsReducer = (
  state = wordsInitialState,
  action: WordsAction
): WordsState => {
  switch (action.type) {
    case WordsActionTypes.REQUEST_WORDS:
      return state;
    case WordsActionTypes.REQUEST_WORDS_PROPS:
      return state;
    case WordsActionTypes.SET_WORDS:
      return { ...state, words: [...(action as SetWordsAction).payload] };
    default:
      return state;
  }
};

export const requestWordsAction = (payload: WordsRequestData): WordsAction => ({
  type: WordsActionTypes.REQUEST_WORDS,
  payload,
});

export const requestWordsWithPropsAction = (
  payload: WordWithCustomPropsRequest
): WordsAction => ({ type: WordsActionTypes.REQUEST_WORDS_PROPS, payload });

export const setWordsAction = (
  payload: WordWithCustomProps[] | Word[]
): WordsAction => ({
  type: WordsActionTypes.SET_WORDS,
  payload,
});
