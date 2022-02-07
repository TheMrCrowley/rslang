import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Link, Typography } from '@mui/material';
import RsLogo from '../../assets/rs.svg';

const Footer = () => {
  const StyledRsLogo = styled(RsLogo)`
    width: 3.5em;
    height: 3.5em;
    ${window.location.pathname === '/home' && 'filter:invert(1)'};
    transition: 0.2s filter ease-in-out;
    cursor: pointer;
    &:hover {
      filter: invert(83%) sepia(64%) saturate(3075%) brightness(97%)
        contrast(105%);
    }
  `;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        height: '4em',
        color: window.location.pathname === '/home' ? 'white' : 'black',
        backgroundColor:
          window.location.pathname === '/home' ? '#14cba8' : '#ffffff',
        mb: 'auto',
      }}
    >
      <Link href="https://rs.school/js/" target="_blank">
        <StyledRsLogo />
      </Link>
      <Box>
        <Link
          sx={{ color: 'inherit', textDecoration: 'none', mr: '1em' }}
          href="https://github.com/TheMrCrowley"
          target="_blank"
          rel="noreferrer"
        >
          Denis Mythnik
        </Link>
        <Link
          sx={{ color: 'inherit', textDecoration: 'none' }}
          href="https://github.com/alexandersus"
          target="_blank"
          rel="noreferrer"
        >
          AlexanderSUS
        </Link>
      </Box>
      <Typography>Created in 2022</Typography>
    </Box>
  );
};

export default Footer;
