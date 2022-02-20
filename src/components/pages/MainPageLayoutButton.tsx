import React, { FC } from 'react';
import { Typography, Button, styled } from '@mui/material';
import { darkBgColor } from '../e-book/cosnstants';

interface MainPageLayoutButtonProps {
  text?: string;
  onClick?: () => void;
  color?: string;
  disabled?: boolean;
}

const StyledTypo = styled(Typography)`
  font-weight: bold;
  font-size: 2rem;
  @media (max-width: 420px) {
    font-size: 1.5rem;
  }
`;

const MainPageLayoutButton: FC<MainPageLayoutButtonProps> = ({
  children,
  text,
  onClick,
  color = darkBgColor,
  disabled,
}) => {
  const StyledMainPageLayuotButton = styled(Button)`
    color: #ffffff;
    padding: 1em 1em;
    border-radius: 3em;
    background-color: ${color};
    &:hover {
      background-color: #ffffff;
      color: ${color};
    }
    &:disabled {
      background-color: ${color};
      color: white;
    }
  `;

  return (
    <StyledMainPageLayuotButton disabled={disabled} onClick={onClick}>
      {children}
      <StyledTypo variant="h4">{text}</StyledTypo>
    </StyledMainPageLayuotButton>
  );
};

export default MainPageLayoutButton;
