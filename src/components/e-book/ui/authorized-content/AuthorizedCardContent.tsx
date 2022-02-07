import React, { FC } from 'react';
import { Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import ProgressBar from '../progress-bar/ProgressBar';
import CardButton from '../button/CardButton';
import { DIFFICULT_GROUP } from '../../cosnstants';
import useTypedSelector from '../../../../hooks/useTypedSelector';
import { setWordDifficultyAction } from '../../../../redux/store/reducers/userWordsReducer';

interface AuthorizedCardContentProps {
  wordId: string;
  color: string;
  progress: number;
  isDifficult: boolean;
  isStudied: boolean;
  group: number;
  isInLearning: boolean;
}

const AuthorizedCardContent: FC<AuthorizedCardContentProps> = ({
  color,
  progress,
  isDifficult,
  isStudied,
  group,
  isInLearning,
  wordId,
}) => {
  // console.log(isInLearning && !isStudied);
  const dispatch = useDispatch();
  const { userId } = useTypedSelector(store => store.auth.userData);
  const { userWords } = useTypedSelector(store => store.userWords);
  const methodHandler = () => {
    return userWords.find(word => word.wordId === wordId) ? 'PUT' : 'POST';
  };
  console.log(wordId);
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
              const method = methodHandler();
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
            const method = methodHandler();
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
      {isInLearning && !isStudied && (
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
