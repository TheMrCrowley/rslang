/* eslint-disable @typescript-eslint/default-param-last */
import {
  AuthorizationResponse,
  UserLoginData,
  UserRegistrationData,
} from '../../../services/types';
import {
  AuthAction,
  AuthActionsTypes,
  AuthState,
  SetDataAction,
} from '../../types/authTypes';

const authInitialState: AuthState = {
  isAuth: false,
  userData: {} as AuthorizationResponse,
};

export const authReducer = (
  state = authInitialState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case AuthActionsTypes.REGISTRATION:
      return state;
    case AuthActionsTypes.SIGNIN_AFTER_REG:
      return { ...state, isAuth: true };
    case AuthActionsTypes.SIGNIN:
      return {
        ...state,
        isAuth: true,
      };
    case AuthActionsTypes.CHECK_AUTH:
      return {
        ...state,
        isAuth: true,
      };
    case AuthActionsTypes.LOGOUT:
      return { ...state, isAuth: false, userData: {} as AuthorizationResponse };
    case AuthActionsTypes.SET_USER_DATA:
      return { ...state, userData: { ...(action as SetDataAction).payload } };
    default:
      return state;
  }
};

export const registrationAction = (
  payload: UserRegistrationData
): AuthAction => ({
  type: AuthActionsTypes.REGISTRATION,
  payload,
});

export const signinAfterRegistration = (): AuthAction => ({
  type: AuthActionsTypes.SIGNIN_AFTER_REG,
});

export const signinAction = (payload: UserLoginData): AuthAction => ({
  type: AuthActionsTypes.SIGNIN,
  payload,
});

export const logoutAction = (): AuthAction => ({
  type: AuthActionsTypes.LOGOUT,
});

export const checkAuthAction = (
  payload: AuthorizationResponse
): AuthAction => ({
  type: AuthActionsTypes.CHECK_AUTH,
  payload,
});

export const setUserDataAction = (
  payload: AuthorizationResponse
): AuthAction => ({
  type: AuthActionsTypes.SET_USER_DATA,
  payload,
});
