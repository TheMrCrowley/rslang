import React, { FC } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Divider } from '@mui/material';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import { API_URL } from '../../services/api';
import { IWord } from '../../services/types';
import handleTagInText from './utils';

export interface BasicCardProps {
  cardData: IWord;
}

const BasicCard: FC<BasicCardProps> = ({ cardData }) => {
  const {
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

  function runAudio() {
    const wordAudio = new Audio(`${API_URL}/${audio}`);
    wordAudio.play();
  }

  return (
    <Card sx={{ width: 380, height: 'auto' }}>
      <CardMedia component="img" height="140" image={`${API_URL}/${image}`} />
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
          <Typography gutterBottom variant="body2" component="span">
            {handledTextExample.head}
          </Typography>
          <Typography gutterBottom variant="body2" component="span">
            {handledTextExample.target}
          </Typography>
          <Typography gutterBottom variant="body2" component="span">
            {handledTextExample.tail}
          </Typography>
        </Box>
        <Box>
          <Typography gutterBottom variant="body1" component="span">
            {handledTextMeaning.head}
          </Typography>
          <Typography gutterBottom variant="body1" component="span">
            {handledTextMeaning.target}
          </Typography>
          <Typography gutterBottom variant="body1" component="span">
            {handledTextMeaning.tail}
          </Typography>
        </Box>
        <Divider variant="middle" />
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
