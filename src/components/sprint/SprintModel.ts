import {
  Word,
  WordWithCustomProps,
} from '../../services/words/wordsServiceTypes';
import getRandomNumber from '../../helpers/getRandomNumber';
import shuffle from '../../helpers/shuffleArray';

export interface SprintQuestionItem {
  wordId: string;
  word: string;
  answer: string;
  isCorrect: boolean;
  audio: string;
  translate: string;
}

const getCorrectQuestions = (
  words: Word[] | WordWithCustomProps[]
): SprintQuestionItem[] => {
  return words.map(wordItem => ({
    wordId: wordItem._id || wordItem.id,
    word: wordItem.word,
    answer: wordItem.wordTranslate,
    audio: wordItem.audio,
    isCorrect: true,
    translate: wordItem.wordTranslate,
  }));
};

const getIncorrectQuestions = (
  words: Word[],
  answers: string[]
): SprintQuestionItem[] => {
  return words.map(wordItem => {
    let fakeAnswer = '';
    while (!fakeAnswer) {
      const candidate = answers[getRandomNumber(0, answers.length - 1)];
      if (wordItem.wordTranslate !== candidate) {
        fakeAnswer = candidate;
      }
    }
    return {
      wordId: wordItem.id || wordItem._id,
      word: wordItem.word,
      answer: fakeAnswer,
      audio: wordItem.audio,
      isCorrect: false,
      translate: wordItem.wordTranslate,
    };
  });
};

export const getQuestionItems = (words: Word[]): SprintQuestionItem[] => {
  const middle = Math.floor((words.length - 1) / 2);
  const answers = words.map(wordItem => wordItem.wordTranslate);
  const correct = getCorrectQuestions(words.slice(0, middle + 1));
  const incorrect = getIncorrectQuestions(
    words.slice(middle, words.length - 1),
    answers
  );
  return shuffle<SprintQuestionItem>([...correct, ...incorrect]);
};

export const compareAnswers = (
  expect: boolean | string,
  actual: boolean | string
): boolean => {
  return expect === actual;
};
