import { Box, styled } from '@mui/material';
import React, { FC } from 'react';

const StyledSprintInGameUpAssets = styled(Box)`
  display: flex;
  align-self: center;
  justify-content: space-around;
  column-gap: 1rem;
  margin-bottom: 12vh;
  border-radius: 2em;
  padding: 1em 2em;
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
