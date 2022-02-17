import { Box, Typography } from '@mui/material';
import React, { FC } from 'react';
import { HandledText } from '../../helpers/handleTagInText';

const Meaning: FC<HandledText> = ({ head, target, tail }) => {
  return (
    <Box sx={{ mt: '0.5em' }}>
      <Typography gutterBottom variant="body2" component="span">
        {head}
      </Typography>
      <Typography
        sx={{ fontWeight: 'bold' }}
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

export default Meaning;
