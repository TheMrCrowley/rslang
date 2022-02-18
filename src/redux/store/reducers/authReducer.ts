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
  request: 'NONE',
};

export const authReducer = (
  state = authInitialState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case AuthActionsTypes.LOGOUT:
      return { ...state, isAuth: false, userData: {} as LoginResponseData };
    case AuthActionsTypes.SET_IS_AUTH:
      return { ...state, isAuth: true };
    case AuthActionsTypes.SET_USER_DATA:
      return { ...state, userData: { ...(action as SetDataAction).payload } };
    case AuthActionsTypes.AUTH_REQUEST_START:
      return { ...state, request: 'EXIST' };
    case AuthActionsTypes.AUTH_REQUEST_SUCCESS:
      return { ...state, request: 'SUCCESS' };
    case AuthActionsTypes.AUTH_REQUEST_ERROR:
      return { ...state, request: 'ERROR' };
    case AuthActionsTypes.AUTH_REQUEST_RESET:
      return { ...state, request: 'NONE' };
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

export const checkAuthAction = (): AuthAction => ({
  type: AuthActionsTypes.CHECK_AUTH,
});

export const setIsAuthAction = (): AuthAction => ({
  type: AuthActionsTypes.SET_IS_AUTH,
});

export const setUserDataAction = (payload: LoginResponseData): AuthAction => ({
  type: AuthActionsTypes.SET_USER_DATA,
  payload,
});

export const authRequestStartAction = (): AuthAction => ({
  type: AuthActionsTypes.AUTH_REQUEST_START,
});

export const authRequestSuccessAction = (): AuthAction => ({
  type: AuthActionsTypes.AUTH_REQUEST_SUCCESS,
});

export const authRequestErrorAction = (): AuthAction => ({
  type: AuthActionsTypes.AUTH_REQUEST_ERROR,
});

export const authRequestResetAction = (): AuthAction => ({
  type: AuthActionsTypes.AUTH_REQUEST_RESET,
});
