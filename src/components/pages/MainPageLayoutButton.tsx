import React, { FC } from 'react';
import { Typography, Box } from '@mui/material';

interface MainPageLayoutButtonProps {
  text: string;
  onClick: () => void;
}

const MainPageLayoutButton: FC<MainPageLayoutButtonProps> = ({
  children,
  text,
  onClick,
}) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        display: 'flex',
        columnGap: '1em',
        color: '#ffffff',
        p: '1.5em 2em',
        borderRadius: '3em',
        backgroundColor: '#14cba8',
        cursor: 'pointer',
      }}
    >
      {children}
      <Typography
        variant="h4"
        sx={{
          fontWeight: 'bold',
        }}
      >
        {text}
      </Typography>
    </Box>
  );
};

export default MainPageLayoutButton;
