/* eslint-disable @typescript-eslint/default-param-last */
import { UserFormData, AuthorizationResponse } from '../../../services/types';

enum AuthActions {
  REGISTRATION = 'REGISTRATION',
  SIGNIN = 'SIGNIN',
  LOGOUT = 'LOGOUT',
}

interface UserState {
  isAuth: boolean;
  userData: AuthorizationResponse;
}

interface UserAction {
  type: string;
  payload?: unknown;
}

export type RegistrationAction = {
  type: string;
  payload: UserFormData;
};

export type SigninAction = {
  type: string;
  payload: AuthorizationResponse;
};

const initialState: UserState = {
  isAuth: false,
  userData: {} as AuthorizationResponse,
};

export const authReducer = (
  state = initialState,
  action: UserAction
): UserState => {
  switch (action.type) {
    case AuthActions.REGISTRATION:
      return state;
    case AuthActions.SIGNIN:
      return {
        ...state,
        isAuth: true,
        userData: { ...(action as SigninAction).payload },
      };
    case AuthActions.LOGOUT:
      return { ...state, isAuth: false };
    default:
      return state;
  }
};

export const registrationAction = (payload: UserFormData): UserAction => ({
  type: AuthActions.REGISTRATION,
  payload,
});

export const signinAction = (payload: AuthorizationResponse) => ({
  type: AuthActions.SIGNIN,
  payload,
});
