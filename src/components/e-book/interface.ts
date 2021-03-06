import { IWord } from '../../services/types';

export interface CardProp {
  id: string;
  group: 0;
  page: 0;
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

export interface CardListProps {
  words: IWord[];
}

export interface CardProps {
  cardData: CardProp;
}
