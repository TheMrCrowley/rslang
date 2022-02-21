/* eslint-disable jsx-a11y/media-has-caption */
import { Box, IconButton, Typography } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import React, { FC } from 'react';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import getAssetsUrl from '../../helpers/getAssetsUrl';
import useAudio from '../../hooks/useAudio';

interface ResultLineProps {
  audio: string;
  word: string;
  translate: string;
  color: string;
}

const ResultLine: FC<ResultLineProps> = ({ audio, word, translate, color }) => {
  const audioPlay = useAudio(getAssetsUrl(audio));

  return (
    <Box>
      <Typography
        variant="h5"
        component="span"
        sx={{ textTransform: 'capitalize', color }}
      >
        <Tooltip title="play">
          <IconButton onClick={audioPlay}>
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
