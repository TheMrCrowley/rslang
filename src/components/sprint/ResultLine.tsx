/* eslint-disable jsx-a11y/media-has-caption */
import { Box, IconButton, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import React, { FC, LegacyRef, useRef } from 'react';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import getAssetsUrl from '../../helpers/getAssetsUrl';

interface ResultLineProps {
  audio: string;
  word: string;
  translate: string;
}

const StyledBox = styled(Box)`
  width: 50%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  column-gap: 1rem;
  border: 2px solid #202026;
`;

const StyledTypografy = styled(Typography)`
  font-size: 24px;
  color: #202026;
`;

const ResultLine: FC<ResultLineProps> = ({ audio, word, translate }) => {
  const audioRef = useRef<HTMLAudioElement>();
  const playHandler = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };
  return (
    <StyledBox>
      <Tooltip title="play">
        <IconButton onClick={playHandler}>
          <AudiotrackIcon />
        </IconButton>
      </Tooltip>

      <audio
        src={getAssetsUrl(audio)}
        ref={audioRef as LegacyRef<HTMLAudioElement>}
      />
      <StyledTypografy>{`${word} --- ${translate}`}</StyledTypografy>
    </StyledBox>
  );
};

export default ResultLine;
