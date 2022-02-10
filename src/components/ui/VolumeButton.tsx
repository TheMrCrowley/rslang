import React, { FC, useState } from 'react';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';

interface VolumeButtonProps {
  color: string;
}

const VolumeButton: FC<VolumeButtonProps> = ({ color }) => {
  // TO DO connect sound to buttton
  const [sound, setSound] = useState(true);

  return (
    <span>
      {sound ? (
        <VolumeUpIcon
          onClick={() => setSound(false)}
          fontSize="large"
          sx={{ fill: color, cursor: 'pointer' }}
        />
      ) : (
        <VolumeOffIcon
          onClick={() => setSound(true)}
          fontSize="large"
          sx={{ fill: color, cursor: 'pointer' }}
        />
      )}
    </span>
  );
};

export default VolumeButton;
