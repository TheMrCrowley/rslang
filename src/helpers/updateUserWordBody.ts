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
  difficulty?: string,
  from?: 'SPRINT' | 'AUDIOCALL'
): Promise<UserWord> => {
  const oldUserBody = await UserWordsService.getOneUserWord(userId, wordId);
  if (mode === CreateUserWordMode.CHANGE_DIFFICULTY && difficulty) {
    return {
      difficulty,
      optional: { ...oldUserBody.optional },
    };
  }
  if (mode === CreateUserWordMode.CORRECT_ANSWER) {
    const newUserWord: UserWord = {
      difficulty: oldUserBody.difficulty,
      optional: {
        ...oldUserBody.optional,
        totalAnswers: oldUserBody.optional.totalAnswers + 1,
        totalCorrectAnswers: oldUserBody.optional.totalCorrectAnswers + 1,
        correctStreak: oldUserBody.optional.correctStreak + 1,
      },
    };
    // change difficulty if streak success
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
    if (from === 'SPRINT') {
      newUserWord.optional.sprint = true;
    }
    if (from === 'AUDIOCALL') {
      newUserWord.optional.audiocall = true;
    }
    return newUserWord;
  }
  if (mode === CreateUserWordMode.INCORRECT_ANSWER) {
    const newUserWord: UserWord = {
      difficulty: oldUserBody.difficulty,
      optional: {
        ...oldUserBody.optional,
        totalAnswers: oldUserBody.optional.totalAnswers + 1,
        totalCorrectAnswers: oldUserBody.optional.totalCorrectAnswers,
        correctStreak: 0,
      },
    };
    // change difficulty if fuckup
    if (newUserWord.difficulty === 'studied') {
      newUserWord.difficulty = 'learning';
    }
    if (from === 'SPRINT') {
      newUserWord.optional.sprint = true;
    }
    if (from === 'AUDIOCALL') {
      newUserWord.optional.audiocall = true;
    }
    return newUserWord;
  }
  return oldUserBody;
};

export default updateUserWordBody;
