import React, { FC } from 'react';
import { Box, CardMedia, styled, Typography } from '@mui/material';
import CampaignIcon from '@mui/icons-material/Campaign';
import getAssetsUrl from '../../helpers/getAssetsUrl';

interface AudiocallInGameUpAssetsProps {
  status: boolean;
  onClick: () => void;
  color: string;
  image: string;
  word: string;
}

const StyledAudioCallUpAssetsContainer = styled(Box)<{ color: string }>(
  ({ color }) => `
    display: flex;
  align-self: center;
  justify-content: space-around;
  padding: 1.5rem;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.3);
  cursor: pointer;
  &:hover {
    background-color: rgba(255, 255, 255, 1);
  }
  &:hover svg {
    color: ${color};
  }
  `
);

const StyledCampaignIcon = styled(CampaignIcon)<{ colorhover: string }>(
  ({ colorhover }) => `
  height: 7rem;
  width: 7rem;
  color: white;
  &:hover {
    color: ${colorhover};
  }
  @media (max-width: 410px) {
    height: 2.5rem;
    width: 2.5rem;
  }
`
);

const StyledBox = styled(Box)`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: space-evenly;
  gap: 1rem;
`;

const StyledWordComponent = styled(Box)`
  color: white;
  font-weight: bold;
  font-size: 6rem;
  text-transform: capitalize;
  @media (max-width: 410px) {
    font-size: 3.75rem;
  }
`;

const AudiocallInGameUpAssets: FC<AudiocallInGameUpAssetsProps> = ({
  onClick,
  color,
  status,
  word,
  image,
}) => {
  return (
    <StyledBox>
      {status && <StyledWordComponent>{word}</StyledWordComponent>}
      <StyledAudioCallUpAssetsContainer color={color} onClick={onClick}>
        <StyledCampaignIcon colorhover={color} />
      </StyledAudioCallUpAssetsContainer>
      <CardMedia
        component="img"
        height={window.innerHeight < 700 ? '100' : '140'}
        image={getAssetsUrl(image)}
        sx={{
          borderRadius: '2rem',
          width: 'fit-content',
          display: `${status ? 'block' : 'none'}`,
        }}
      />
    </StyledBox>
  );
};

export default AudiocallInGameUpAssets;
