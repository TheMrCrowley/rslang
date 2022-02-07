import { Word } from '../../services/words/wordsServiceTypes';
import getRandomNumber from '../../helpers/getRandomNumber';
import shuffle from '../../helpers/shuffleArray';

export interface SprintQuestionItem {
  wordId: string;
  word: string;
  answer: string;
  isCorrect: boolean;
<<<<<<< HEAD
  audio: string;
  translate: string;
=======
>>>>>>> feat: start implement sprint game
}

const getCorrectQuestions = (words: Word[]): SprintQuestionItem[] => {
  return words.map(wordItem => ({
    wordId: wordItem.id,
    word: wordItem.word,
    answer: wordItem.wordTranslate,
<<<<<<< HEAD
    audio: wordItem.audio,
    isCorrect: true,
    translate: wordItem.wordTranslate,
=======
    isCorrect: true,
>>>>>>> feat: start implement sprint game
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
<<<<<<< HEAD
      audio: wordItem.audio,
      isCorrect: false,
      translate: wordItem.wordTranslate,
=======
      isCorrect: false,
>>>>>>> feat: start implement sprint game
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
