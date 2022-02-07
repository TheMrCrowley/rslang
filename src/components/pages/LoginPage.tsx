import { Button, Container, FormGroup, TextField, Box } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import SendIcon from '@mui/icons-material/Send';
// import { styled } from '@mui/material/styles';
import { signinAction } from '../../redux/store/reducers/authReducer';
import { UserLoginData } from '../../services/types';

// const StyledFormGroup = styled(FormGroup)`
//   width: 50%;
//   row-gap: 1rem;
// `;

// const StyledContainer = styled(Container)`
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

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
    <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: '1em' }}>
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
    </Box>
  );
};

export default LoginPage;
