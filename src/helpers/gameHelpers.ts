import { WordWithCustomProps } from '../services/words/wordsServiceTypes';
import getRandomNumber from './getRandomNumber';

export interface SprintQuestionItem {
  wordId: string;
  word: string;
  fakeAnswer: string;
  isCorrect: boolean;
  correctAnswer: string;
}

export const getAllTranslates = (words: WordWithCustomProps[]): string[] => {
  return words.map(word => word.wordTranslate);
};

const getSprintCorrectQuestion = (
  wordItem: WordWithCustomProps
): SprintQuestionItem => {
  return {
    wordId: wordItem._id || wordItem.id,
    word: wordItem.word,
    fakeAnswer: wordItem.wordTranslate,
    isCorrect: true,
    correctAnswer: wordItem.wordTranslate,
  };
};

const getSprintIncorrectQuestions = (
  wordItem: WordWithCustomProps,
  answers: string[]
): SprintQuestionItem => {
  let fakeAnswer = '';
  while (!fakeAnswer) {
    const candidate = answers[getRandomNumber(0, answers.length - 1)];
    if (wordItem.wordTranslate !== candidate) {
      fakeAnswer = candidate;
    }
  }
  return {
    wordId: wordItem._id || wordItem.id,
    word: wordItem.word,
    fakeAnswer,
    isCorrect: false,
    correctAnswer: wordItem.wordTranslate,
  };
};

export const getSprintQuestions = (
  wordsForQuestions: WordWithCustomProps[],
  answersFromPage: string[]
): SprintQuestionItem[] => {
  console.log('words length', wordsForQuestions.length);
  return wordsForQuestions.map(wordItem => {
    const random = getRandomNumber(0, 1);
    if (random === 0) {
      return getSprintCorrectQuestion(wordItem);
    }
    return getSprintIncorrectQuestions(wordItem, answersFromPage);
  });
};
