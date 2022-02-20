import { styled, Typography } from '@mui/material';
import React, { FC } from 'react';

interface GameDescriptionProps {
  title: string;
}

const StyledTitle = styled(Typography)`
  font-size: 3rem;
  font-weight: bold;
  color: white;
  text-align: center;
`;

export const StyledBody = styled(Typography)`
  margin-bottom: 2rem;
  font-size: 2rem;
  font-weight: bold;
  color: white;
  text-align: center;
`;

const GameDescription: FC<GameDescriptionProps> = ({ children, title }) => {
  return (
    <>
      <StyledTitle>{title}</StyledTitle>
      <StyledBody>{children}</StyledBody>
    </>
  );
};

export default GameDescription;
