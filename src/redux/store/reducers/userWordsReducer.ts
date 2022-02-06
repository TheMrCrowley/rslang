/* eslint-disable @typescript-eslint/default-param-last */
import {
  PayloadUserAndWordId,
  PayloadUserId,
  UserWordsAction,
  UserWordsActionTypes,
  UserWordsState,
} from '../../types/userWordsTypes';
import { UserWord } from '../../../services/types';

const userWordsInitialState: UserWordsState = {
  userWords: [],
};

export const userWordsReducer = (
  state = userWordsInitialState,
  action: UserWordsAction
): UserWordsState => {
  switch (action.type) {
    case UserWordsActionTypes.GET_USER_WORDS:
      return state;
    case UserWordsActionTypes.SET_USER_WORDS:
      return { ...state, userWords: [...action.payload] };
    case UserWordsActionTypes.SET_HARD_WORD:
      return state;
    default:
      return state;
  }
};

export const getUserWordsAction = (
  payload: PayloadUserId
): UserWordsAction => ({ type: UserWordsActionTypes.GET_USER_WORDS, payload });

export const setUserWordsAction = (payload: UserWord[]): UserWordsAction => ({
  type: UserWordsActionTypes.SET_USER_WORDS,
  payload,
});

export const setHardWord = (
  payload: PayloadUserAndWordId
): UserWordsAction => ({ type: UserWordsActionTypes.SET_HARD_WORD, payload });
