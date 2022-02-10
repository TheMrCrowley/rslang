import {
  GameStatisticItem,
  StatisticResponse,
  WordStatisticItem,
} from '../../services/statistic/statisticServiceTypes';

export interface StatisticState {
  completeStatistic: StatisticResponse;
  learnedWords: number;
  sprintStatistic: GameStatisticItem;
  audiocallStatistic: GameStatisticItem;
  wordStatistic: WordStatisticItem;
  sprintCurrentStreak: number;
  audiocallCurrentStreak: number;
}

export enum StatisticActionTypes {
  REQUEST_STATISTIC = 'REQUEST_STATISTIC',
  SET_STATISTIC = 'SET_STATISTIC',
  SAVE_STATISTIC = 'SAVE_STATISTIC',
  INCREASE_LEARNED_WORDS = 'INCREASE_LEARNED_WORDS',
  DECREASE_LEARNED_WORDS = 'DECREASE_LEARNED_WORDS',
  CHANGE_SPRINT_NEW_WORD = 'CHANGE_SPRINT_NEW_WORD',
  CHANGE_SPRINT_CORRECT_ANSWERS = 'CHANGE_SPRINT_CORRECT_ANSWERS',
  CHANGE_SPRINT_INCORRECT_ANSWER = 'CHANGE_SPRINT_INCORRECT_ANSWER',
  CHANGE_AUDIOCALL_NEW_WORD = 'CHANGE_AUDIOCALL_NEW_WORD',
  CHANGE_AUDIOCALL_CORRECT_ANSWERS = 'CHANGE_AUDIOCALL_CORRECT_ANSWERS',
  CHANGE_AUDIOCALL_INCORRECT_ANSWER = 'CHANGE_AUDIOCALL_INCORRECT_ANSWER',
}

export interface RequestStatisticAction {
  type: StatisticActionTypes.REQUEST_STATISTIC;
  payload: { userId: string };
}

export interface SetStatisticAction {
  type: StatisticActionTypes.SET_STATISTIC;
  payload: StatisticState;
}

export interface SaveStatisticAction {
  type: StatisticActionTypes.SAVE_STATISTIC;
  payload: { newStatistic: StatisticState; userId: string };
}

export interface ChangeSprintNewWord {
  type: StatisticActionTypes.CHANGE_SPRINT_NEW_WORD;
}

export interface IncreaseLearnedAction {
  type: StatisticActionTypes.INCREASE_LEARNED_WORDS;
}

export interface DecreaseLearnedAction {
  type: StatisticActionTypes.DECREASE_LEARNED_WORDS;
}

export interface ChangeSprintNewWordAction {
  type: StatisticActionTypes.CHANGE_SPRINT_NEW_WORD;
}

export interface ChangeSprintCorrectAnswersAction {
  type: StatisticActionTypes.CHANGE_SPRINT_CORRECT_ANSWERS;
}

export interface ChangeSprintIncorrectAnswersAction {
  type: StatisticActionTypes.CHANGE_SPRINT_INCORRECT_ANSWER;
}

export interface ChangeAudioCallNewWordAction {
  type: StatisticActionTypes.CHANGE_AUDIOCALL_NEW_WORD;
}

export interface ChangeAudioCallCorrectAnswerAction {
  type: StatisticActionTypes.CHANGE_AUDIOCALL_CORRECT_ANSWERS;
}

export interface ChangeAudioCallInCorrectAnswerAction {
  type: StatisticActionTypes.CHANGE_AUDIOCALL_INCORRECT_ANSWER;
}

export type StatisticAction =
  | RequestStatisticAction
  | SetStatisticAction
  | IncreaseLearnedAction
  | DecreaseLearnedAction
  | ChangeSprintNewWordAction
  | ChangeSprintCorrectAnswersAction
  | ChangeSprintIncorrectAnswersAction
  | SaveStatisticAction
  | ChangeAudioCallNewWordAction
  | ChangeAudioCallCorrectAnswerAction
  | ChangeAudioCallInCorrectAnswerAction
  | ChangeSprintNewWord;
