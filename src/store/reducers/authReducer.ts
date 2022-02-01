import { UserFormData, AuthorizationResponse } from '../../services/types';
/* eslint-disable @typescript-eslint/default-param-last */

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
      return { ...state, userData: action.payload as AuthorizationResponse };
    case AuthActions.SIGNIN:
      return { ...state, isAuth: true };
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
