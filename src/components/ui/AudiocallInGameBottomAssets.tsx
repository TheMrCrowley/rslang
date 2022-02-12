import React, { FC } from 'react';
import { Box, styled, Typography } from '@mui/material';

interface AudiocallInGameBottomAssetsProps {
  onClick: () => void;
  color: string;
}

const AudiocallInGameBottomAssets: FC<AudiocallInGameBottomAssetsProps> = ({
  onClick,
  color,
}) => {
  const StyledAudioCallBottomAssetsContainer = styled(Box)`
    display: flex;
    align-self: center;
    flex-flow: row;
    justify-content: space-around;
    margin-top: 4vw;
    padding: 0.5rem 1.5rem;
    border-radius: 2rem;
    background-color: rgba(255, 255, 255, 0.3);
    &: hover {
      background-color: rgba(255, 255, 255, 1);
    }
    &: hover h4 {
      color: ${color};
    }
  `;

  const StyledTypography = styled(Typography)`
    color: white;
    &: hover {
      color: ${color};
    }
  `;

  return (
    <StyledAudioCallBottomAssetsContainer onClick={onClick}>
      <StyledTypography variant="h4">I don&apos;t know :(</StyledTypography>
    </StyledAudioCallBottomAssetsContainer>
  );
};

export default AudiocallInGameBottomAssets;
