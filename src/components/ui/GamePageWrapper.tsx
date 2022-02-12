import { Box, styled } from '@mui/material';
import React, { FC } from 'react';

const StyledGamePageWrapper = styled(Box)`
  min-height: calc(100vh - 4em);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 3.5rem;
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
