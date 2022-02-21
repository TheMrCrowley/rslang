export interface RegistrationRequestData {
  name: string;
  email: string;
  password: string;
}

export interface RegistrationResponseData {
  id: string;
  name: string;
  email: string;
}

export interface LoginRequestData {
  email: string;
  password: string;
}

export interface LoginResponseData {
  message: string;
  token: string;
  refreshToken: string;
  userId: string;
  name: string;
}

export interface TokensResponse {
  token: string;
  refreshToken: string;
}
