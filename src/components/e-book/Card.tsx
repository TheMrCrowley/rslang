import React, { FC } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardProps } from './interface';
import SoundButton from './ui/play-button/PlayButton';

const BasicCard: FC<CardProps> = ({ cardData }) => {
  const {
    image,
    word,
    // audio,
    // audioMeaning,
    // audioExample,
    textMeaning,
    textExample,
    transcription,
    wordTranslate,
    textExampleTranslate,
    textMeaningTranslate,
  } = cardData;
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={`http://localhost:7000/${image}`}
      />
      <CardContent sx={{ textAlign: 'right' }}>
        <Typography gutterBottom variant="h5" component="h4">
          {word}
        </Typography>
        <Typography gutterBottom variant="h6" component="span">
          {wordTranslate} {transcription}
          <SoundButton />
        </Typography>
        <Typography gutterBottom variant="body2" component="p">
          {textMeaning}
        </Typography>
        <Typography gutterBottom variant="body2" component="p">
          {textExample}
        </Typography>
        <hr />
        <Typography variant="body2" color="text.secondary">
          {textMeaningTranslate}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {textExampleTranslate}
        </Typography>
      </CardContent>
    </Card>
  );
};
export default BasicCard;
