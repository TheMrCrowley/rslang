/* eslint-disable @typescript-eslint/default-param-last */
import {
  AuthAction,
  AuthActionsTypes,
  AuthState,
  SetDataAction,
} from '../../types/authTypes';
import {
  LoginRequestData,
  LoginResponseData,
  RegistrationRequestData,
} from '../../../services/auth/authServiceTypes';

const authInitialState: AuthState = {
  isAuth: false,
  userData: {} as LoginResponseData,
};

export const authReducer = (
  state = authInitialState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case AuthActionsTypes.REGISTRATION:
      return state;
    case AuthActionsTypes.SIGNIN:
      return state;
    case AuthActionsTypes.LOGOUT:
      return { ...state, isAuth: false, userData: {} as LoginResponseData };
    case AuthActionsTypes.CHECK_AUTH:
      return state;
    case AuthActionsTypes.SET_IS_AUTH:
      return { ...state, isAuth: true };
    case AuthActionsTypes.SET_USER_DATA:
      return { ...state, userData: { ...(action as SetDataAction).payload } };
    default:
      return state;
  }
};

export const registrationAction = (
  payload: RegistrationRequestData
): AuthAction => ({
  type: AuthActionsTypes.REGISTRATION,
  payload,
});

export const signinAction = (payload: LoginRequestData): AuthAction => ({
  type: AuthActionsTypes.SIGNIN,
  payload,
});

export const logoutAction = (): AuthAction => ({
  type: AuthActionsTypes.LOGOUT,
});

export const checkAuthAction = (payload: { userId: string }): AuthAction => ({
  type: AuthActionsTypes.CHECK_AUTH,
  payload,
});

export const setIsAuthAction = (): AuthAction => ({
  type: AuthActionsTypes.SET_IS_AUTH,
});

export const setUserDataAction = (payload: LoginResponseData): AuthAction => ({
  type: AuthActionsTypes.SET_USER_DATA,
  payload,
});
