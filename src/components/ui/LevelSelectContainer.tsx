import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { mainBgColor } from '../e-book/cosnstants';

interface LevelSelecContainerProps {
  color?: string;
}

const LevelMainWrapper = styled(Box)`
  display: flex;
  flex: 1 1 auto;
  justify-content: space-around;
  align-items: center;
  background-color: transparent;
`;

const LevelInnerWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 1em;
  padding: 2em;
  border-radius: 2em;
  background-color: #fff;
  min-width: 400px;
`;

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
        mt: '-5rem',
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
