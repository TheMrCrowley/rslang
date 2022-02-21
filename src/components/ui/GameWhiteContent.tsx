import { Typography } from '@mui/material';
import React, { FC } from 'react';

const GameTextAsset: FC = ({ children }) => {
  return (
    <Typography variant="h2" component="span" fontWeight="bold" color="white">
      {children}
    </Typography>
  );
};
export default GameTextAsset;
