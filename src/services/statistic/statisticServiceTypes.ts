export interface StatisticResponse {
  id: string;
  learnedWords: number;
  optional: StatisticOptional;
}

export interface StatisticRequest {
  learnedWords: number;
  optional: StatisticOptional;
}

export interface StatisticOptional {
  gameStatistic: GameStatisticInterface;
  wordStatistic: WordStatisticType;
}

export interface GameStatisticInterface {
  sprint: GameStatisticType;
  audiocall: GameStatisticType;
}

export type GameStatisticType = Record<string, GameStatisticItem>;

export interface GameStatisticItem {
  newWords: number;
  totalAnswers: number;
  correctAnswers: number;
  longestStreak: number;
}

export type WordStatisticType = Record<string, WordStatisticItem>;

export interface WordStatisticItem {
  newWords: number;
  learnedWords: number;
  totalAnswers: number;
  correctAnswers: number;
}
