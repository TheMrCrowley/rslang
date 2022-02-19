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
    &: hover {
      background-color: ${darkColors[group]};
    }
    &: hover span {
      color: white;
    }
    &: disabled {
      background-color: ${lightColors[group]};
      color: ${darkColors[group]};
    }
    @media (max-width: 410px) {
      margin-bottom: 1rem;
    }
  `;

  const StyledTypography = styled(Typography)`
    color: ${colors[group]};
  `;

  return (
    <StyledAudioCallBottomAssetsContainer disabled={disabled} onClick={onClick}>
      <StyledTypography variant="h3" component="span" fontWeight="bold">
        Next
      </StyledTypography>
    </StyledAudioCallBottomAssetsContainer>
  );
};

export default AudiocallInGameBottomAssets;
