/* eslint-disable @typescript-eslint/default-param-last */
import {
  BookAudioAction,
  BookAudioActions,
  BookAudioState,
} from '../../types/bookAudioTypes';

const bookAudioInitialState: BookAudioState = {
  isPlaying: false,
  isPaused: false,
};

export const bookAudioReducer = (
  state = bookAudioInitialState,
  action: BookAudioAction
): BookAudioState => {
  switch (action.type) {
    case BookAudioActions.SET_TO_PLAY:
      return { ...state, isPlaying: true };
    case BookAudioActions.SET_TO_PAUSE:
      return { ...state, isPaused: !state.isPaused, isPlaying: false };
    default:
      return state;
  }
};

export const bookAudioPlayAction = (): BookAudioAction => ({
  type: BookAudioActions.SET_TO_PLAY,
});

export const bookAudioPauseAction = (): BookAudioAction => ({
  type: BookAudioActions.SET_TO_PAUSE,
});
