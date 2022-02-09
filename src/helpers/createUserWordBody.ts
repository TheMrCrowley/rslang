import { UserWord } from '../services/user-words/userWordsServiceTypes';
import CreateUserWordMode from './helpersTypes';

const createUserWordBody = (
  mode: string,
  difficulty = 'learning',
  from?: 'SPRINT' | 'AUDIOCALL'
): UserWord => {
  if (mode === CreateUserWordMode.CHANGE_DIFFICULTY) {
    return {
      difficulty,
      optional: {
        totalAnswers: 0,
        totalCorrectAnswers: 0,
        correctStreak: 0,
        sprint: false,
        audiocall: false,
      },
    };
  }
  if (mode === CreateUserWordMode.CORRECT_ANSWER) {
    if (from === 'SPRINT') {
      return {
        difficulty,
        optional: {
          totalAnswers: 1,
          totalCorrectAnswers: 1,
          correctStreak: 1,
          sprint: true,
          audiocall: false,
        },
      };
    }
    if (from === 'AUDIOCALL') {
      return {
        difficulty,
        optional: {
          totalAnswers: 1,
          totalCorrectAnswers: 1,
          correctStreak: 1,
          sprint: false,
          audiocall: true,
        },
      };
    }
  }
  // incorrect anser
  if (from === 'SPRINT') {
    return {
      difficulty,
      optional: {
        totalAnswers: 1,
        correctStreak: 0,
        totalCorrectAnswers: 0,
        sprint: true,
        audiocall: false,
      },
    };
  }
  return {
    difficulty,
    optional: {
      totalAnswers: 1,
      correctStreak: 0,
      totalCorrectAnswers: 0,
      sprint: false,
      audiocall: true,
    },
  };
};
export default createUserWordBody;
