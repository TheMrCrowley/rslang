import { WordsEndpoints } from './enum';
import $api from './api';
import { IWord } from './types';

export default class WordsService {
  static getWords = async (group = 0, page = 0): Promise<IWord[]> => {
    const response = await $api.get<IWord[]>(WordsEndpoints.WORDS, {
      params: {
        group,
        page,
      },
    });
    return response.data;
  };

  static getWord = async (wordId: string): Promise<IWord> => {
    const response = await $api.get<IWord>(`${WordsEndpoints.WORDS}/${wordId}`);
    return response.data;
  };
}
