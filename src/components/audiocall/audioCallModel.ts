import getRandomNumber from '../../helpers/getRandomNumber';
import { Word } from '../../services/words/wordsServiceTypes';

export interface AudioCallQuestionItem {
  wordId: string;
  word: string;
  answer: string;
  answers: string[];
  audio: string;
  imgSrc: string;
}

const getAllAnswers = (words: Word[]): string[] =>
  words.map(word => word.wordTranslate);

const getOtherAnswers = (answer: string, wordsAnswers: string[]) => {
  const otherAnswers = new Set<string>();
  otherAnswers.add(answer);
  while (otherAnswers.size < 4) {
    otherAnswers.add(wordsAnswers[getRandomNumber(0, wordsAnswers.length - 1)]);
  }
  return Array.from(otherAnswers);
};

const createAucioCallQuestionItem = (
  wordItem: Word,
  allAnswers: string[]
): AudioCallQuestionItem => {
  const otherAnswers = getOtherAnswers(wordItem.wordTranslate, allAnswers);

  return {
    wordId: wordItem.id,
    word: wordItem.word,
    answer: wordItem.wordTranslate,
    imgSrc: wordItem.image,
    audio: wordItem.audio,
    answers: otherAnswers,
  };
};

export const getAudiCallQuestionItems = (
  words: Word[]
): AudioCallQuestionItem[] => {
  const allAnswers = getAllAnswers(words);
  return words.map(word => createAucioCallQuestionItem(word, allAnswers));
};
