import { Box } from '@mui/material';
import React, { FC } from 'react';
import { styled } from '@mui/material/styles';
import BasicCard from './Card';
import useBookWords from '../../hooks/useBookWords';
import { WordWithCustomProps } from '../../services/words/wordsServiceTypes';

interface CardListProps {
  isAuth: boolean;
  userId: string;
}

const StyledListBox = styled(Box)({
  display: 'flex',
  flexFlow: 'row wrap',
  justifyContent: 'center',
  alignItems: 'stretch',
  alignContent: 'stretch',
  gap: '1em 1em',
  pb: '1em',
});

const CardList: FC<CardListProps> = ({ isAuth, userId }) => {
  const words = useBookWords(isAuth, userId);
  const cards = words.map(word => {
    return (
      <BasicCard
        key={word.id}
        cardData={word as WordWithCustomProps}
        isAuth={isAuth}
      />
    );
  });
  return <StyledListBox>{cards}</StyledListBox>;
};

export default CardList;
