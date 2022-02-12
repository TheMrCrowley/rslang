import React, { FC } from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import BookBar from './ui/bookbar/BookBar';
import { colors } from './cosnstants';
import useBookParams from '../../hooks/useBookParams';

interface EBookProps {
  isAuth: boolean;
  userId?: string;
}

const StyledBookBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  flex: '1 1 auto',
  paddingTop: '4.25em',
  paddingLeft: '3.5rem',
});

const EBook: FC<EBookProps> = ({ isAuth, userId }) => {
  const { group } = useBookParams();
  return (
    <StyledBookBox sx={{ backgroundColor: colors[group] }}>
      <BookBar isAuth={isAuth} userId={userId} />
      <Outlet />
    </StyledBookBox>
  );
};

export default EBook;
