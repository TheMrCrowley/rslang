import * as React from 'react';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { Button, Tooltip, Typography } from '@mui/material';
import BasicSelect from '../select/BasicSelect';
import PaginationRanges from '../pagination/PaginationRanges';
import { DIFFICULT_GROUP } from '../../cosnstants';
import useBookParams from '../../../../hooks/useBookParams';
import useSprintFromBook from '../../../sprint/useSprintFromBook';
import useAudiocallFromBook from '../../../audiocall/useAudiocallFromBook';

interface ResponsiveAppBarProps {
  isAuth: boolean;
  userId?: string;
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#ffffff',
    },
  },
});

const StyledBarContainer = styled(Container)({
  display: 'flex',
  justifyContent: 'space-evenly',
  alignItems: 'center',
  height: '4.5em',
});

const GameButton = styled(Button)`
  margin-right: 0.5rem;
  color: #202026;
  background-color: white;
  border-radius: 2rem;
  &: hover {
    color: white;
    background-color: #202026;
  }
  @media (max-width: 520px) {
    font-size: 11px;
  }
`;

const BookBar: React.FC<ResponsiveAppBarProps> = ({
  isAuth,
  children,
  userId,
}) => {
  const { group, page } = useBookParams();
  const sprintHandler = useSprintFromBook(isAuth, group, page, userId);
  const audioCallHandler = useAudiocallFromBook(isAuth, group, page, userId);
  return (
    <StyledBarContainer maxWidth="xl">
      <Tooltip title="Play game with unstudied words from this page">
        <GameButton onClick={sprintHandler}>Sprint</GameButton>
      </Tooltip>
      <Tooltip title="Play game with unstudied words from this page">
        <GameButton onClick={audioCallHandler}>Audiocall</GameButton>
      </Tooltip>
      <ThemeProvider theme={theme}>
        {group === DIFFICULT_GROUP ? (
          <Typography
            variant="h4"
            component="h2"
            color="white"
            fontWeight="bold"
          >
            Difficult words
          </Typography>
        ) : (
          <PaginationRanges />
        )}
        <BasicSelect isAuth={isAuth} />
        {children}
      </ThemeProvider>
    </StyledBarContainer>
  );
};
export default BookBar;
