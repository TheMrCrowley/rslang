import $api from './api';
import { UserResponse, AuthorizationResponse } from './types';

export default class AuthService {
  static registration = async (
    name: string,
    email: string,
    password: string
  ): Promise<UserResponse> => {
    const response = await $api.post('/users', {
      name,
      email,
      password,
    });
    return response.data;
  };

  static async login(
    email: string,
    password: string
  ): Promise<AuthorizationResponse> {
    const response = await $api.post<AuthorizationResponse>('/signin', {
      email,
      password,
    });
    return response.data;
  }
}
