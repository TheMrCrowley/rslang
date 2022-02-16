import React, { FC } from 'react';
import { Box, Tooltip, Typography } from '@mui/material';
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
            <Tooltip title="This word marked as difficult">
              <FitnessCenterIcon htmlColor={color} fontSize="large" />
            </Tooltip>
          )}
          {userWord?.difficulty === 'studied' && (
            <Tooltip title="This word has been learned">
              <SelfImprovementIcon fontSize="large" htmlColor={color} />
            </Tooltip>
          )}
          {userWord?.difficulty === 'learning' && (
            <Tooltip title="Correct answers in games/total answers">
              <Typography color={color} variant="h5">
                {userWord.optional.totalCorrectAnswers}/
                {userWord.optional.totalAnswers}
              </Typography>
            </Tooltip>
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
