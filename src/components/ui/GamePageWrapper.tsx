import { Box, styled } from '@mui/material';
import React, { FC } from 'react';

const StyledGamePageWrapper = styled(Box)`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: space-evenly;
`;

interface GamePageWrapperProps {
  color: string;
}

const GamePageWrapper: FC<GamePageWrapperProps> = ({ children, color }) => {
  return (
    <StyledGamePageWrapper sx={{ backgroundColor: color }}>
      {children}
    </StyledGamePageWrapper>
  );
};

export default GamePageWrapper;
