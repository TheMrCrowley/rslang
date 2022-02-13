import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import { RootState } from '../../redux/store';
import { logoutAction } from '../../redux/store/reducers/authReducer';

const AuthButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authState = useSelector((store: RootState) => store.auth);
  return (
    <Box>
      {!authState.isAuth ? (
        <Button
          variant="outlined"
          sx={{ color: '#000000', borderColor: '#000000' }}
          onClick={() => navigate('/login')}
        >
          LOGIN
        </Button>
      ) : (
        <Button
          variant="outlined"
          sx={{ color: '#000000', borderColor: '#000000' }}
          onClick={() => dispatch(logoutAction())}
        >
          LOG OUT
        </Button>
      )}
    </Box>
  );
};

export default AuthButton;
