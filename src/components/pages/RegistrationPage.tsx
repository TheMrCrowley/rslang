import { Button, CircularProgress, TextField, Typography } from '@mui/material';
import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from 'react-router-dom';
import {
  authRequestResetAction,
  registrationAction,
} from '../../redux/store/reducers/authReducer';
import AuthPageContainer from '../ui/AuthPageContainer';
import { RegistrationRequestData } from '../../services/auth/authServiceTypes';
import useInput from '../../hooks/useInput';
import useAuth from '../../hooks/useAuth';

const RegistrationPage: FC = () => {
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { request } = useAuth();
  // TODO remove this to  hook
  const email = useInput('', {
    isEmpty: true,
    isEmail: true,
  });
  const password = useInput('', {
    isEmpty: true,
    minLength: 8,
  });

  useEffect(() => {
    return () => {
      dispatch(authRequestResetAction());
    };
  }, []);

  const registrationHandler = () => {
    const userData: RegistrationRequestData = {
      name,
      email: email.value,
      password: password.value,
    };
    dispatch(registrationAction(userData));
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
            User with this e-mail exists
          </Typography>
          <Button onClick={restartHandler} variant="contained">
            Try again
          </Button>
        </>
      )}
      {request === 'NONE' && (
        <>
          <Typography variant="h4" textAlign="center">
            Sign up
          </Typography>
          <Typography variant="h5" textAlign="center">
            It&apos;s quick and easy
          </Typography>
          <TextField
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
            value={name}
            label="Name"
            variant="outlined"
            type="text"
            required
          />
          <TextField
            onChange={(e: ChangeEvent<HTMLInputElement>) => email.onChange(e)}
            onBlur={email.onBlur}
            value={email.value}
            label="E-mail"
            variant="outlined"
            type="email"
            required
          />
          <TextField
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              password.onChange(e)
            }
            onBlur={password.onBlur}
            value={password.value}
            label="Password"
            variant="outlined"
            type="password"
            required
          />
          <Button
            onClick={registrationHandler}
            disabled={!(email.inputValid && password.inputValid && name.length)}
            variant="contained"
            endIcon={<SendIcon />}
          >
            Registration
          </Button>
        </>
      )}
    </AuthPageContainer>
  );
};

export default RegistrationPage;
