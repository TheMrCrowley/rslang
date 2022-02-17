import { Box, Divider, styled, Typography } from '@mui/material';
import React from 'react';
import { darkBgColor, lightBgColor } from '../e-book/cosnstants';
import Bg from '../../assets/Untitled.png';

const TeamPageWrapper = styled(Box)`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 6rem;
  background-image: url(${Bg});
  background-repeat: no-repeat;
  background-size: cover;
  gap: 1rem;
`;

const MembersWrapper = styled(Box)`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  align-items: center;
  gap: 1rem;
`;

const MemberWrapper = styled(Box)`
  padding: 2rem;
  border-radius: 2rem;
  background-color: ${darkBgColor};
`;

const TeamPage = () => {
  return (
    <TeamPageWrapper>
      <Typography
        variant="h1"
        fontWeight="bold"
        sx={{
          width: 'fit-content',
          p: '0.4em 1em 0.4em 1em',
          textAlign: 'center',
          color: 'rgba(0, 0, 0, 0.87)',
          backgroundColor: lightBgColor,
          borderRadius: '3em',
        }}
      >
        About team
      </Typography>
      <MembersWrapper>
        <MemberWrapper>
          <Typography
            variant="h3"
            fontWeight="bold"
            color="white"
            textAlign="center"
          >
            Denis Mythnik
          </Typography>
          <Divider
            color="white"
            sx={{
              mb: '0.5rem',
              mt: '0.5rem',
            }}
          />
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            color="rgba(0, 0, 0, 0.87)"
            textAlign="center"
          >
            Teamlead, develop app architecture
          </Typography>
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            color="rgba(0, 0, 0, 0.87)"
            textAlign="center"
          >
            Set authorization, develop both games Sprint and Audiocall
          </Typography>
        </MemberWrapper>
        <MemberWrapper>
          <Typography
            variant="h3"
            fontWeight="bold"
            color="white"
            textAlign="center"
          >
            Alexander Suslov
          </Typography>
          <Divider
            color="white"
            sx={{
              mb: '0.5rem',
              mt: '0.5rem',
            }}
          />
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            color="rgba(0, 0, 0, 0.87)"
            textAlign="center"
          >
            Create application design
          </Typography>
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            color="rgba(0, 0, 0, 0.87)"
            textAlign="center"
          >
            Develop book pages and cards
          </Typography>
        </MemberWrapper>
      </MembersWrapper>
    </TeamPageWrapper>
  );
};

export default TeamPage;
