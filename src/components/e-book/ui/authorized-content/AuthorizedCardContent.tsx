import React, { FC } from 'react';
import { Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import ProgressBar from '../progress-bar/ProgressBar';
import CardButton from '../button/CardButton';
import { DIFFICULT_GROUP } from '../../cosnstants';
import useTypedSelector from '../../../../hooks/useTypedSelector';
import requestMethodChoiser from '../../../../helpers/requestMethodChoiser';
import {
  changeToHardAction,
  changeToStudiedAction,
  createHardUserWordAction,
  createStudiedUserWordAction,
} from '../../../../redux/store/reducers/userWordsReducer';

interface AuthorizedCardContentProps {
  wordId: string;
  color: string;
  progress: number;
  isDifficult: boolean;
  isStudied: boolean;
  group: number;
}

const AuthorizedCardContent: FC<AuthorizedCardContentProps> = ({
  color,
  progress,
  isDifficult,
  isStudied,
  group,
  wordId,
}) => {
  const dispatch = useDispatch();
  const { userId } = useTypedSelector(store => store.auth.userData);
  const { userWords } = useTypedSelector(store => store.userWords);

  const hardHandler = () => {
    const method = requestMethodChoiser(userWords, wordId);
    if (method === 'POST') {
      dispatch(createHardUserWordAction({ userId, wordId }));
    } else {
      dispatch(
        changeToHardAction({
          userId,
          wordId,
          words: userWords,
        })
      );
    }
  };

  const studiedHandler = () => {
    const method = requestMethodChoiser(userWords, wordId);
    if (method === 'POST') {
      dispatch(createStudiedUserWordAction({ userId, wordId }));
    } else {
      dispatch(
        changeToStudiedAction({
          userId,
          wordId,
          words: userWords,
        })
      );
    }
  };
  return (
    <Box
      sx={{
        display: 'flex',
        mt: 'auto',
        p: '0 1em 1em 1em',
      }}
    >
      {group === DIFFICULT_GROUP ? (
        <CardButton color={color}>Not difficult</CardButton>
      ) : (
        !isStudied &&
        !isDifficult && (
          <CardButton onClick={hardHandler} color={color}>
            Difficult
          </CardButton>
        )
      )}
      {!isStudied && (
        <CardButton color={color} onClick={studiedHandler}>
          Studied
        </CardButton>
      )}
      {!isStudied && (
        <ProgressBar
          color={color}
          progress={progress}
          isDifficult={isDifficult}
        />
      )}
    </Box>
  );
};

export default AuthorizedCardContent;
