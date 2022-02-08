/* eslint-disable @typescript-eslint/default-param-last */

import {
  Word,
  WordsRequestData,
  WordWithCustomProps,
} from '../../../services/words/wordsServiceTypes';
import {
  SprintGameStatus,
  SprintState,
  SprintGameAction,
  SprintGameActions,
  SprintStatus,
} from '../../types/sprintTypes';

const sprintGameInitialState: SprintState = {
  words: [] as Word[],
  correctAnswers: 0,
  request: false,
  gameStatus: SprintGameStatus.PREPARE,
  group: 0,
  page: 0,
};

export const sprintGameReducer = (
  state = sprintGameInitialState,
  action: SprintGameAction
): SprintState => {
  switch (action.type) {
    case SprintGameActions.REQUEST_SPRINT_DATA:
      return state;
    case SprintGameActions.SPRINT_REQUEST_START:
      return { ...state, request: true };
    case SprintGameActions.SPRINT_REQUEST_END:
      return { ...state, request: false };
    case SprintGameActions.INCREASE_CORRECT_ASWERS:
      return { ...state, correctAnswers: state.correctAnswers + 1 };
    case SprintGameActions.SET_SPRINT_DATA:
      return { ...state, words: [...action.payload] };
    case SprintGameActions.CHNAGE_SPRINT_STATUS:
      return { ...state, gameStatus: action.payload };
    case SprintGameActions.SET_WORDS_SECTION: {
      return {
        ...state,
        group: action.payload.group,
        page: action.payload.page,
      };
    }
    case SprintGameActions.RESET_SPRINT_STATE:
      return { ...sprintGameInitialState };
    default:
      return state;
  }
};

export const requestSptintDataAction = (
  payload: WordsRequestData
): SprintGameAction => ({
  type: SprintGameActions.REQUEST_SPRINT_DATA,
  payload,
});

export const setSprintDataAction = (
  payload: Word[] | WordWithCustomProps[]
): SprintGameAction => ({ type: SprintGameActions.SET_SPRINT_DATA, payload });

export const changeSprintStatusAction = (
  payload: SprintStatus
): SprintGameAction => ({
  type: SprintGameActions.CHNAGE_SPRINT_STATUS,
  payload,
});

export const setWordsSectionAction = (
  payload: WordsRequestData
): SprintGameAction => ({ type: SprintGameActions.SET_WORDS_SECTION, payload });

export const sprintRequestStartAction = (): SprintGameAction => ({
  type: SprintGameActions.SPRINT_REQUEST_START,
});

export const sprintRequestEndAction = (): SprintGameAction => ({
  type: SprintGameActions.SPRINT_REQUEST_END,
});

export const sprintIncreaseAnswerAction = (): SprintGameAction => ({
  type: SprintGameActions.INCREASE_CORRECT_ASWERS,
});

export const resetSprintStateAction = (): SprintGameAction => ({
  type: SprintGameActions.RESET_SPRINT_STATE,
});