import { Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from 'react-router-dom';
import { signinAction } from '../../redux/store/reducers/authReducer';
import AuthPageContainer from '../ui/AuthPageContainer';
import { LoginRequestData } from '../../services/auth/authServiceTypes';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const createUserData = (): LoginRequestData => ({
    email,
    password,
  });
  return (
    <AuthPageContainer>
      <Typography variant="h4">Log in to RS Lang</Typography>
      <TextField
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
          dispatch(signinAction(user));
          navigate('/home');
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
