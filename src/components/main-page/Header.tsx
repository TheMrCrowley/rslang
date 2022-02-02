import { Button, ButtonGroup } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import MiniDrawer from './Nav';

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: '10%',
    width: '90%',
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
    <AppBar position="fixed" open={navState}>
      <Toolbar>
        <MiniDrawer
          isOpen={navState}
          close={handleDrawerClose}
          open={handleDrawerOpen}
        />
        <Typography variant="h3">RS-LANG</Typography>
        <ButtonGroup sx={{ columnGap: '1rem' }}>
          <Button variant="contained">SIGN UP</Button>
          <Button variant="outlined">LOGIN</Button>
        </ButtonGroup>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
