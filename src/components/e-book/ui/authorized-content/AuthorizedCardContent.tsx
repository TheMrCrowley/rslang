import React, { FC } from 'react';
import { Box } from '@mui/material';
import ProgressBar from '../progress-bar/ProgressBar';
import CardButton from '../button/CardButton';

interface AuthorizedCardContentProps {
  color: string;
  progress: number;
}

const AuthorizedCardContent: FC<AuthorizedCardContentProps> = ({
  color,
  progress,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        mt: 'auto',
        p: '0 1em 1em 1em',
      }}
    >
      <CardButton color={color}>Difficult</CardButton>
      <CardButton color={color}>Studied</CardButton>
      <ProgressBar color={color} progress={progress} />
    </Box>
  );
};

export default AuthorizedCardContent;
