import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { RootState } from '../../redux/store';
import { logoutAction } from '../../redux/store/reducers/authReducer';
import useWindowWidth from '../../hooks/useWindowWidth';

const AuthButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authState = useSelector((store: RootState) => store.auth);
  const width = useWindowWidth();
  const loginButton = () => {
    return (
      <Button
        variant="outlined"
        sx={{ color: '#000000', borderColor: '#000000' }}
        onClick={() => navigate('/login')}
      >
        {width > 660 ? 'LOGIN' : <LoginIcon />}
      </Button>
    );
  };
  const logoutButton = () => {
    return (
      <Button
        variant="outlined"
        sx={{ color: '#000000', borderColor: '#000000' }}
        onClick={() => dispatch(logoutAction())}
      >
        {width > 660 ? 'LOG OUT' : <LogoutIcon />}
      </Button>
    );
  };
  return !authState.isAuth ? loginButton() : logoutButton();
};

export default AuthButton;
