import { WordsEndpoints } from '../enum';
import $api from '../api';
import {
  AggregatedWordsItem,
  Word,
  WordWithCustomProps,
} from './wordsServiceTypes';

export default class WordsService {
  static getWords = async (
    group = 0,
    page = 0
  ): Promise<WordWithCustomProps[]> => {
    const response = await $api.get<WordWithCustomProps[]>(
      WordsEndpoints.WORDS,
      {
        params: {
          group,
          page,
        },
      }
    );
    return response.data;
  };

  static getWordsWithCustomProps = async (
    userId: string,
    group: number,
    page: number
  ): Promise<WordWithCustomProps[]> => {
    const response = await $api.get<AggregatedWordsItem[]>(
      `/users/${userId}/aggregatedWords`,
      {
        params: {
          wordsPerPage: 20,
          filter: { $and: [{ page }, { group }] },
        },
      }
    );

    return response.data[0].paginatedResults;
  };

  static getOneWordWithCustomProps = async (
    userId: string,
    wordId: string
  ): Promise<WordWithCustomProps> => {
    const response = await $api.get<WordWithCustomProps[]>(
      `/users/${userId}/aggregatedWords/${wordId}`
    );
    return response.data[0];
  };

  static getNotStudiedWords = async (
    userId: string,
    group: number,
    page: number
  ): Promise<WordWithCustomProps[]> => {
    const response = await $api.get<AggregatedWordsItem[]>(
      `/users/${userId}/aggregatedWords`,
      {
        params: {
          wordsPerPage: 20,
          filter: {
            $and: [
              { page },
              { group },
              { 'userWord.difficulty': { $ne: 'studied' } },
            ],
          },
        },
      }
    );

    return response.data[0].paginatedResults;
  };

  static getHardWords = async (
    userId: string
  ): Promise<WordWithCustomProps[]> => {
    const count = await $api.get<AggregatedWordsItem[]>(
      `/users/${userId}/aggregatedWords`,
      {
        params: {
          filter: { $and: [{ 'userWord.difficulty': 'hard' }] },
        },
      }
    );
    if (!count?.data[0]?.totalCount[0]?.count) {
      return [] as WordWithCustomProps[];
    }
    const response = await $api.get<AggregatedWordsItem[]>(
      `/users/${userId}/aggregatedWords`,
      {
        params: {
          wordsPerPage: count.data[0].totalCount[0].count,
          filter: { $and: [{ 'userWord.difficulty': 'hard' }] },
        },
      }
    );
    return response.data[0].paginatedResults;
  };

  static getTwentyHardWords = async (
    userId: string
  ): Promise<WordWithCustomProps[]> => {
    const response = await $api.get<AggregatedWordsItem[]>(
      `/users/${userId}/aggregatedWords`,
      {
        params: {
          wordsPerPage: 20,
          filter: { $and: [{ 'userWord.difficulty': 'hard' }] },
        },
      }
    );
    return response.data[0].paginatedResults;
  };

  static getWord = async (wordId: string): Promise<Word> => {
    const response = await $api.get<Word>(`${WordsEndpoints.WORDS}/${wordId}`);
    return response.data;
  };

  static getStudiedWordCount = async (userId: string): Promise<number> => {
    const response = await $api.get<AggregatedWordsItem[]>(
      `/users/${userId}/aggregatedWords`,
      {
        params: {
          filter: { $and: [{ 'userWord.difficulty': 'studied' }] },
        },
      }
    );
    return response.data[0].totalCount[0].count;
  };
}
