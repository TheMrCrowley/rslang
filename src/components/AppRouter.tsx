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
import DemoHomePage from './pages/DemoHomePage';
import { darkBgColor } from './e-book/cosnstants';
import {
  requestStatisticAction,
  saveStatisticAction,
} from '../redux/store/reducers/statisticReducer';
import AudioCallPage from './audiocall/AudioCallPage';
import CardList from './e-book/CardList';
import StatisticPage from './statistic/StatisticPage';
import useAuth from '../hooks/useAuth';

const AppRouter = () => {
  const dispatch = useDispatch();
  const { isAuth, userId } = useAuth();
  const statisticState = useTypedSelector(store => store.statistic);

  useEffect(() => {
    if (LocalStorageService.hasItem(StorageKeys.USER_DATA)) {
      dispatch(checkAuthAction());
    }
  }, []);

  useEffect(() => {
    if (isAuth && userId) {
      if (Object.keys(statisticState.wordStatistic).length) {
        dispatch(
          saveStatisticAction({
            newStatistic: statisticState,
            userId,
          })
        );
      }
    }
  }, [statisticState]);

  useMemo(() => {
    if (isAuth) {
      dispatch(getUserWordsAction({ userId }));
      dispatch(requestStatisticAction({ userId }));
    }
  }, [isAuth]);
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<DemoHomePage />} />
        <Route path="home" element={<DemoHomePage />} />
        <Route path="registration" element={<RegistrationPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="book/" element={<EBook />}>
          <Route path=":group/:page" element={<CardList />} />
        </Route>
        <Route path="games" element={<GamesPage />} />
        <Route path="games/sprint" element={<SprintPage />} />
        <Route path="games/audiocall" element={<AudioCallPage />} />
        <Route path="statistics" element={<StatisticPage />} />
        {/* <Route path="team" element={<TeamPage />} /> *!/ */}
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
