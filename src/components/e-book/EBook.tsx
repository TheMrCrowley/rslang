import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box } from '@mui/material';
import BookBar from './ui/bookbar/BookBar';
import CardList from './CardList';
import { RootState } from '../../redux/store';
import {
  requestWordsAction,
  requestWordsWithPropsAction,
} from '../../redux/store/reducers/wordsReducer';
import { colors } from './cosnstants';
import useTypedSelector from '../../hooks/useTypedSelector';
import { getUserWordsAction } from '../../redux/store/reducers/userWordsReducer';

const EBook = () => {
  const [group, setGroup] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const authState = useTypedSelector(store => store.auth);
  const wordsState = useSelector((state: RootState) => state.words);
  const { userWords } = useTypedSelector(store => store.userWords);
  const dispatch = useDispatch();

  useEffect(() => {
    if (authState.isAuth) {
      dispatch(
        requestWordsWithPropsAction({
          group,
          page,
          userId: authState.userData.userId,
        })
      );
      dispatch(getUserWordsAction({ userId: authState.userData.userId }));
    } else {
      dispatch(requestWordsAction({ group, page }));
    }
  }, [page, group]);
  return (
    <Box sx={{ backgroundColor: colors[group] }}>
      <BookBar setPage={setPage} setGroup={setGroup} group={group} />
      <CardList words={wordsState.words} />
    </Box>
  );
};

export default EBook;
