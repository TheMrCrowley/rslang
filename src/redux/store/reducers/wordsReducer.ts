/* eslint-disable @typescript-eslint/default-param-last */
import {
  SetWordsAction,
  WordsAction,
  WordsActionTypes,
  WordsState,
} from '../../types/wordsTypes';
import {
  WordsRequestData,
  WordWithCustomProps,
  WordWithCustomPropsRequest,
} from '../../../services/words/wordsServiceTypes';
import { removeHardWord, updateWords } from '../../../helpers/wordsHelpers';

const wordsInitialState: WordsState = {
  words: [],
  hardWords: [],
  request: false,
};

export const wordsReducer = (
  state = wordsInitialState,
  action: WordsAction
): WordsState => {
  switch (action.type) {
    case WordsActionTypes.SET_WORDS:
      return { ...state, words: [...(action as SetWordsAction).payload] };
    case WordsActionTypes.WORDS_REQUEST_START:
      return { ...state, request: true };
    case WordsActionTypes.WORDS_REQUEST_END:
      return { ...state, request: false };
    case WordsActionTypes.SET_ONE_WORD:
      return { ...state, words: updateWords(state.words, action.payload) };
    case WordsActionTypes.SET_HARD_WORDS:
      return { ...state, hardWords: [...action.payload] };
    case WordsActionTypes.REMOVE_ONE_HARD_WORD:
      return {
        ...state,
        hardWords: removeHardWord(state.hardWords, action.payload),
      };
    default:
      return state;
  }
};

export const setHardWordsAction = (
  payload: WordWithCustomProps[]
): WordsAction => ({ type: WordsActionTypes.SET_HARD_WORDS, payload });

export const removeOneHardWordAction = (
  payload: WordWithCustomProps
): WordsAction => ({
  type: WordsActionTypes.REMOVE_ONE_HARD_WORD,
  payload,
});

export const setOneWordAction = (
  payload: WordWithCustomProps
): WordsAction => ({
  type: WordsActionTypes.SET_ONE_WORD,
  payload,
});

export const requestWordsAction = (payload: WordsRequestData): WordsAction => ({
  type: WordsActionTypes.REQUEST_WORDS,
  payload,
});

export const requestWordsWithPropsAction = (
  payload: WordWithCustomPropsRequest
): WordsAction => ({ type: WordsActionTypes.REQUEST_WORDS_PROPS, payload });

export const setWordsAction = (
  payload: WordWithCustomProps[]
): WordsAction => ({
  type: WordsActionTypes.SET_WORDS,
  payload,
});

export const requestHardWordsAction = (payload: {
  userId: string;
}): WordsAction => ({ type: WordsActionTypes.REQUEST_HARD_WORDS, payload });

export const wordsRequestStartAction = (): WordsAction => ({
  type: WordsActionTypes.WORDS_REQUEST_START,
});

export const wordsRequestEndAction = (): WordsAction => ({
  type: WordsActionTypes.WORDS_REQUEST_END,
});
