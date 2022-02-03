import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import { Grid } from '@mui/material';
import BookBar from './ui/menu/BookBar';
import CardList from './CardList';
import { CardProp } from './interface';

const theme = createTheme({
  palette: {
    primary: {
      main: red.A700,
    },
  },
});

const EBook = () => {
  const [words, setWords] = useState<CardProp[]>([]);
  const [group, setGroup] = useState<number>(0);
  const [page, setPage] = useState<number>(0);

  useEffect(() => {
    axios
      .get<AxiosResponse<CardProp[]>>('http://localhost:7000/words', {
        params: {
          group,
          page,
        },
      })
      .then(resp => {
        setWords(resp.data as unknown as CardProp[]);
      });
  }, [page, group]);

  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={0.5}>
        <Grid item xs={12}>
          <BookBar setPage={setPage} setGroup={setGroup} group={group} />
        </Grid>
        <Grid item xs={10} style={{ margin: '0 auto' }}>
          <CardList words={words} />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default EBook;
