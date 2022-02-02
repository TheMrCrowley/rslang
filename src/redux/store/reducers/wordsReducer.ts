import { IWord } from '../../../services/types';
/* eslint-disable @typescript-eslint/default-param-last */

enum WrodsActions {
  GET_WORDS = 'GET_WRODS',
  GET_WROD = 'GET_WORD',
}

interface WordsState {
  words: IWord[];
}

interface UserAction {
  type: string;
  payload?: unknown;
}

interface GetWordsAction extends UserAction {
  payload: IWord[];
}

type GetWordAction = UserAction;

const initialState: WordsState = {
  words: [] as IWord[],
};

const wrodsReducer = (state = initialState, action: UserAction): WordsState => {
  switch (action.type) {
    case WrodsActions.GET_WORDS:
      return { ...state, words: [...(action as GetWordsAction).payload] };
    default:
      return state;
  }
};
