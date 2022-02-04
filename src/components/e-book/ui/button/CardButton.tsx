import React, { FC } from 'react';
import { Button } from '@mui/material';

interface CardButtonProps {
  color: string;
}

const CardButton: FC<CardButtonProps> = ({ children, color }) => {
  return (
    <Button size="small" variant="contained" sx={{ mr: '1em', bgcolor: color }}>
      {children}
    </Button>
  );
};

export default CardButton;
