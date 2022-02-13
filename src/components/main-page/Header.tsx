import React from 'react';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Nav from './Nav';
import AuthButton from './AuthButton';

const StyledContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Header = () => {
  return (
    <header>
      <StyledContainer>
        <Nav />
        <AuthButton />
      </StyledContainer>
    </header>
  );
};

export default Header;
