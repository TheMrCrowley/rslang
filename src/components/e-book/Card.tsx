import React, { FC } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';
import AuthorizedCardContent from './ui/authorized-content/AuthorizedCardContent';
import handleTagInText from '../../helpers/handleTagInText';
import { colors } from './cosnstants';
import Player from './Player';
import WordItem from './Word';
import Meaning from './Meaning';
import Example from './Example';
import { WordWithCustomProps } from '../../services/words/wordsServiceTypes';

export interface BasicCardProps {
  isAuth: boolean;
  cardData: WordWithCustomProps;
}

export const BASE_CONTENT_URL =
  'https://github.com/rolling-scopes-school/react-rslang-be/blob/main/';

const BasicCard: FC<BasicCardProps> = ({ isAuth, cardData }) => {
  // TODO закинуть эти данные в стейт и попробовать обновлять по одной карточке
  const {
    _id,
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
    userWord,
  } = cardData;

  const handledTextMeaning = handleTagInText(textMeaning);
  const handledTextExample = handleTagInText(textExample);

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
        <WordItem
          word={word}
          color={colors[group]}
          isAuth={isAuth}
          userWord={userWord}
        />
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
        <Meaning
          head={handledTextMeaning.head}
          target={handledTextMeaning.target}
          tail={handledTextMeaning.tail}
        />
        <Example
          head={handledTextExample.head}
          target={handledTextExample.target}
          tail={handledTextExample.tail}
        />
        <Divider variant="middle" sx={{ mt: '0.5em', mb: '0.5em' }} />
        <Typography variant="body2" color="text.secondary">
          {textMeaningTranslate}.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {textExampleTranslate}.
        </Typography>
      </CardContent>
      {isAuth && (
        <AuthorizedCardContent
          wordId={_id}
          color={colors[group]}
          progress={userWord?.optional.correctStreak as number}
          isDifficult={userWord?.difficulty === 'hard'}
          isStudied={userWord?.difficulty === 'studied'}
          group={group}
        />
      )}
    </Card>
  );
};
export default BasicCard;
