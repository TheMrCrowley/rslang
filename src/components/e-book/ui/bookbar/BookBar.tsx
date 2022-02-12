import * as React from 'react';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { Button, Typography } from '@mui/material';
import BasicSelect from '../select/BasicSelect';
import PaginationRanges from '../pagination/PaginationRanges';
import { DIFFICULT_GROUP } from '../../cosnstants';
import useBookParams from '../../../../hooks/useBookParams';
import useSprintFromBook from '../../../../hooks/useSprintFromBook';

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

const BookBar: React.FC<ResponsiveAppBarProps> = ({
  isAuth,
  children,
  userId,
}) => {
  const { group, page } = useBookParams();
  const sprintHandler = useSprintFromBook(isAuth, group, page, userId);
  return (
    <StyledBarContainer maxWidth="xl">
      <Button sx={{ color: '#202026' }} onClick={sprintHandler}>
        Sprint
      </Button>
      <ThemeProvider theme={theme}>
        {group === DIFFICULT_GROUP ? (
          <Typography variant="h2" component="h2">
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
