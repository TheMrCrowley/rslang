import React, { FC } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Divider } from '@mui/material';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import { IWord } from '../../services/types';
import handleTagInText from './utils';
import AuthorizedCardContent from './ui/authorized-content/AuthorizedCardContent';
// **** TO DO ***** join isAuth to original source
import { colors, isAuth } from './cosnstants';

export interface BasicCardProps {
  cardData: IWord;
}

const BasicCard: FC<BasicCardProps> = ({ cardData }) => {
  const {
    group,
    image,
    word,
    audio,
    // audioMeaning,
    // audioExample,
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

  function runAudio() {
    console.log(`${BASE_CONTENT_URL}/${audio}?raw=true`);
    const wordAudio = new Audio(`${BASE_CONTENT_URL}/${audio}?raw=true`);

    wordAudio.play();
  }

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
        <Typography
          gutterBottom
          variant="h5"
          component="h4"
          sx={{ textTransform: 'capitalize' }}
        >
          {word}
        </Typography>
        <Typography
          gutterBottom
          variant="h6"
          component="span"
          sx={{ textTransform: 'capitalize' }}
        >
          {wordTranslate} {transcription}
          <RecordVoiceOverIcon onClick={runAudio} />
        </Typography>
        <Box>
          <Typography gutterBottom variant="subtitle1" component="span">
            {handledTextMeaning.head}
          </Typography>
          <Typography
            sx={{ fontWeight: 'bold' }}
            gutterBottom
            variant="subtitle1"
            component="span"
          >
            {handledTextMeaning.target}
          </Typography>
          <Typography gutterBottom variant="subtitle1" component="span">
            {handledTextMeaning.tail}.
          </Typography>
        </Box>
        <Box>
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
        <Divider variant="middle" />
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
