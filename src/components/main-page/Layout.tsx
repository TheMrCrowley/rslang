import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import Header from './Header';
import Footer from './Footer';

const LayoutWrapper = styled(Box)({
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'stretch',
  flexDirection: 'column',
});

const TopContentWrapper = styled(Box)({
  flex: '1 1 auto',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
});

const StyledMain = styled('main')`
  padding: 64px 0 0 0;
  flex: 1 1 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Layout = () => {
  return (
    <LayoutWrapper>
      <TopContentWrapper>
        <Header />
        <StyledMain>
          <Outlet />
        </StyledMain>
        <Footer />
      </TopContentWrapper>
    </LayoutWrapper>
  );
};

export default Layout;
