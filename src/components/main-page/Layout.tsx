import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';

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

const Layout = () => {
  return (
    <LayoutWrapper>
      <TopContentWrapper>
        <Header />
        <Main>
          <Outlet />
        </Main>
      </TopContentWrapper>
      <Footer />
    </LayoutWrapper>
  );
};

export default Layout;
