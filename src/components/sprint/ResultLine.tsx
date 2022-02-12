/* eslint-disable jsx-a11y/media-has-caption */
import { Box, IconButton, Typography } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import React, { FC, LegacyRef, useRef } from 'react';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import getAssetsUrl from '../../helpers/getAssetsUrl';

interface ResultLineProps {
  audio: string;
  word: string;
  translate: string;
  color: string;
}

const ResultLine: FC<ResultLineProps> = ({ audio, word, translate, color }) => {
  const audioRef = useRef<HTMLAudioElement>();
  const playHandler = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };
  return (
    <Box>
      <audio
        src={getAssetsUrl(audio)}
        ref={audioRef as LegacyRef<HTMLAudioElement>}
      />
      <Typography
        variant="h5"
        component="span"
        sx={{ textTransform: 'capitalize', color }}
      >
        <Tooltip title="play">
          <IconButton onClick={playHandler}>
            <AudiotrackIcon sx={{ fill: color }} />
          </IconButton>
        </Tooltip>
        {word} {'   '}
      </Typography>
      <Typography variant="h5" component="span">
        {translate}
      </Typography>
    </Box>
  );
};

export default ResultLine;
