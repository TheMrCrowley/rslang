import React, { FC } from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import BookBar from './ui/bookbar/BookBar';
import { colors, mainBgColor } from './cosnstants';
import useBookParams from '../../hooks/useBookParams';
import useAuth from '../../hooks/useAuth';
import useLearnedPage from '../../hooks/useLearnedPage';

const StyledBookBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  flex: '1 1 auto',
});

const EBook: FC = () => {
  const { isAuth, userId } = useAuth();
  const { group } = useBookParams();
  const isPageLearned = useLearnedPage(group);
  return (
    <StyledBookBox
      sx={{ backgroundColor: isPageLearned ? mainBgColor : colors[group] }}
    >
      <BookBar isAuth={isAuth} userId={userId} isPageLearned={isPageLearned} />
      <Outlet />
    </StyledBookBox>
  );
};

export default EBook;
