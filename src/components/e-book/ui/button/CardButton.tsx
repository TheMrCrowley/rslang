import React, { FC } from 'react';
import { Button } from '@mui/material';

interface CardButtonProps {
  color: string;
  onClick?: () => void;
}

const CardButton: FC<CardButtonProps> = ({ children, color, onClick }) => {
  return (
    <Button
      size="small"
      variant="contained"
      onClick={onClick}
      sx={{ mr: '1em', bgcolor: color }}
    >
      {children}
    </Button>
  );
};

export default CardButton;
