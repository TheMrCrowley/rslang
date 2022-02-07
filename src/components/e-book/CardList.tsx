import { Box } from '@mui/material';
import React, { FC } from 'react';
import BasicCard from './Card';
import { CardListProps } from './interface';

const CardList: FC<CardListProps> = ({ words }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'center',
        alignItems: 'stretch',
        alignContent: 'stretch',
        gap: '1em 1em',
      }}
    >
      {words.map(word => {
        return <BasicCard key={word.id} cardData={word} />;
      })}
    </Box>
  );
};

export default CardList;
