import { WordsEndpoints } from './enum';
import $api from './api';
import { AggregatedWordsItem, IWord, IWordWithUserProps } from './types';

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

  static getWordsWithUserProps = async (
    userId: string,
    group: number,
    page: number
  ): Promise<IWordWithUserProps[]> => {
    const response = await $api.get<AggregatedWordsItem[]>(
      `/users/${userId}/aggregatedWords`,
      {
        params: {
          group,
          page,
          wordsPerPage: 20,
          filter:
            '{"$or":[{"userWord.difficulty":"hard"},{"userWord":null},{"userWord.difficulty":"easy"}]}',
        },
      }
    );
    return response.data[0].paginatedResults;
  };

  static getWord = async (wordId: string): Promise<IWord> => {
    const response = await $api.get<IWord>(`${WordsEndpoints.WORDS}/${wordId}`);
    return response.data;
  };
}
