import { Word } from '../../services/words/wordsServiceTypes';
import getRandomNumber from '../../helpers/getRandomNumber';
import shuffle from '../../helpers/shuffleArray';

export interface SprintQuestionItem {
  wordId: string;
  word: string;
  answer: string;
  isCorrect: boolean;
}

const getCorrectQuestions = (words: Word[]): SprintQuestionItem[] => {
  return words.map(wordItem => ({
    wordId: wordItem.id,
    word: wordItem.word,
    answer: wordItem.wordTranslate,
    isCorrect: true,
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
      wordId: wordItem.id,
      word: wordItem.word,
      answer: fakeAnswer,
      isCorrect: false,
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

export const compareAnswers = (expect: boolean, actual: boolean): boolean => {
  return expect === actual;
};
