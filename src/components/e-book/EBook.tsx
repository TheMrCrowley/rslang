import React, { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box } from '@mui/material';
import BookBar from './ui/bookbar/BookBar';
import CardList from './CardList';
import {
  requestWordsAction,
  requestWordsWithPropsAction,
} from '../../redux/store/reducers/wordsReducer';
import { colors } from './cosnstants';
import useTypedSelector from '../../hooks/useTypedSelector';

interface EBookProps {
  isAuth: boolean;
  userId?: string;
}

const EBook: FC<EBookProps> = ({ isAuth, userId }) => {
  const [group, setGroup] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const { words } = useTypedSelector(state => state.words);
  const { userWords } = useTypedSelector(store => store.userWords);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuth && userId) {
      dispatch(
        requestWordsWithPropsAction({
          group,
          page,
          userId,
        })
      );
    } else {
      dispatch(requestWordsAction({ group, page }));
    }
  }, [page, group, isAuth, userWords]);

  return (
    <Box
      sx={{
        backgroundColor: colors[group],
        pt: '4.25em',
        pl: '3.5rem',
      }}
    >
      <BookBar setPage={setPage} setGroup={setGroup} group={group} />
      <CardList words={words} />
    </Box>
  );
};

export default EBook;
