import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import Header from './Header';
import Footer from './Footer';
import isGamePage from '../../helpers/isGamePage';

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
  const loc = useLocation();

  return (
    <LayoutWrapper>
      <TopContentWrapper>
        <Header />
        <Outlet />
      </TopContentWrapper>
      {isGamePage(loc) && <Footer />}
    </LayoutWrapper>
  );
};

export default Layout;
