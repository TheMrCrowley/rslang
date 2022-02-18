import {
  Button,
  CircularProgress,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import React, { ChangeEvent, FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from 'react-router-dom';
import {
  authRequestResetAction,
  registrationAction,
} from '../../redux/store/reducers/authReducer';
import AuthPageContainer from '../ui/AuthPageContainer';
import { RegistrationRequestData } from '../../services/auth/authServiceTypes';
import useTypedSelector from '../../hooks/useTypedSelector';
import useInput from '../../hooks/useInput';

const RegistrationPage: FC = () => {
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { request } = useTypedSelector(store => store.auth);

  const email = useInput('', {
    isEmpty: true,
    isEmail: true,
  });
  const password = useInput('', {
    isEmpty: true,
    minLength: 8,
  });

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

  if (request === 'EXIST') {
    return <CircularProgress />;
  }
  if (request === 'ERROR') {
    return (
      <AuthPageContainer>
        <Typography textAlign="center">User with this e-mail exists</Typography>
        <Button onClick={restartHandler} variant="contained">
          Try again
        </Button>
      </AuthPageContainer>
    );
  }
  return (
    <AuthPageContainer>
      <Typography variant="h4">Sign up</Typography>
      <Typography variant="h5">It&apos;s quick and easy</Typography>
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
      <Tooltip title="Password must be longer than 8 characters">
        <TextField
          onChange={(e: ChangeEvent<HTMLInputElement>) => password.onChange(e)}
          onBlur={password.onBlur}
          value={password.value}
          label="Password"
          variant="outlined"
          type="password"
          required
        />
      </Tooltip>
      <Button
        onClick={registrationHandler}
        disabled={!(email.inputValid && password.inputValid)}
        variant="contained"
        endIcon={<SendIcon />}
      >
        Registration
      </Button>
    </AuthPageContainer>
  );
};

export default RegistrationPage;
