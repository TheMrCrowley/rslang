import $api from '../api';
import { UserWord, UserWordResponse } from './userWordsServiceTypes';

export default class UserWordsService {
  static getUserWords = async (userId: string): Promise<UserWordResponse[]> => {
    const response = await $api.get<UserWordResponse[]>(
      `/users/${userId}/words`
    );
    return response.data;
  };

  static setUserWord = async (
    userId: string,
    wordId: string,
    wordBody: UserWord
  ): Promise<UserWord> => {
    const response = await $api.post<UserWord>(
      `/users/${userId}/words/${wordId}`,
      wordBody
    );
    return response.data;
  };

  static getOneUserWord = async (
    userId: string,
    wordId: string
  ): Promise<UserWordResponse> => {
    const response = await $api.get<UserWordResponse>(
      `/users/${userId}/words/${wordId}`
    );
    return response.data;
  };

  static updateUserWord = async (
    userId: string,
    wordId: string,
    newWordBody: UserWord
  ): Promise<UserWord> => {
    const response = await $api.put<UserWord>(
      `/users/${userId}/words/${wordId}`,
      newWordBody
    );
    return response.data;
  };

  static deleteUserWord = async (
    userId: string,
    wordId: string
  ): Promise<void> => {
    await $api.delete<UserWord>(`/users/${userId}/words/${wordId}`);
  };
}
