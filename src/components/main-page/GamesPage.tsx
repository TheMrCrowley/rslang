import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import MainPageLayoutButton from '../pages/MainPageLayoutButton';
import { lightBgColor } from '../e-book/cosnstants';

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const GamesPage = () => {
  return (
    <Box
      sx={{
        flex: '1',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        pl: '3.5rem',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexFlow: 'row wrap',
          gap: '2rem',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          p: '4em',
          backgroundColor: lightBgColor,
          borderRadius: '3em',
        }}
      >
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
      </Box>
    </Box>
  );
};

export default GamesPage;
