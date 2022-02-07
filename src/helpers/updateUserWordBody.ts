import UserWordsService from '../services/user-words/userWordsService';
import { UserWord } from '../services/user-words/userWordsServiceTypes';
import CreateUserWordMode from './helpersTypes';

const updateUserWordBody = async (
  userId: string,
  wordId: string,
  mode: string,
  difficulty?: string
): Promise<UserWord> => {
  const oldUserBody = await UserWordsService.getOneUserWord(userId, wordId);
  if (mode === CreateUserWordMode.CHANGE_DIFFICULTY && difficulty) {
    return {
      difficulty,
      optional: { ...oldUserBody.optional },
    };
  }
  if (mode === CreateUserWordMode.CORRECT_ANSWER) {
    return {
      difficulty: oldUserBody.difficulty,
      optional: {
        totalAnswers: oldUserBody.optional.totalAnswers + 1,
        totalCorrectAnswers: oldUserBody.optional.totalCorrectAnswers + 1,
        correctStreak: oldUserBody.optional.correctStreak + 1,
      },
    };
  }
  return {
    difficulty: oldUserBody.difficulty,
    optional: {
      totalAnswers: oldUserBody.optional.totalAnswers + 1,
      totalCorrectAnswers: oldUserBody.optional.totalCorrectAnswers,
      correctStreak: 0,
    },
  };
};

export default updateUserWordBody;
