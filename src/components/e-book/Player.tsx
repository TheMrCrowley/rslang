import React, { FC } from 'react';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';

interface PlayerProps {
  urls: string[];
}

const Player: FC<PlayerProps> = ({ urls }) => {
  const playing = false;
  let currentTrackNum = 0;
  let audio = new Audio(urls[currentTrackNum]);
  audio.onended = () => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    playNextTrack();
  };

  function playAudio() {
    if (!playing) {
      audio.play();
    }
  }

  function playNextTrack() {
    currentTrackNum += 1;
    if (currentTrackNum < urls.length) {
      audio = new Audio(urls[currentTrackNum]);
      audio.play();
      audio.onended = () => {
        playNextTrack();
      };
    }
  }

  return (
    <RecordVoiceOverIcon
     onClick={playAudio}
      fontSize="large"
      sx={{ ml: '0.5em', verticalAlign: 'bottom' }}
    />
  );
};

export default Player;
