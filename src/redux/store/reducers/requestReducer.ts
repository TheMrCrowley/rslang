/* eslint-disable @typescript-eslint/default-param-last */
import {
  RequestAction,
  RequestActionTypes,
  RequestState,
} from '../../types/requestTypes';

const requestInitialState: RequestState = {
  isRequest: false,
  requestError: false,
  requestSuccess: false,
};

export const requestReducer = (
  state = requestInitialState,
  action: RequestAction
): RequestState => {
  switch (action.type) {
    case RequestActionTypes.REQUEST_START:
      return { isRequest: true, requestError: false, requestSuccess: false };
    case RequestActionTypes.REQUEST_ERROR:
      return { isRequest: false, requestError: true, requestSuccess: false };
    case RequestActionTypes.REQUEST_SUCCESS:
      return { isRequest: false, requestError: false, requestSuccess: true };
    case RequestActionTypes.REQUEST_RESET:
      return { ...requestInitialState };
    default:
      return state;
  }
};

export const requestActionCreator = (
  type: RequestActionTypes
): RequestAction => ({ type });
