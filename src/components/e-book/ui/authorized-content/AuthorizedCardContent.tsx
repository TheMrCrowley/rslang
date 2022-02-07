import React, { FC } from 'react';
import { Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import ProgressBar from '../progress-bar/ProgressBar';
import CardButton from '../button/CardButton';
import { DIFFICULT_GROUP } from '../../cosnstants';
import useTypedSelector from '../../../../hooks/useTypedSelector';
import {
  correctAnswerAction,
  setWordDifficultyAction,
} from '../../../../redux/store/reducers/userWordsReducer';
import requestMethodChoiser from '../../../../helpers/requestMethodChoiser';

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
  // console.log(isInLearning && !isStudied);
  const dispatch = useDispatch();
  const { userId } = useTypedSelector(store => store.auth.userData);
  const { userWords } = useTypedSelector(store => store.userWords);
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
          <CardButton
            onClick={() => {
              const method = requestMethodChoiser(userWords, wordId);
              dispatch(
                setWordDifficultyAction({
                  difficulty: 'hard',
                  method,
                  userId,
                  wordId,
                })
              );
            }}
            color={color}
          >
            Difficult
          </CardButton>
        )
      )}
      {!isStudied && (
        <CardButton
          color={color}
          onClick={() => {
            const method = requestMethodChoiser(userWords, wordId);
            dispatch(
              setWordDifficultyAction({
                difficulty: 'studied',
                method,
                userId,
                wordId,
              })
            );
          }}
        >
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
