import getRandomNumber from '../../helpers/getRandomNumber';
import { WordWithCustomProps } from '../../services/words/wordsServiceTypes';
import shuffle from '../../helpers/shuffleArray';

export interface AudioCallQuestionItem {
  wordId: string;
  word: string;
  answer: string;
  answers: string[];
  audio: string;
  imgSrc: string;
}

const getAllAnswers = (words: WordWithCustomProps[]): string[] =>
  words.map(word => word.wordTranslate);

const getOtherAnswers = (answer: string, wordsAnswers: string[]) => {
  const otherAnswers = new Set<string>();
  otherAnswers.add(answer);
  while (otherAnswers.size < 4) {
    otherAnswers.add(wordsAnswers[getRandomNumber(0, wordsAnswers.length - 1)]);
  }
  return shuffle(Array.from(otherAnswers));
};

const createAucioCallQuestionItem = (
  wordItem: WordWithCustomProps,
  allAnswers: string[]
): AudioCallQuestionItem => {
  const otherAnswers = getOtherAnswers(wordItem.wordTranslate, allAnswers);

  return {
    wordId: wordItem.id || wordItem._id,
    word: wordItem.word,
    answer: wordItem.wordTranslate,
    imgSrc: wordItem.image,
    audio: wordItem.audio,
    answers: otherAnswers,
  };
};

export const getAudiCallQuestionItems = (
  words: WordWithCustomProps[]
): AudioCallQuestionItem[] => {
  const allAnswers = getAllAnswers(words);
  return shuffle(
    words.map(word => createAucioCallQuestionItem(word, allAnswers))
  );
};
