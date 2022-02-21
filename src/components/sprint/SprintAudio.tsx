import React, { FC, RefObject } from 'react';
import ReactAudioPlayer from 'react-audio-player';

interface SprintAudioProps {
  correct: RefObject<ReactAudioPlayer>;
  incorrect: RefObject<ReactAudioPlayer>;
}

const SprintAudio: FC<SprintAudioProps> = ({ correct, incorrect }) => {
  return (
    <>
      <ReactAudioPlayer
        src="https://rslang-team15-natein.netlify.app/static/media/correct.a7b1cde9.mp3"
        ref={correct}
      />
      <ReactAudioPlayer
        src="https://rslang-team15-natein.netlify.app/static/media/wrong.8e2ad3b1.mp3"
        ref={incorrect}
      />
    </>
  );
};

export default SprintAudio;
