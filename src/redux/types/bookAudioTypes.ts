export interface BookAudioState {
  isPlaying: boolean;
  isPaused: boolean;
}

export enum BookAudioActions {
  SET_TO_PLAY = 'SET_TO_PLAY',
  SET_TO_PAUSE = 'SET_TO_PAUSE',
}

interface BookAudioPlayAction {
  type: BookAudioActions.SET_TO_PLAY;
}

interface BookAudioPauseAction {
  type: BookAudioActions.SET_TO_PAUSE;
}

export type BookAudioAction = BookAudioPlayAction | BookAudioPauseAction;
