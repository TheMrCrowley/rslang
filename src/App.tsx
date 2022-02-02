import React, { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  AuthorizationResponse,
  UserLoginData,
  UserRegistrationData,
} from './services/types';
import {
  checkAuthAction,
  logoutAction,
  registrationAction,
  signinAction,
} from './redux/store/reducers/authReducer';
import { RootState } from './redux/store';

const App = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem('userData')) {
      dispatch(
        checkAuthAction(
          JSON.parse(
            localStorage.getItem('userData') as string
          ) as AuthorizationResponse
        )
      );
    }
  }, []);
  console.log(auth);
  const getUserData = (): UserRegistrationData => ({ name, email, password });
  const loginHandler = (): UserLoginData => ({ email, password });
  return (
    <>
      {!auth.isAuth && (
        <>
          <input
            type="text"
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
          />
          <input
            type="email"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
          <input
            type="password"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />
        </>
      )}
      <button
        type="button"
        onClick={() => {
          const userData = getUserData();
          dispatch(registrationAction(userData));
        }}
      >
        Registration
      </button>
      <button
        type="button"
        onClick={() => {
          const userData = loginHandler();
          dispatch(signinAction(userData));
        }}
      >
        Login
      </button>
      <button
        type="button"
        onClick={() => {
          localStorage.removeItem('userData');
          dispatch(logoutAction());
        }}
      >
        Logout
      </button>
      {auth.isAuth && localStorage.getItem('userData')}
    </>
  );
};

export default App;
