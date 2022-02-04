import React, { useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import { Grid } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import BookBar from './ui/menu/BookBar';
import CardList from './CardList';
import { RootState } from '../../redux/store';
import { requestWordsAction } from '../../redux/store/reducers/wordsReducer';

const theme = createTheme({
  palette: {
    primary: {
      main: red.A700,
    },
  },
});

const EBook = () => {
  const [group, setGroup] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const wordsState = useSelector((state: RootState) => state.words);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestWordsAction({ group, page }));
  }, [page, group]);

  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={0.5}>
        <Grid item xs={12}>
          <BookBar setPage={setPage} setGroup={setGroup} group={group} />
        </Grid>
        <Grid item xs={10} style={{ margin: '0 auto' }}>
          <CardList words={wordsState.words} />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default EBook;
