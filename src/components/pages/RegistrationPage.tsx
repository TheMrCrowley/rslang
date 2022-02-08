import { Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import SendIcon from '@mui/icons-material/Send';
import { registrationAction } from '../../redux/store/reducers/authReducer';
import { UserRegistrationData } from '../../services/types';
import AuthPageContainer from '../ui/AuthPageContainer';

const RegistrationPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const [invalidName, setInvalidName] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);

  const validateName = () => {
    if (!name.length || name.length > 10) {
      setInvalidName(true);
    } else {
      setInvalidName(false);
    }
  };

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

  const createFormData = (): UserRegistrationData => ({
    name,
    email,
    password,
  });
  return (
    <AuthPageContainer>
      <Typography variant="h4">Sign up</Typography>
      <Typography variant="h5">It&apos;s quick and easy</Typography>
      <TextField
        error={invalidName}
        helperText={invalidName && 'Please, enter the name!'}
        onBlur={validateName}
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
          const user = createFormData();
          if (!invalidName && !invalidEmail && !invalidPassword) {
            console.log(user);
            dispatch(registrationAction(user));
          }
        }}
        variant="contained"
        endIcon={<SendIcon />}
      >
        Registration
      </Button>
    </AuthPageContainer>
  );
};

export default RegistrationPage;
