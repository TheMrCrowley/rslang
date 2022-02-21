import React, { FC } from 'react';
import { Button, styled, Typography } from '@mui/material';
import { colors, darkColors, lightColors } from '../e-book/cosnstants';

interface AudiocallInGameBottomAssetsProps {
  onClick: () => void;
  group: number;
  disabled?: boolean;
}

const AudiocallInGameBottomAssets: FC<AudiocallInGameBottomAssetsProps> = ({
  onClick,
  group,
  disabled,
}) => {
  const StyledAudioCallBottomAssetsContainer = styled(Button)`
    padding: 0.5rem 1.5rem;
    border-radius: 2rem;
    background-color: white;
    min-width: 300px;
    &:hover {
      background-color: ${darkColors[group]};
    }
    &:hover span {
      color: white;
    }
    &:disabled {
      background-color: ${lightColors[group]};
      color: ${darkColors[group]};
    }
  `;

  const StyledTypography = styled(Typography)`
    color: ${colors[group]};
    font-size: 3rem;
    @media (max-width: 420px) {
      font-size: 1.5rem;
    }
  `;

  return (
    <StyledAudioCallBottomAssetsContainer disabled={disabled} onClick={onClick}>
      <StyledTypography variant="h3" fontWeight="bold">
        Next
      </StyledTypography>
    </StyledAudioCallBottomAssetsContainer>
  );
};

export default AudiocallInGameBottomAssets;
