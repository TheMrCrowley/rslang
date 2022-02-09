import {
  GameStatisticItem,
  WordStatisticItem,
} from '../../services/statistic/statisticServiceTypes';

export interface StatisticState {
  learnedWords: number;
  sprintStatistic: GameStatisticItem;
  audiocallStatistic: GameStatisticItem;
  wordStatistic: WordStatisticItem;
}

export enum StatisticActionTypes {
  REQUEST_STATISTIC = 'REQUEST_STATISTIC',
  SET_STATISTIC = 'SET_STATISTIC',
}

export interface RequestStatisticAction {
  type: StatisticActionTypes.REQUEST_STATISTIC;
  payload: { userId: string };
}

export interface SetStatisticAction {
  type: StatisticActionTypes.SET_STATISTIC;
  payload: StatisticState;
}

export type StatisticAction = RequestStatisticAction | SetStatisticAction;
