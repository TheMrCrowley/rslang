import React, { FC } from 'react';
import { Box, Typography } from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';

interface WordProps {
  word: string;
  color: string;
  isAuth: boolean;
  isDifficult: boolean;
  isStudied: boolean;
}

const Word: FC<WordProps> = ({
  word,
  color,
  isAuth,
  isDifficult,
  isStudied,
}) => {
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {isAuth && (isDifficult || isStudied) ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          {isDifficult && (
            <FitnessCenterIcon htmlColor={color} fontSize="large" />
          )}
          {isStudied && (
            <SelfImprovementIcon
              fontSize="large"
              htmlColor={color}
              sx={{ mr: 'auto' }}
            />
          )}
          <Typography
            gutterBottom
            variant="h4"
            component="h4"
            sx={{ textTransform: 'capitalize', mb: '0' }}
          >
            {word}
          </Typography>
        </Box>
      ) : (
        <Typography
          gutterBottom
          variant="h4"
          component="h4"
          sx={{ textTransform: 'capitalize' }}
        >
          {word}
        </Typography>
      )}
    </>
  );
};

export default Word;
