import { WordWithCustomProps } from '../services/words/wordsServiceTypes';
import getRandomNumber from './getRandomNumber';
import shuffle from './shuffleArray';

export interface SprintQuestionItem {
  wordId: string;
  word: string;
  fakeAnswer: string;
  isCorrect: boolean;
  correctAnswer: string;
  audio: string;
}

export interface AudioCallQuestionItem {
  wordId: string;
  word: string;
  answer: string;
  answers: string[];
  audio: string;
  imgSrc: string;
}

export const compareAnswers = (
  expect: boolean | string,
  actual: boolean | string
): boolean => {
  return expect === actual;
};

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
    audio: wordItem.audio,
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
    audio: wordItem.audio,
  };
};

export const getSprintQuestions = (
  wordsForQuestions: WordWithCustomProps[],
  answersFromPage: string[]
): SprintQuestionItem[] => {
  return shuffle<SprintQuestionItem>(
    wordsForQuestions.map(wordItem => {
      const random = getRandomNumber(0, 1);
      if (random === 0) {
        return getSprintCorrectQuestion(wordItem);
      }
      return getSprintIncorrectQuestions(wordItem, answersFromPage);
    })
  );
};

const getAudicallQuestionAnswers = (
  correctAnswer: string,
  otherAnswers: string[]
): string[] => {
  const answers = new Set<string>();
  answers.add(correctAnswer);
  while (answers.size < 4) {
    answers.add(otherAnswers[getRandomNumber(0, otherAnswers.length - 1)]);
  }
  return shuffle(Array.from(answers));
};

export const getAudioCallQuestions = (
  wordsForQuestions: WordWithCustomProps[],
  answersFromPage: string[]
): AudioCallQuestionItem[] => {
  return shuffle(
    wordsForQuestions.map(wordItem => {
      return {
        wordId: wordItem._id || wordItem.id,
        word: wordItem.word,
        audio: wordItem.audio,
        imgSrc: wordItem.image,
        answer: wordItem.wordTranslate,
        answers: getAudicallQuestionAnswers(
          wordItem.wordTranslate,
          answersFromPage
        ),
      };
    })
  );
};
