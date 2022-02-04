import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box } from '@mui/material';
import BookBar from './ui/menu/BookBar';
import CardList from './CardList';
import { RootState } from '../../redux/store';
import { requestWordsAction } from '../../redux/store/reducers/wordsReducer';
import { colors } from './cosnstants';

const EBook = () => {
  const [group, setGroup] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const wordsState = useSelector((state: RootState) => state.words);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestWordsAction({ group, page }));
  }, [page, group]);

  return (
    <Box sx={{ backgroundColor: colors[group] }}>
      <BookBar setPage={setPage} setGroup={setGroup} group={group} />
      <CardList words={wordsState.words} />
    </Box>
  );
};

export default EBook;
