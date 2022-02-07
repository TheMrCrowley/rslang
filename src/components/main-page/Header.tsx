import React, { useState } from 'react';
import Toolbar from '@mui/material/Toolbar';
import { styled } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Nav from './Nav';
import AuthButton from './AuthButton';

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const Header = () => {
  const [navState, setNavState] = useState<boolean>(false);
  const handleDrawerOpen = () => {
    setNavState(true);
  };

  const handleDrawerClose = () => {
    setNavState(false);
  };
  return (
    <AppBar
      position="fixed"
      open={navState}
      sx={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', boxShadow: 'none' }}
    >
      <Toolbar>
        <Nav
          isOpen={navState}
          close={handleDrawerClose}
          open={handleDrawerOpen}
        />
        <AuthButton />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
