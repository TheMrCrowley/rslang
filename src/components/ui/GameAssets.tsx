import React, { FC } from 'react';
import { Box } from '@mui/material';
import VolumeButton from './VolumeButton';
import HealthBar from './HealthBar';
import CountDown from './CountDown';

interface GameAssetsProps {
  color: string;
}

const GameAssets: FC<GameAssetsProps> = ({ color }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignSelf: 'center',
        flexDirection: 'row',
        gap: '1rem',
        justifyContent: 'space-around',
        width: '350px',
        mt: '5rem',
        mb: '35vh',
        borderRadius: '2em',
        backgroundColor: 'white',
      }}
    >
      <HealthBar color={color} />
      <VolumeButton color={color} />
      <CountDown color={color} />
    </Box>
  );
};

export default GameAssets;
