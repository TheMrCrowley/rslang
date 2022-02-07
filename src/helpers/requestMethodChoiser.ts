import { UserWordResponse } from '../services/user-words/userWordsServiceTypes';

const requestMethodChoiser = (
  wordsArray: UserWordResponse[],
  wordId: string
) => {
  return wordsArray.find(word => word.wordId === wordId) ? 'PUT' : 'POST';
};

export default requestMethodChoiser;
