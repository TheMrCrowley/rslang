export type UserResponse = {
  id: string;
  name: string;
  email: string;
};

export type UserRegistrationData = {
  name: string;
  email: string;
  password: string;
};

export type UserLoginData = {
  email: string;
  password: string;
};

export type AuthorizationResponse = {
  message: string;
  token: string;
  refreshToken: string;
  userId: string;
  name: string;
};

export interface IWord {
  id: string;
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  wordTranslate: string;
  textMeaningTranslate: string;
  textExampleTranslate: string;
}

export interface IWordWithUserProps extends IWord {
  userWord?: UserWord;
}

export interface WordsQueryParams {
  group: number;
  page: number;
}

export interface WordsQueryWithProps extends WordsQueryParams {
  userId: string;
}

export type WordById = {
  wordId: string;
};

export interface UserOptionalObject {
  totalAnswers: number;
  totalCorrectAnswers: number;
  correctStreak: number;
}

export interface UserWord {
  difficulty: string;
  optional: UserOptionalObject;
}

export interface AggregatedWordsItem {
  paginatedResults: IWordWithUserProps[];
  totalCount: string[];
}
