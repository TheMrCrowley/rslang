import React, { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { Typography } from '@mui/material';
import useTypedSelector from '../hooks/useTypedSelector';
import { checkAuthAction } from '../redux/store/reducers/authReducer';
import { getUserWordsAction } from '../redux/store/reducers/userWordsReducer';
import { StorageKeys } from '../services/enum';
import LocalStorageService from '../services/localStorageService';
import EBook from './e-book/EBook';
import Layout from './main-page/Layout';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import GamesPage from './main-page/GamesPage';
import SprintPage from './sprint/SprintPage';
import { requestStatisticAction } from '../redux/store/reducers/statisticReducer';
import AudioCallPage from './audiocall/AudioCallPage';
import DemoHomePage from './pages/DemoHomePage';
import { darkBgColor } from './e-book/cosnstants';

const AppRouter = () => {
  const dispatch = useDispatch();
  const authState = useTypedSelector(store => store.auth);
  useEffect(() => {
    if (LocalStorageService.hasItem(StorageKeys.USER_DATA)) {
      dispatch(checkAuthAction());
    }
  }, []);
  useMemo(() => {
    if (authState.isAuth) {
      dispatch(getUserWordsAction({ userId: authState.userData.userId }));
      dispatch(requestStatisticAction({ userId: authState.userData.userId }));
    }
  }, [authState.isAuth]);
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="home" element={<DemoHomePage />} />
        <Route path="registration" element={<RegistrationPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route
          path="book"
          element={
            <EBook
              isAuth={authState.isAuth}
              userId={authState.userData.userId}
            />
          }
        />
        {/* <Route path="games" element={<GamesPage />} /> */}
        {/* <Route path="sprint" element={<SprintPage />} /> */}
        {/* <Route path="audiocall" element={<AudioCallPage />} /> */}
        {/* <Route path="statistics" element={<StatisticsPage />} />
        <Route path="team" element={<TeamPage />} /> */}
        <Route
          path="*"
          element={
            <Typography align="center" variant="h2" sx={{ color: darkBgColor }}>
              Page not found
            </Typography>
          }
        />
      </Route>
    </Routes>
  );
};

export default AppRouter;
