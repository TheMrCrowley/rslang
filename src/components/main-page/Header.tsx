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
  position: 'sticky',
  backgroundColor: '#fff',
  minHeight: '64px',
  display: 'flex',
  alignItems: 'center',
  zIndex: 100,
});

const Header = () => {
  const top = useWindowScroll(0);
  return (
    <StyledHeader sx={{ top: `${top}px` }}>
      <StyledContainer>
        <Nav />
        <AuthButton />
      </StyledContainer>
    </StyledHeader>
  );
};

export default Header;
