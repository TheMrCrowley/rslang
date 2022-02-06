import {
  LoginRequestData,
  LoginResponseData,
  RegistrationRequestData,
} from '../../services/auth/authServiceTypes';

export enum AuthActionsTypes {
  REGISTRATION = 'REGISTRATION',
  SIGNIN_AFTER_REG = 'SIGNIN_AFTER_REG',
  SIGNIN = 'SIGNIN',
  LOGOUT = 'LOGOUT',
  SET_USER_DATA = 'SET_DATA',
  CHECK_AUTH = 'CHECK_AUTH',
  SET_IS_AUTH = 'SET_IS_AUTH',
}

export interface AuthState {
  isAuth: boolean;
  userData: LoginResponseData;
}

export interface RegistrationAction {
  type: AuthActionsTypes.REGISTRATION;
  payload: RegistrationRequestData;
}

export interface SigninAction {
  type: AuthActionsTypes.SIGNIN;
  payload: LoginRequestData;
}

export interface SetDataAction {
  type: AuthActionsTypes.SET_USER_DATA;
  payload: LoginResponseData;
}

interface LogoutAction {
  type: AuthActionsTypes.LOGOUT;
}

interface CheckAuthAction {
  type: AuthActionsTypes.CHECK_AUTH;
}

interface SetIsAuthAction {
  type: AuthActionsTypes.SET_IS_AUTH;
}

export type AuthAction =
  | RegistrationAction
  | SigninAction
  | LogoutAction
  | SetDataAction
  | CheckAuthAction
  | SetIsAuthAction;
