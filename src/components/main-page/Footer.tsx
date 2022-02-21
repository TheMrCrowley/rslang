import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Link, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import RsLogo from '../../assets/rs.svg';
import { darkBgColor } from '../e-book/cosnstants';

const StyledRsLogo = styled(RsLogo)`
  width: 3.5em;
  height: 3.5em;
  cursor: pointer;
`;

const Footer = () => {
  const location = useLocation();
  useEffect(() => {}, [location]);

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
      <Typography>2022</Typography>
    </Box>
  );
};

export default Footer;
