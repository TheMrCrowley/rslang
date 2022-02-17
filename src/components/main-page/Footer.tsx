import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Link, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import RsLogo from '../../assets/rs.svg';
import { darkBgColor } from '../e-book/cosnstants';

const Footer = () => {
  const location = useLocation();
  useEffect(() => {}, [location]);

  const StyledRsLogo = styled(RsLogo)`
    width: 3.5em;
    height: 3.5em;
    ${location.toString() === '/home' && 'filter:invert(1)'};
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
        color: location.pathname !== '/book' ? 'black' : 'white',
        backgroundColor:
          !location.pathname.includes('/book') &&
          location.pathname !== '/sprint' &&
          location.pathname !== '/audiocall'
            ? darkBgColor
            : 'white',
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
