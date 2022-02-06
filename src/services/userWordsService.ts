import $api from './api';
import { UserWord } from './types';

export default class UserWordsService {
  static getUserWords = async (userId: string): Promise<UserWord> => {
    const response = await $api.get<UserWord>(`/users/${userId}/words`);
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
  ): Promise<UserWord> => {
    const response = await $api.get<UserWord>(
      `/users/${userId}/words/${wordId}`
    );
    return response.data;
  };

  static updateUserWord = async (
    userId: string,
    wordId: string,
    newWrodBody: UserWord
  ): Promise<UserWord> => {
    const response = await $api.put<UserWord>(
      `/users/${userId}/${wordId}`,
      newWrodBody
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
