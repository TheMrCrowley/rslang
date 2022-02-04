export interface RequestState {
  isRequest: boolean;
  requestError: boolean;
  requestSuccess: boolean;
}

export enum RequestActionTypes {
  REQUEST_START = 'REQUEST_START',
  REQUEST_ERROR = 'REQUEST_ERROR',
  REQUEST_SUCCESS = 'REQUEST_SUCCESS',
  REQUEST_RESET = 'REQUEST_RESET',
}

export interface RequestStartAction {
  type: RequestActionTypes.REQUEST_START;
}

export interface RequestErrorAction {
  type: RequestActionTypes.REQUEST_ERROR;
}

export interface RequestSuccessAction {
  type: RequestActionTypes.REQUEST_SUCCESS;
}

export interface RequestResetAction {
  type: RequestActionTypes.REQUEST_RESET;
}

export type RequestAction =
  | RequestStartAction
  | RequestErrorAction
  | RequestSuccessAction
  | RequestResetAction;
