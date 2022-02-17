import { Box, CircularProgress } from '@mui/material';
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
  gap: '1em 1em',
  paddingBottom: '1em',
});

const StyledProgress = styled(CircularProgress)`
  color: #202026;
  align-self: center;
`;

const CardList: FC = () => {
  const { isAuth, userId } = useAuth();
  const { cards, request } = useBookWords(isAuth, userId);
  const words = cards.map(word => {
    return (
      <BasicCard
        key={word._id || word.id}
        cardData={word as WordWithCustomProps}
        isAuth={isAuth}
      />
    );
  });
  if (request) {
    return (
      <StyledListBox>
        <StyledProgress size={200} />
      </StyledListBox>
    );
  }
  return <StyledListBox>{words}</StyledListBox>;
};

export default CardList;
