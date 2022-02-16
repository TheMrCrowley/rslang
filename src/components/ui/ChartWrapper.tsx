import { Box, Typography } from '@mui/material';
import React, { FC } from 'react';

interface ChartWrapperProps {
  text: string;
}

const ChartWrapper: FC<ChartWrapperProps> = ({ text, children }) => {
  return (
    <Box sx={{ minWidth: '45%' }}>
      <Typography variant="h4" component="h4" gutterBottom textAlign="center">
        {text}
      </Typography>
      {children}
    </Box>
  );
};

export default ChartWrapper;
