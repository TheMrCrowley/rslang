import React, { FC } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Divider } from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import AuthorizedCardContent from './ui/authorized-content/AuthorizedCardContent';
import handleTagInText from './utils';
import { IWord } from '../../services/types';
// **** TO DO ***** join isAuth to original source
import { colors, isAuth, isDifficult, isStudied } from './cosnstants';
import Player from './Player';

export interface BasicCardProps {
  cardData: IWord;
}

const BasicCard: FC<BasicCardProps> = ({ cardData }) => {
  const {
    group,
    image,
    word,
    audio,
    audioMeaning,
    audioExample,
    textMeaning,
    textExample,
    transcription,
    wordTranslate,
    textExampleTranslate,
    textMeaningTranslate,
  } = cardData;
  const handledTextMeaning = handleTagInText(textMeaning);
  const handledTextExample = handleTagInText(textExample);

  // **** TO DO ***** join progress to original source
  const progress = Math.floor(Math.random() * 5);
  const BASE_CONTENT_URL =
    'https://github.com/rolling-scopes-school/react-rslang-be/blob/main/';

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: 380,
        height: 'auto',
      }}
    >
      <CardMedia
        component="img"
        height="140"
        image={`${BASE_CONTENT_URL}/${image}?raw=true`}
      />
      <CardContent sx={{ textAlign: 'right' }}>
        {isAuth ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            {isDifficult && (
              <FitnessCenterIcon htmlColor={colors[group]} fontSize="large" />
            )}
            {isStudied && (
              <SelfImprovementIcon
                fontSize="large"
                htmlColor={colors[group]}
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
        <Typography
          gutterBottom
          variant="h6"
          component="span"
          sx={{ textTransform: 'capitalize' }}
        >
          {wordTranslate} {transcription}
          <Player
            urls={[audio, audioMeaning, audioExample].map(
              url => `${BASE_CONTENT_URL}/${url}?raw=true`
            )}
          />
        </Typography>
        <Box sx={{ mt: '0.5em' }}>
          <Typography gutterBottom variant="body2" component="span">
            {handledTextMeaning.head}
          </Typography>
          <Typography
            sx={{ fontWeight: 'bold' }}
            gutterBottom
            variant="body2"
            component="span"
          >
            {handledTextMeaning.target}
          </Typography>
          <Typography gutterBottom variant="body2" component="span">
            {handledTextMeaning.tail}.
          </Typography>
        </Box>
        <Box sx={{ mt: '0.5em' }}>
          <Typography gutterBottom variant="body2" component="span">
            {handledTextExample.head}
          </Typography>
          <Typography
            sx={{ fontStyle: 'italic' }}
            gutterBottom
            variant="body2"
            component="span"
          >
            {handledTextExample.target}
          </Typography>
          <Typography gutterBottom variant="body2" component="span">
            {handledTextExample.tail}.
          </Typography>
        </Box>{' '}
        <Divider variant="middle" sx={{ mt: '0.5em', mb: '0.5em' }} />
        <Typography variant="body2" color="text.secondary">
          {textMeaningTranslate}.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {textExampleTranslate}.
        </Typography>
      </CardContent>
      {isAuth ? (
        <AuthorizedCardContent color={colors[group]} progress={progress} />
      ) : null}
    </Card>
  );
};
export default BasicCard;
