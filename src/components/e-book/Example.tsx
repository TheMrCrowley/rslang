import React, { FC } from 'react';
import { Typography, Box } from '@mui/material';
import { HandledText } from './utils';

const Example: FC<HandledText> = ({ head, target, tail }) => {
  return (
    <Box sx={{ mt: '0.5em' }}>
      <Typography gutterBottom variant="body2" component="span">
        {head}
      </Typography>
      <Typography
        sx={{ fontStyle: 'italic' }}
        gutterBottom
        variant="body2"
        component="span"
      >
        {target}
      </Typography>
      <Typography gutterBottom variant="body2" component="span">
        {tail}.
      </Typography>
    </Box>
  );
};

export default Example;
