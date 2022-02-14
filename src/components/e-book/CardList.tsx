import { Box } from '@mui/material';
import React, { FC } from 'react';
import { styled } from '@mui/material/styles';
import BasicCard from './Card';
import useBookWords from '../../hooks/useBookWords';
import { WordWithCustomProps } from '../../services/words/wordsServiceTypes';
import useAuth from '../../hooks/useAuth';

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

const CardList: FC = () => {
  const { isAuth, userId } = useAuth();
  const { cards } = useBookWords(isAuth, userId);
  const words = cards.map(word => {
    return (
      <BasicCard
        key={word.id}
        cardData={word as WordWithCustomProps}
        isAuth={isAuth}
      />
    );
  });
  return <StyledListBox>{words}</StyledListBox>;
};

export default CardList;
