import {
  AuthorizationResponse,
  UserLoginData,
  UserRegistrationData,
} from '../../services/types';

export enum AuthActionsTypes {
  REGISTRATION = 'REGISTRATION',
  CHECK_AUTH = 'CHECK_AUTH',
  SIGNIN_AFTER_REG = 'SIGNIN_AFTER_REG',
  SIGNIN = 'SIGNIN',
  LOGOUT = 'LOGOUT',
  SET_USER_DATA = 'SET_DATA',
}

export interface AuthState {
  isAuth: boolean;
  userData: AuthorizationResponse;
}

export interface RegistrationAction {
  type: AuthActionsTypes.REGISTRATION;
  payload: UserRegistrationData;
}

export interface SigninAfterRegistration {
  type: AuthActionsTypes.SIGNIN_AFTER_REG;
}

export interface SigninAction {
  type: AuthActionsTypes.SIGNIN;
  payload: UserLoginData;
}

export interface CheckAuthAction {
  type: AuthActionsTypes.CHECK_AUTH;
  payload: AuthorizationResponse;
}

export interface SetDataAction {
  type: AuthActionsTypes.SET_USER_DATA;
  payload: AuthorizationResponse;
}

interface LogoutAction {
  type: AuthActionsTypes.LOGOUT;
}

export type AuthAction =
  | RegistrationAction
  | SigninAfterRegistration
  | SigninAction
  | LogoutAction
  | CheckAuthAction
  | SetDataAction;
