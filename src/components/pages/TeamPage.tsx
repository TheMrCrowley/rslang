import { Avatar, Box, Divider, Link, styled, Typography } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { darkBgColor } from '../e-book/cosnstants';
import Bg from '../../assets/Untitled.png';
import MrCrowleyAvatar from '../../assets/avatar1.jpg';

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
  @media (max-width: 560px) {
    padding: 5rem 0.5rem 0.5rem 0.5rem;
  }
`;

const MembersWrapper = styled(Box)`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  align-items: center;
  gap: 1rem;
`;

const MemberWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  border-radius: 2rem;
  background-color: ${darkBgColor};
`;

const StyledTitle = styled(Typography)`
  width: fit-content;
  text-align: center;
  color: rgba(0, 0, 0, 0.87);
  font-weight: bold;
  font-size: 4.5rem;
  @media (max-width: 560px) {
    font-size: 3.5rem;
  }
` as typeof Typography;

const TeamPage = () => {
  return (
    <TeamPageWrapper>
      <StyledTitle variant="h1">About app</StyledTitle>
      <Box
        sx={{
          maxWidth: 'fit-content',
          backgroundColor: 'white',
          padding: '2em',
          borderRadius: '3rem',
        }}
      >
        <Typography fontWeight="bold" gutterBottom>
          RSLang is an app for easy and fun learning English words. It contains
          3600 frequently used words.
        </Typography>
        <Typography fontWeight="bold" gutterBottom>
          Detailed statistics help track your learning progress.
        </Typography>
        <Typography fontWeight="bold" gutterBottom>
          Mark words as difficult, then they will be collected on one page.
        </Typography>
        <Typography fontWeight="bold" gutterBottom>
          Play games and memorize new words, during this process you also will
          be able train your listening skills.
        </Typography>
      </Box>
      <StyledTitle variant="h1">About team</StyledTitle>
      <MembersWrapper>
        <MemberWrapper>
          <Box sx={{ display: 'flex', gap: '1rem' }}>
            <Avatar
              alt="MrCrowley avatar"
              src={MrCrowleyAvatar}
              sx={{ width: 48, height: 48 }}
            />
            <Typography variant="h3" fontWeight="bold" color="white">
              Denis Mythnik
            </Typography>
          </Box>
          <Divider
            color="white"
            sx={{
              width: '100%',
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
          <Link
            sx={{ color: 'inherit', textDecoration: 'none', mr: '1em' }}
            href="https://github.com/TheMrCrowley"
            target="_blank"
            rel="noreferrer"
          >
            <GitHubIcon fontSize="large" />
          </Link>
        </MemberWrapper>
        <MemberWrapper>
          <Box sx={{ display: 'flex', gap: '1rem' }}>
            <Avatar alt="AlexanderSus avatar" sx={{ width: 48, height: 48 }}>
              <AccountCircleIcon fontSize="large" />
            </Avatar>
            <Typography variant="h3" fontWeight="bold" color="white">
              Alexander Suslov
            </Typography>
          </Box>
          <Divider
            color="white"
            sx={{
              width: '100%',
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
          <Link
            sx={{ color: 'inherit', textDecoration: 'none' }}
            href="https://github.com/alexandersus"
            target="_blank"
            rel="noreferrer"
            textAlign="center"
          >
            <GitHubIcon fontSize="large" />
          </Link>
        </MemberWrapper>
      </MembersWrapper>
    </TeamPageWrapper>
  );
};

export default TeamPage;
