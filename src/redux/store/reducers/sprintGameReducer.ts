/* eslint-disable @typescript-eslint/default-param-last */
import {
  WordsRequestData,
  WordWithCustomProps,
} from '../../../services/words/wordsServiceTypes';
import {
  SprintGameAction,
  SprintGameActions,
  SprintGameStatus,
  SprintState,
  SprintStatus,
} from '../../types/sprintTypes';
import { UserWordResponse } from '../../../services/user-words/userWordsServiceTypes';

const sprintGameInitialState: SprintState = {
  words: [],
  allAnswers: [],
  request: false,
  gameStatus: SprintGameStatus.PREPARE,
  group: 0,
  initialPage: 0,
  currentPage: 0,
  book: false,
};

export const sprintGameReducer = (
  state = sprintGameInitialState,
  action: SprintGameAction
): SprintState => {
  switch (action.type) {
    case SprintGameActions.SPRINT_REQUEST_START:
      return { ...state, request: true };
    case SprintGameActions.SPRINT_REQUEST_END:
      return { ...state, request: false };
    case SprintGameActions.SET_SPRINT_DATA:
      return {
        ...state,
        words: [...action.payload.wordsForQuestion],
        allAnswers: [...action.payload.answers],
      };
    case SprintGameActions.CHANGE_SPRINT_STATUS:
      return { ...state, gameStatus: action.payload };
    case SprintGameActions.SET_WORDS_SECTION: {
      return {
        ...state,
        group: action.payload.group,
        initialPage: action.payload.page,
        currentPage: action.payload.page,
      };
    }
    case SprintGameActions.CHANGE_SPRINT_CURRENT_PAGE: {
      return { ...state, currentPage: state.currentPage - 1 };
    }
    case SprintGameActions.RESET_SPRINT_STATE:
      return { ...sprintGameInitialState };
    case SprintGameActions.SET_SPRINT_BOOK:
      return { ...state, book: true };
    default:
      return state;
  }
};

export const requestSprintDataAction = (payload: {
  group: number;
  page: number;
  book?: boolean;
  userId?: string;
}): SprintGameAction => ({
  type: SprintGameActions.REQUEST_SPRINT_DATA,
  payload,
});

export const setSprintDataAction = (payload: {
  wordsForQuestion: WordWithCustomProps[];
  answers: string[];
}): SprintGameAction => ({ type: SprintGameActions.SET_SPRINT_DATA, payload });

export const changeSprintStatusAction = (
  payload: SprintStatus
): SprintGameAction => ({
  type: SprintGameActions.CHANGE_SPRINT_STATUS,
  payload,
});

export const setWordsSectionAction = (
  payload: WordsRequestData
): SprintGameAction => ({ type: SprintGameActions.SET_WORDS_SECTION, payload });

export const changeSprintPageAction = (): SprintGameAction => ({
  type: SprintGameActions.CHANGE_SPRINT_CURRENT_PAGE,
});

export const sprintRequestStartAction = (): SprintGameAction => ({
  type: SprintGameActions.SPRINT_REQUEST_START,
});

export const sprintRequestEndAction = (): SprintGameAction => ({
  type: SprintGameActions.SPRINT_REQUEST_END,
});

export const resetSprintStateAction = (): SprintGameAction => ({
  type: SprintGameActions.RESET_SPRINT_STATE,
});

export const sprintCorrectAction = (payload: {
  userId: string;
  wordId: string;
  words: UserWordResponse[];
}): SprintGameAction => ({
  type: SprintGameActions.SPRINT_CORRECT_ANSWER,
  payload,
});

export const sprintInCorrectAction = (payload: {
  userId: string;
  wordId: string;
  words: UserWordResponse[];
}): SprintGameAction => ({
  type: SprintGameActions.SPRINT_INCORRECT_ANSWER,
  payload,
});

export const setSprintBookAction = (): SprintGameAction => ({
  type: SprintGameActions.SET_SPRINT_BOOK,
});

export const requestSprintHardWordsAction = (payload: {
  userId: string;
}): SprintGameAction => ({
  type: SprintGameActions.REQUEST_SPRINT_HARD_WORDS,
  payload,
});
