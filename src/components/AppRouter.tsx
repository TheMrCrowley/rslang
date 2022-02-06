import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { signinAfterRegistration } from '../redux/store/reducers/authReducer';
import Layout from './main-page/Layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';

const AppRouter = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem('userData')) {
      dispatch(signinAfterRegistration());
    }
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="home" element={<HomePage />} />
        <Route path="registration" element={<RegistrationPage />} />
        <Route path="login" element={<LoginPage />} />
        {/* <Route path="book" element={<Ebook />} />
        <Route path="games" element={<GamesPage />} />
        <Route path="statistics" element={<StatisticsPage />} />
        <Route path="team" element={<TeamPage />} /> */}
        <Route path="*" element={<h1>Not found</h1>} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
