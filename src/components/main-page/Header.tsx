import React from 'react';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Nav from './Nav';
import AuthButton from './AuthButton';
import useWindowScroll from '../../hooks/useWindowScroll';

const StyledContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledHeader = styled('header')({
  position: 'fixed',
  backgroundColor: '#fff',
  minHeight: '64px',
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  zIndex: 100,
});

const Header = () => {
  return (
    <StyledHeader>
      <StyledContainer>
        <Nav />
        <AuthButton />
      </StyledContainer>
    </StyledHeader>
  );
};

export default Header;
