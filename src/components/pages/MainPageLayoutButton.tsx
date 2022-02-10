import React, { FC } from 'react';
import { Typography, Button, styled } from '@mui/material';
import { darkBgColor } from '../e-book/cosnstants';

interface MainPageLayoutButtonProps {
  text: string;
  onClick: () => void;
  color?: string;
}

const MainPageLayoutButton: FC<MainPageLayoutButtonProps> = ({
  children,
  text,
  onClick,
  color = darkBgColor,
}) => {
  const StyledMainPageLayuotButton = styled(Button)`
    color: #ffffff;
    padding: 1em 1em;
    border-radius: 3em;
    background-color: ${color};
    white-space: nowrap;
    &:hover {
      background-color: #ffffff;
      color: ${color};
    }
  `;

  return (
    <StyledMainPageLayuotButton onClick={onClick}>
      {children}
      <Typography
        variant="h4"
        sx={{
          fontWeight: 'bold',
        }}
      >
        {text}
      </Typography>
    </StyledMainPageLayuotButton>
  );
};

export default MainPageLayoutButton;
