import { AxiosResponse } from 'axios';
// import { AuthorizationEndpoints } from './enum';
import $api from './api';
import { UserResponse, AuthorizationResponse } from './types';

export default class AuthService {
  static registration = async (
    name: string,
    email: string,
    password: string
  ): Promise<AxiosResponse<UserResponse>> => {
    return $api.post('/users', {
      name,
      email,
      password,
    });
  };

  static async login(
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthorizationResponse>> {
    const response = await $api.post<AxiosResponse<AuthorizationResponse>>(
      '/signin',
      {
        email,
        password,
      }
    );
    return response.data;
  }
}
