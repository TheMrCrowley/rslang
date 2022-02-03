import { Grid } from '@mui/material';
import React, { FC } from 'react';
import BasicCard from './Card';
import { CardListProps } from './interface';

const CardList: FC<CardListProps> = ({ words }) => {
  return (
    <Grid container spacing={0.5} style={{ justifyContent: 'space-between' }}>
      {words.map(word => {
        return (
          <Grid key={word.id} item xs={4}>
            <BasicCard key={word.id} cardData={word} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default CardList;
