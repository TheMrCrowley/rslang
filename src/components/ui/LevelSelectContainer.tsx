import React from 'react';
import { Box } from '@mui/material';
import { mainBgColor } from '../e-book/cosnstants';

interface LevelSelecContainerProps {
  color?: string;
}

const LevelSelecContainer: React.FC<LevelSelecContainerProps> = ({
  children,
  color = mainBgColor,
}) => {
  return (
    <Box
      sx={{
        flex: '1 1',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        pl: '3.5em',
        bgcolor: color,
      }}
    >
      <Box
        sx={{
          flexBasis: '400px',
          display: 'flex',
          flexDirection: 'column',
          gap: '1em',
          p: '2em',
          borderRadius: '2em',
          bgcolor: 'white',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default LevelSelecContainer;
