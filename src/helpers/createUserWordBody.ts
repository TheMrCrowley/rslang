import { UserWord } from '../services/user-words/userWordsServiceTypes';
import CreateUserWordMode from './helpersTypes';

const createUserWordBody = (
  mode: string,
  difficulty = 'learning'
): UserWord => {
  if (mode === CreateUserWordMode.CHANGE_DIFFICULTY) {
    return {
      difficulty,
      optional: {
        totalAnswers: 0,
        totalCorrectAnswers: 0,
        correctStreak: 0,
      },
    };
  }
  if (mode === CreateUserWordMode.CORRECT_ANSWER) {
    return {
      difficulty,
      optional: {
        totalAnswers: 1,
        totalCorrectAnswers: 1,
        correctStreak: 1,
      },
    };
  }
  return {
    difficulty,
    optional: {
      totalAnswers: 1,
      correctStreak: 0,
      totalCorrectAnswers: 0,
    },
  };
};
export default createUserWordBody;
