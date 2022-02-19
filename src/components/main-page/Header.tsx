import React from 'react';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import { AppBar, Toolbar } from '@mui/material';
import Nav from './Nav';
import AuthButton from './AuthButton';

const StyledContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Header = () => {
  return (
    <Toolbar component="header">
      <StyledContainer>
        <Nav />
        <AuthButton />
      </StyledContainer>
    </Toolbar>
  );
};

export default Header;
