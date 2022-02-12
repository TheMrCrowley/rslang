import { Box, CircularProgress } from '@mui/material';
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
  flex: '1 1 auto',
  display: 'flex',
  flexFlow: 'row wrap',
  justifyContent: 'center',
  alignItems: 'stretch',
  alignContent: 'stretch',
  gap: '1em 1em',
  paddingBottom: '1em',
});

const StyledProgress = styled(CircularProgress)({
  color: '#202026',
  alignSelf: 'center',
});

const CardList: FC<CardListProps> = ({ isAuth, userId }) => {
  const { cards, request } = useBookWords(isAuth, userId);
  const words = cards.map(word => {
    return (
      <BasicCard
        key={word.id}
        cardData={word as WordWithCustomProps}
        isAuth={isAuth}
      />
    );
  });
  return (
    <StyledListBox>
      {request ? <StyledProgress size={100} /> : words}
    </StyledListBox>
  );
};

export default CardList;
