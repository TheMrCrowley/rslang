import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import MainPageLayoutButton from '../pages/MainPageLayoutButton';
import { lightBgColor } from '../e-book/cosnstants';

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const StyledWrapper = styled(Box)`
  flex: 1 1 auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const LinksWrapper = styled(Box)`
  display: flex;
  flex-flow: row wrap;
  gap: 2rem;
  justify-content: space-evenly;
  align-items: center;
  padding: 4em;
  background-color: ${lightBgColor};
  border-radius: 3em;
`;

const GamesPage = () => {
  return (
    <StyledWrapper>
      <LinksWrapper>
        <StyledLink to="sprint">
          <MainPageLayoutButton>
            <Typography variant="h2" fontWeight="bold">
              Sprint
            </Typography>
          </MainPageLayoutButton>
        </StyledLink>
        <StyledLink to="audiocall">
          <MainPageLayoutButton>
            <Typography variant="h2" fontWeight="bold">
              Audiocall
            </Typography>
          </MainPageLayoutButton>
        </StyledLink>
      </LinksWrapper>
    </StyledWrapper>
  );
};

export default GamesPage;
