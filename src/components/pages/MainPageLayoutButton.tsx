import React, { FC } from 'react';
import { Typography, Button, styled } from '@mui/material';

interface MainPageLayoutButtonProps {
  text: string;
  onClick: () => void;
}

const StyledMainPageLayuotButton = styled(Button)`
  color: #ffffff;
  padding: 1em 1em;
  border-radius: 3em;
  background-color: #14cba8;
  &:hover {
    background-color: #ffffff;
    color: #14cba8;
  }
`;

const MainPageLayoutButton: FC<MainPageLayoutButtonProps> = ({
  children,
  text,
  onClick,
}) => {
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
