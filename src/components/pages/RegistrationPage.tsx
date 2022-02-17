import {
  Button,
  CircularProgress,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import React, { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from 'react-router-dom';
import { registrationAction } from '../../redux/store/reducers/authReducer';
import AuthPageContainer from '../ui/AuthPageContainer';
import { RegistrationRequestData } from '../../services/auth/authServiceTypes';
import useTypedSelector from '../../hooks/useTypedSelector';

const RegistrationPage: FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { request } = useTypedSelector(store => store.auth);

  const createFormData = (): RegistrationRequestData => ({
    name,
    email,
    password,
  });

  if (request) {
    return <CircularProgress />;
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
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setEmail(e.target.value)
        }
        value={email}
        label="E-mail"
        variant="outlined"
        type="email"
        required
      />
      <Tooltip title="Password must be longer than 8 characters">
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
      </Tooltip>
      <Button
        onClick={() => {
          const user = createFormData();
          dispatch(registrationAction(user));
          navigate('/home');
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
