import React, { useState } from 'react';
import { Button } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Nav from './Nav';
import { RootState } from '../../redux/store';
import { logoutAction } from '../../redux/store/reducers/authReducer';

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
  const navigate = useNavigate();
  const authState = useSelector((store: RootState) => store.auth);
  const dispatch = useDispatch();
  const [navState, setNavState] = useState<boolean>(false);
  const handleDrawerOpen = () => {
    setNavState(true);
  };

  const handleDrawerClose = () => {
    setNavState(false);
  };
  console.log(authState);
  return (
    <AppBar position="fixed" open={navState}>
      <Toolbar sx={{ justifyContent: 'flex-end' }}>
        <Nav
          isOpen={navState}
          close={handleDrawerClose}
          open={handleDrawerOpen}
        />
        <Typography
          variant="h3"
          sx={{
            position: 'fixed',
            left: '50%',
            transform: 'translateX(-50%)',
            color: '#fecb00',
          }}
        >
          RS-LANG
        </Typography>
        {!authState.isAuth ? (
          <Button
            variant="outlined"
            sx={{ color: '#fecb00', borderColor: '#fecb00' }}
            onClick={() => navigate('/login')}
          >
            LOGIN
          </Button>
        ) : (
          <Button
            variant="outlined"
            sx={{ color: '#fecb00', borderColor: '#fecb00' }}
            onClick={() => dispatch(logoutAction())}
          >
            LOG OUT
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
