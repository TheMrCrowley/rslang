/* eslint-disable @typescript-eslint/default-param-last */
import {
  UserWordsAction,
  UserWordsActionTypes,
  UserWordsState,
} from '../../types/userWordsTypes';
import {
  ChangeDifficultyRequest,
  ChangeOptionalRequest,
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
    case UserWordsActionTypes.SET_WORD_DIFFICULTY:
      return state;
    case UserWordsActionTypes.CORRECT_ANSWER:
      return state;
    case UserWordsActionTypes.INCORRECT_ANSWER:
      return state;
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

export const correctAnswerAction = (
  payload: ChangeOptionalRequest
): UserWordsAction => ({
  type: UserWordsActionTypes.CORRECT_ANSWER,
  payload,
});

export const incorrectAnswerAction = (
  payload: ChangeOptionalRequest
): UserWordsAction => ({
  type: UserWordsActionTypes.INCORRECT_ANSWER,
  payload,
});

export const setWordDifficultyAction = (
  payload: ChangeDifficultyRequest
): UserWordsAction => ({
  type: UserWordsActionTypes.SET_WORD_DIFFICULTY,
  payload,
});
