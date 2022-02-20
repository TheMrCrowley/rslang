import * as React from 'react';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { Box, Button, Tooltip, Typography } from '@mui/material';
import BasicSelect from '../select/BasicSelect';
import { colors, DIFFICULT_GROUP, mainBgColor } from '../../cosnstants';
import useBookParams from '../../../../hooks/useBookParams';
import useSprintFromBook from '../../../sprint/useSprintFromBook';
import useAudiocallFromBook from '../../../audiocall/useAudiocallFromBook';
import useWindowScroll from '../../../../hooks/useWindowScroll';
import PageSelect from '../pagination/PaginationRanges';

interface ResponsiveAppBarProps {
  isAuth: boolean;
  isPageLearned: boolean;
  userId?: string;
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#ffffff',
    },
  },
});

const StyledBarContainer = styled(Box)({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-evenly',
  alignItems: 'center',
  height: '4.5em',
  position: 'sticky',

  zIndex: 100,
});

const GameButton = styled(Button)`
  margin-right: 0.5rem;
  color: #202026;
  background-color: white;
  border-radius: 2rem;
  &:hover {
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
  isPageLearned,
}) => {
  const { group, page } = useBookParams();
  const sprintHandler = useSprintFromBook(isAuth, group, page, userId);
  const audioCallHandler = useAudiocallFromBook(isAuth, group, page, userId);
  const top = useWindowScroll(64);
  return (
    <StyledBarContainer
      sx={{
        top: `${top}px`,
        backgroundColor: isPageLearned ? mainBgColor : colors[group],
      }}
    >
      {isPageLearned ? (
        <>
          <GameButton disabled={isPageLearned} onClick={sprintHandler}>
            Sprint
          </GameButton>
          <GameButton disabled={isPageLearned} onClick={audioCallHandler}>
            Audiocall
          </GameButton>
        </>
      ) : (
        <>
          <Tooltip title="Play game with unstudied words from this page">
            <GameButton disabled={isPageLearned} onClick={sprintHandler}>
              Sprint
            </GameButton>
          </Tooltip>
          <Tooltip title="Play game with unstudied words from this page">
            <GameButton disabled={isPageLearned} onClick={audioCallHandler}>
              Audiocall
            </GameButton>
          </Tooltip>
        </>
      )}
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
          <PageSelect isLearnedPage={isPageLearned} />
        )}
        <BasicSelect isAuth={isAuth} />
        {children}
      </ThemeProvider>
    </StyledBarContainer>
  );
};
export default BookBar;
