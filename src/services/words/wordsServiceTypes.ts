import { UserWord } from '../user-words/userWordsServiceTypes';

export interface WordsRequestData {
  group: number;
  page: number;
}

export interface Word {
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

export interface WordWithCustomPropsRequest extends WordsRequestData {
  userId: string;
}

export interface WordWithCustomProps extends Word {
  userWord?: UserWord;
}

export interface AggregatedWordsItem {
  paginatedResults: WordWithCustomProps[];
  totalCount: TotalCountItem[];
}

interface TotalCountItem {
  count: number;
}
