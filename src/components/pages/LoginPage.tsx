import { Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import SendIcon from '@mui/icons-material/Send';
import { signinAction } from '../../redux/store/reducers/authReducer';
import { UserLoginData } from '../../services/types';
import AuthPageContainer from '../ui/AuthPageContainer';

const LoginPage = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);

  const validateEmail = () => {
    if (!email.length) {
      setInvalidEmail(true);
    } else {
      setInvalidEmail(false);
    }
  };

  const validatePassword = () => {
    if (!password.length || password.length > 8) {
      setInvalidPassword(true);
    } else {
      setInvalidPassword(false);
    }
  };

  const createUserData = (): UserLoginData => ({
    email,
    password,
  });
  return (
    <AuthPageContainer>
      <Typography variant="h4">Log in to RS Lang</Typography>
      <TextField
        error={invalidEmail}
        helperText={invalidEmail && 'Please, enter your e-mail'}
        onBlur={validateEmail}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setEmail(e.target.value)
        }
        value={email}
        label="E-mail"
        variant="outlined"
        type="email"
        required
      />
      <TextField
        error={invalidPassword}
        helperText={invalidPassword && 'Password should be less than 8 chars.'}
        onBlur={validatePassword}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setPassword(e.target.value)
        }
        value={password}
        label="Password"
        variant="outlined"
        type="password"
        required
      />
      <Button
        onClick={() => {
          const user = createUserData();
          if (!invalidEmail && !invalidPassword) {
            dispatch(signinAction(user));
          }
        }}
        variant="contained"
        endIcon={<SendIcon />}
      >
        Login
      </Button>
    </AuthPageContainer>
  );
};

export default LoginPage;
