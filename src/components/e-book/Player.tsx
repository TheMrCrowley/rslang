import React, { FC } from 'react';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import useCardAudio from '../../hooks/useCardAudio';

interface PlayerProps {
  urls: string[];
}

const Player: FC<PlayerProps> = ({ urls }) => {
  const audio = useCardAudio(urls);

  return (
    <RecordVoiceOverIcon
      onClick={audio}
      fontSize="large"
      sx={{ ml: '0.5em', verticalAlign: 'bottom' }}
    />
  );
};

export default Player;
