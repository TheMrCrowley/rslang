import { Box, Container, TextField, FormGroup, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import React, { useState } from 'react';
import AuthService from './services/authService';

const App = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const sandHandler = async () => {
    const { data } = await AuthService.registration(name, email, password);
    console.log(data);
  };
  return (
    <Container maxWidth="sm">
      <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }}>
        <FormGroup
          sx={{ rowGap: '1rem', justifyContent: 'center', height: '100%' }}
        >
          <TextField
            onChange={e => setName(e.target.value)}
            value={name}
            label="Name"
            variant="outlined"
            type="text"
            required
          />
          <TextField
            onChange={e => setEmail(e.target.value)}
            value={email}
            label="E-mail"
            variant="outlined"
            type="email"
            required
          />
          <TextField
            onChange={e => setPassword(e.target.value)}
            value={password}
            label="Password"
            variant="outlined"
            type="password"
            required
          />
          <Button
            onClick={() => sandHandler()}
            variant="contained"
            endIcon={<SendIcon />}
          >
            Registration
          </Button>
        </FormGroup>
      </Box>
    </Container>
  );
};

export default App;
