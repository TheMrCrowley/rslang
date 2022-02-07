import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledBox = styled(Box)`
  display: flex;
  column-gap: 2rem;
`;

const StyledButton = styled(Button)`
  color: #202026;
  text-decoration: none;
  font-size: 48px;
  &:hover {
    background-color: #fecb00;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const GamesPage = () => {
  return (
    <StyledBox>
      <StyledLink to="sprint">
        <StyledButton>Sprint</StyledButton>
      </StyledLink>
      <StyledLink to="sprint">
        <StyledButton>Audiocall</StyledButton>
      </StyledLink>
    </StyledBox>
  );
};

export default GamesPage;
