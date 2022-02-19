import { Box, styled } from '@mui/material';
import React, { FC } from 'react';

const StyledSprintInGameUpAssets = styled(Box)`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  column-gap: 1rem;
  border-radius: 2em;
  padding: 1em 2em;
  @media (max-width: 480px) {
    margin: 0 2rem;
    padding: 1em 1em;
  }
`;

interface SprintInGameUpAssetsProps {
  color: string;
}

const SprintInGameUpAssets: FC<SprintInGameUpAssetsProps> = ({
  color,
  children,
}) => {
  return (
    <StyledSprintInGameUpAssets sx={{ backgroundColor: color }}>
      {children}
    </StyledSprintInGameUpAssets>
  );
};

export default SprintInGameUpAssets;
