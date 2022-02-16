import { Box, styled } from '@mui/material';
import React, { FC } from 'react';

const StyledGamePageWrapper = styled(Box)`
  min-height: calc(100vh - 4em);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: space-evenly;
  padding-top: 1rem;
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
