import React, { FC } from 'react';
import { Box, Typography } from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';

type Attempts = {
  total: number;
  successful: number;
};

interface WordProps {
  word: string;
  color: string;
  isAuth: boolean;
  isDifficult: boolean;
  isStudied: boolean;
  attempts: Attempts;
}

const Word: FC<WordProps> = ({
  word,
  color,
  isAuth,
  isDifficult,
  isStudied,
  attempts,
}) => {
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
          {isDifficult && (
            <FitnessCenterIcon htmlColor={color} fontSize="large" />
          )}
          {isStudied && (
            <SelfImprovementIcon fontSize="large" htmlColor={color} />
          )}
          <Typography color={color} variant="h5">
            {attempts.successful}/{attempts.total}
          </Typography>
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

export default Word;
