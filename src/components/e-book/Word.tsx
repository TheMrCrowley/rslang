import React, { FC } from 'react';
import { Box, Typography } from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import { UserWord } from '../../services/user-words/userWordsServiceTypes';

interface WordProps {
  word: string;
  color: string;
  isAuth: boolean;
  userWord?: UserWord;
}

const WordItem: FC<WordProps> = ({ word, color, isAuth, userWord }) => {
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {isAuth ? (
        <Box
          sx={{
            display: 'flex',
            width: '100%',
          }}
        >
          {userWord?.difficulty === 'hard' && (
            <FitnessCenterIcon htmlColor={color} fontSize="large" />
          )}
          {userWord?.difficulty === 'studied' && (
            <SelfImprovementIcon fontSize="large" htmlColor={color} />
          )}
          {userWord?.difficulty === 'learning' && (
            <Typography color={color} variant="h5">
              {userWord.optional.totalCorrectAnswers}/
              {userWord.optional.totalAnswers}
            </Typography>
          )}
          <Typography
            gutterBottom
            variant="h4"
            component="h4"
            sx={{ textTransform: 'capitalize', mb: '0', ml: 'auto' }}
          >
            {word}
          </Typography>
        </Box>
      ) : (
        <Typography
          gutterBottom
          variant="h4"
          component="h4"
          align="right"
          sx={{ textTransform: 'capitalize' }}
        >
          {word}
        </Typography>
      )}
    </>
  );
};

export default WordItem;
