import { Button, CircularProgress, TextField, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from 'react-router-dom';
import {
  authRequestResetAction,
  signinAction,
} from '../../redux/store/reducers/authReducer';
import AuthPageContainer from '../ui/AuthPageContainer';
import { LoginRequestData } from '../../services/auth/authServiceTypes';
import useInput from '../../hooks/useInput';
import useAuth from '../../hooks/useAuth';

const LoginPage = () => {
  const { request } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const email = useInput('', { isEmpty: true, isEmail: true });
  const password = useInput('', { isEmpty: true, minLength: 8 });

  useEffect(() => {
    return () => {
      dispatch(authRequestResetAction());
    };
  }, []);

  const loginHandler = () => {
    const userData: LoginRequestData = {
      email: email.value,
      password: password.value,
    };
    dispatch(signinAction(userData));
  };

  const restartHandler = () => {
    dispatch(authRequestResetAction());
  };

  if (request === 'SUCCESS') {
    navigate(-1);
  }
  return (
    <AuthPageContainer>
      {request === 'EXIST' && <CircularProgress sx={{ alignSelf: 'center' }} />}
      {request === 'ERROR' && (
        <>
          <Typography textAlign="center">
            Incorrect email or password
          </Typography>
          <Button onClick={restartHandler} variant="contained">
            Try again
          </Button>
        </>
      )}
      {request === 'NONE' && (
        <>
          <Typography variant="h4">Log in to RS Lang</Typography>
          <TextField
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              email.onChange(e)
            }
            value={email.value}
            label="E-mail"
            variant="outlined"
            type="email"
            required
          />
          <TextField
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              password.onChange(e)
            }
            value={password.value}
            label="Password"
            variant="outlined"
            type="password"
            required
          />
          <Button
            onClick={loginHandler}
            variant="contained"
            endIcon={<SendIcon />}
            disabled={!(email.inputValid && password.inputValid)}
          >
            Login
          </Button>
        </>
      )}
    </AuthPageContainer>
  );
};

export default LoginPage;
