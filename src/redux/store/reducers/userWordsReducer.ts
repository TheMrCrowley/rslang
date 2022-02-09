/* eslint-disable @typescript-eslint/default-param-last */
import {
  UserWordsAction,
  UserWordsActionTypes,
  UserWordsState,
} from '../../types/userWordsTypes';
import {
  RequestUserWordsData,
  UserWordResponse,
} from '../../../services/user-words/userWordsServiceTypes';

const userWordsInitialState: UserWordsState = {
  userWords: [] as UserWordResponse[],
};

export const userWordsReducer = (
  state = userWordsInitialState,
  action: UserWordsAction
): UserWordsState => {
  switch (action.type) {
    case UserWordsActionTypes.GET_USER_WORDS:
      return state;
    case UserWordsActionTypes.SET_ONE_USER_WORD:
      return { userWords: [...state.userWords, action.payload] };
    case UserWordsActionTypes.SET_USER_WORDS:
      return { userWords: [...action.payload] };
    default:
      return state;
  }
};

export const getUserWordsAction = (
  payload: RequestUserWordsData
): UserWordsAction => ({ type: UserWordsActionTypes.GET_USER_WORDS, payload });

export const setUserWordsAction = (
  payload: UserWordResponse[]
): UserWordsAction => ({ type: UserWordsActionTypes.SET_USER_WORDS, payload });

export const createHardUserWordAction = (payload: {
  userId: string;
  wordId: string;
}): UserWordsAction => ({
  type: UserWordsActionTypes.CREATE_HARD_USER_WORD,
  payload,
});

export const createStudiedUserWordAction = (payload: {
  userId: string;
  wordId: string;
}): UserWordsAction => ({
  type: UserWordsActionTypes.CREATE_STUDIED_USER_WORD,
  payload,
});

export const setOneUserWordAction = (
  payload: UserWordResponse
): UserWordsAction => ({
  type: UserWordsActionTypes.SET_ONE_USER_WORD,
  payload,
});

export const changeToHardAction = (payload: {
  userId: string;
  wordId: string;
  words: UserWordResponse[];
}): UserWordsAction => ({
  type: UserWordsActionTypes.CHANGE_TO_HARD,
  payload,
});

export const changeToStudiedAction = (payload: {
  userId: string;
  wordId: string;
  words: UserWordResponse[];
}): UserWordsAction => ({
  type: UserWordsActionTypes.CHANGE_TO_STUDIED,
  payload,
});
