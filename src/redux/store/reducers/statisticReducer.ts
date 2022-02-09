/* eslint-disable @typescript-eslint/default-param-last */
import {
  GameStatisticItem,
  WordStatisticItem,
} from '../../../services/statistic/statisticServiceTypes';
import {
  StatisticState,
  StatisticAction,
  StatisticActionTypes,
} from '../../types/statisticTypes';

const statisticInitialState: StatisticState = {
  learnedWords: 0,
  audiocallStatistic: {} as GameStatisticItem,
  sprintStatistic: {} as GameStatisticItem,
  wordStatistic: {} as WordStatisticItem,
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
      };
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

export const setStatisticAction = (payload: {
  data: StatisticState;
}): StatisticAction => ({ type: StatisticActionTypes.SET_STATISTIC, payload });
