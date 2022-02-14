import React, { FC } from 'react';
import { Box, styled } from '@mui/material';
import CampaignIcon from '@mui/icons-material/Campaign';

interface AudiocallInGameUpAssetsProps {
  onClick: () => void;
  color: string;
}

const AudiocallInGameUpAssets: FC<AudiocallInGameUpAssetsProps> = ({
  onClick,
  color,
}) => {
  const StyledAudioCallUpAssetsContainer = styled(Box)`
    display: flex;
    align-self: center;
    justify-content: space-around;
    padding: 1.5rem;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.3);
    &: hover {
      background-color: rgba(255, 255, 255, 1);
    }
    &: hover svg {
      color: ${color};
    }
  `;

  const StyledCampaignIcon = styled(CampaignIcon)`
    height: 7rem;
    width: 7rem;
    color: white;
    &: hover {
      color: ${color};
    }
  `;

  return (
    <StyledAudioCallUpAssetsContainer onClick={onClick}>
      <StyledCampaignIcon />
    </StyledAudioCallUpAssetsContainer>
  );
};

export default AudiocallInGameUpAssets;
