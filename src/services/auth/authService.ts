import axios from 'axios';
import $api from '../api';
import getRefreshToken from '../../helpers/getRefreshToken';
import setNewTokens from '../../helpers/setNewTokens';
import {
  LoginRequestData,
  LoginResponseData,
  RegistrationRequestData,
  RegistrationResponseData,
  TokensResponse,
} from './authServiceTypes';

export default class AuthService {
  static registration = async (
    registrationData: RegistrationRequestData
  ): Promise<RegistrationResponseData> => {
    const { name, email, password } = registrationData;
    const response = await $api.post<RegistrationResponseData>('/users', {
      name,
      email,
      password,
    });
    return response.data;
  };

  static async login(loginData: LoginRequestData): Promise<LoginResponseData> {
    const { email, password } = loginData;
    const response = await $api.post<LoginResponseData>('/signin', {
      email,
      password,
    });
    return response.data;
  }

  static async refreshTokens(userId: string) {
    const { data } = await axios.get<TokensResponse>(
      // `https://react-rslang-test.herokuapp.com/users/${userId}/tokens`,
      `http://localhost:5000/users/${userId}/tokens`,
      {
        headers: {
          Authorization: `Bearer ${getRefreshToken()}`,
        },
      }
    );
    setNewTokens(data.token, data.refreshToken);
  }
}
