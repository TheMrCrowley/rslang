import React, { FC, useEffect } from 'react';
import { Box } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import BookBar from './ui/bookbar/BookBar';
import { colors } from './cosnstants';
import useBookParams from '../../hooks/useBookParams';
import useTypedSelector from '../../hooks/useTypedSelector';

interface EBookProps {
  isAuth: boolean;
  userId?: string;
}

const StyledBookBox = styled(Box)({
  paddingTop: '4.25em',
  paddingLeft: '3.5rem',
});

const EBook: FC<EBookProps> = ({ isAuth, userId }) => {
  const { group } = useBookParams();
  const { userWords } = useTypedSelector(store => store.userWords);
  console.log(userWords);
  const navigate = useNavigate();
  useEffect(() => {
    navigate('1/1');
  }, [navigate]);
  return (
    <StyledBookBox sx={{ backgroundColor: colors[group] }}>
      <BookBar isAuth={isAuth} userId={userId} />
      <Outlet />
    </StyledBookBox>
  );
};

export default EBook;
