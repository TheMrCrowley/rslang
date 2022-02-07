import UserWordsService from '../services/user-words/userWordsService';
import { UserWord } from '../services/user-words/userWordsServiceTypes';
import CreateUserWordMode from './helpersTypes';

const updateUserWordBody = async (
  userId: string,
  wordId: string,
  mode:
    | CreateUserWordMode.CHANGE_DIFFICULTY
    | CreateUserWordMode.CORRECT_ANSWER
    | CreateUserWordMode.INCORRECT_ANSWER,
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
    const newUserWord = {
      difficulty: oldUserBody.difficulty,
      optional: {
        totalAnswers: oldUserBody.optional.totalAnswers + 1,
        totalCorrectAnswers: oldUserBody.optional.totalCorrectAnswers + 1,
        correctStreak: oldUserBody.optional.correctStreak + 1,
      },
    };
    if (
      newUserWord.difficulty === 'hard' &&
      newUserWord.optional.correctStreak === 5
    ) {
      newUserWord.difficulty = 'studied';
    }
    if (
      newUserWord.difficulty === 'learning' &&
      newUserWord.optional.correctStreak === 3
    ) {
      newUserWord.difficulty = 'studied';
    }
    return newUserWord;
  }
  if (mode === CreateUserWordMode.INCORRECT_ANSWER) {
    const newUserWord = {
      difficulty: oldUserBody.difficulty,
      optional: {
        totalAnswers: oldUserBody.optional.totalAnswers + 1,
        totalCorrectAnswers: oldUserBody.optional.totalCorrectAnswers,
        correctStreak: 0,
      },
    };
    if (newUserWord.difficulty === 'studied') {
      newUserWord.difficulty = 'learning';
    }
    return newUserWord;
  }
  return oldUserBody;
};

export default updateUserWordBody;
