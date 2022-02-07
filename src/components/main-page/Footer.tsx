import React from 'react';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Link, Typography } from '@mui/material';
import RsLogo from '../../assets/rs.svg';

const StyledFooterWrapper = styled('div')`
  height: 100%;
  flex: 1 1 auto;
  display: flex;
  margin: 0 auto;
  align-items: center;
  justify-content: space-between;
  color: white;
`;

const StyledFooter = styled('footer')`
  flex: 1 1 auto;
  z-index: 5000;
  max-height: 90px;
  background-color: #202026;
  display: flex;
  align-items: center;
  transition: 0.5s all ease-in-out;
`;

const LogoWrapper = styled('div')`
  max-width: 100%;
  height: auto;
  filter: invert(1);
  transition: 0.2s filter ease-in-out;
  cursor: pointer;
  svg {
    width: 35%;
  }
  &:hover {
    filter: invert(83%) sepia(64%) saturate(3075%) brightness(97%)
      contrast(105%);
  }
`;

const Footer = () => {
  return (
    <StyledFooter>
      <Container>
        <StyledFooterWrapper>
          <LogoWrapper>
            <Link href="https://rs.school/js/" target="_blank">
              <RsLogo />
            </Link>
          </LogoWrapper>
          <Box sx={{ display: 'flex', columnGap: '1rem' }}>
            <Typography>
              <Link
                sx={{ color: 'inherit' }}
                href="https://github.com/TheMrCrowley"
                target="_blank"
                rel="noreferrer"
              >
                Denis Mythnik
              </Link>
            </Typography>
            <Link
              sx={{ color: 'inherit' }}
              href="https://github.com/alexandersus"
              target="_blank"
              rel="noreferrer"
            >
              AlexanderSUS
            </Link>
          </Box>
          <Typography>Created in 2022</Typography>
        </StyledFooterWrapper>
      </Container>
    </StyledFooter>
  );
};

export default Footer;
