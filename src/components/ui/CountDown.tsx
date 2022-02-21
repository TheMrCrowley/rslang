import { Typography } from '@mui/material';
import React, { FC } from 'react';

const CountDown: FC = ({ children }) => {
  return (
    <Typography variant="h4" color="white" fontWeight="bold" component="span">
      Time left: {children}
    </Typography>
  );
};

export default CountDown;
