import React, { FC } from 'react';
import { Box } from '@mui/material';
import ProgressBar from '../progress-bar/ProgressBar';
import CardButton from '../button/CardButton';
import { DIFFICULT_GROUP } from '../../cosnstants';

interface AuthorizedCardContentProps {
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
}) => {
  // console.log(isInLearning && !isStudied);
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
        !isDifficult && <CardButton color={color}>Difficult</CardButton>
      )}
      {!isStudied && <CardButton color={color}>Studied</CardButton>}
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
