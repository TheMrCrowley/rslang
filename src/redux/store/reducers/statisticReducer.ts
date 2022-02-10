/* eslint-disable @typescript-eslint/default-param-last */
import {
  changeAudioCallCorrectAnswersHelper,
  changeAudioCallIncorrectAnswersHelper,
  changeAudioCallNewWordHelper,
  changeSprintCorrectAnswersHelper,
  changeSprintIncorrectAnswersHelper,
  changeSprintNewWordHelper,
  decreaseLearnedWordsHelper,
  increaseLearnedWordsHelper,
} from '../../../helpers/statisticHandlers';
import {
  GameStatisticItem,
  StatisticResponse,
  WordStatisticItem,
} from '../../../services/statistic/statisticServiceTypes';
import {
  StatisticState,
  StatisticAction,
  StatisticActionTypes,
} from '../../types/statisticTypes';

const statisticInitialState: StatisticState = {
  completeStatistic: {} as StatisticResponse,
  learnedWords: 0,
  audiocallStatistic: {} as GameStatisticItem,
  sprintStatistic: {} as GameStatisticItem,
  wordStatistic: {} as WordStatisticItem,
  sprintCurrentStreak: 0,
  audiocallCurrentStreak: 0,
};

export const statisticReducer = (
  state = statisticInitialState,
  action: StatisticAction
): StatisticState => {
  switch (action.type) {
    case StatisticActionTypes.REQUEST_STATISTIC:
      return state;
    case StatisticActionTypes.SET_STATISTIC:
      return {
        ...state,
        learnedWords: action.payload.learnedWords,
        wordStatistic: { ...action.payload.wordStatistic },
        sprintStatistic: { ...action.payload.sprintStatistic },
        audiocallStatistic: { ...action.payload.audiocallStatistic },
        completeStatistic: { ...action.payload.completeStatistic },
      };
    case StatisticActionTypes.INCREASE_LEARNED_WORDS:
      return { ...increaseLearnedWordsHelper(state) };
    case StatisticActionTypes.DECREASE_LEARNED_WORDS:
      return { ...decreaseLearnedWordsHelper(state) };
    case StatisticActionTypes.CHANGE_SPRINT_NEW_WORD:
      return { ...changeSprintNewWordHelper(state) };
    case StatisticActionTypes.CHANGE_SPRINT_CORRECT_ANSWERS:
      return { ...changeSprintCorrectAnswersHelper(state) };
    case StatisticActionTypes.CHANGE_SPRINT_INCORRECT_ANSWER:
      return { ...changeSprintIncorrectAnswersHelper(state) };
    case StatisticActionTypes.CHANGE_AUDIOCALL_NEW_WORD:
      return { ...changeAudioCallNewWordHelper(state) };
    case StatisticActionTypes.CHANGE_AUDIOCALL_CORRECT_ANSWERS:
      return { ...changeAudioCallCorrectAnswersHelper(state) };
    case StatisticActionTypes.CHANGE_AUDIOCALL_INCORRECT_ANSWER:
      return { ...changeAudioCallIncorrectAnswersHelper(state) };
    default:
      return state;
  }
};

export const requestStatisticAction = (payload: {
  userId: string;
}): StatisticAction => ({
  type: StatisticActionTypes.REQUEST_STATISTIC,
  payload,
});

export const setStatisticAction = (
  payload: StatisticState
): StatisticAction => ({ type: StatisticActionTypes.SET_STATISTIC, payload });

export const saveStatisticAction = (payload: {
  newStatistic: StatisticState;
  userId: string;
}): StatisticAction => ({ type: StatisticActionTypes.SAVE_STATISTIC, payload });

export const increaseLearnedWordsAtion = (): StatisticAction => ({
  type: StatisticActionTypes.INCREASE_LEARNED_WORDS,
});

export const decreaseLearnedWordsAtion = (): StatisticAction => ({
  type: StatisticActionTypes.DECREASE_LEARNED_WORDS,
});

export const changeSprintNewWordAction = (): StatisticAction => ({
  type: StatisticActionTypes.CHANGE_SPRINT_NEW_WORD,
});

export const changeSprintCorrectAnswersAction = (): StatisticAction => ({
  type: StatisticActionTypes.CHANGE_SPRINT_CORRECT_ANSWERS,
});

export const changeSprintIncorrectAnswersAction = (): StatisticAction => ({
  type: StatisticActionTypes.CHANGE_SPRINT_INCORRECT_ANSWER,
});

export const changeAudioCallNewWordAction = (): StatisticAction => ({
  type: StatisticActionTypes.CHANGE_AUDIOCALL_NEW_WORD,
});

export const changeAudioCallCorrectAnswerAction = (): StatisticAction => ({
  type: StatisticActionTypes.CHANGE_AUDIOCALL_CORRECT_ANSWERS,
});

export const changeAudioCallIncorrectAnswerAction = (): StatisticAction => ({
  type: StatisticActionTypes.CHANGE_AUDIOCALL_INCORRECT_ANSWER,
});
