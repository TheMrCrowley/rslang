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

export type WordsResponse = IWord[];

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

export interface WordsQueryParams {
  group: number;
  page: number;
}

export type WordById = {
  wordId: string;
};
