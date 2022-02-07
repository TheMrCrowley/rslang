import React, { FC } from 'react';
import { styled } from '@mui/material/styles';
import { Button, ButtonProps } from '@mui/material';

const StyledButton = styled(Button)`
  height: 3rem;
  font-size: 24px;
  border: 2px solid #fecb00;
  border-radius: 0.5rem;
  color: #202026;
  transition: 0.5s all ease-in-out;
  &:hover {
    color: #fecb00;
    border-color: #202026;
    //background-color: #fff;
  }
`;

const SprintButton: FC<ButtonProps> = ({ children, onClick }) => {
  return <StyledButton onClick={onClick}>{children}</StyledButton>;
};

export default SprintButton;
