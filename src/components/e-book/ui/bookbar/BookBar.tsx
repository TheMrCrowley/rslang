import * as React from 'react';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import BasicSelect from '../select/BasicSelect';
import PaginationRanges from '../pagination/PaginationRanges';
import { DIFFICULT_GROUP } from '../../cosnstants';
import { requestSprintDataAction } from '../../../../redux/store/reducers/sprintGameReducer';

interface ResponsiveAppBarProps {
  setPage: (val: number) => void;
  setGroup: (val: number) => void;
  group: number;
  page: number;
  isAuth: boolean;
  userId: string;
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#ffffff',
    },
  },
});

const BookBar: React.FC<ResponsiveAppBarProps> = ({
  setPage,
  setGroup,
  group,
  page,
  isAuth,
  children,
  userId,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sprintHandler = () => {
    navigate('/sprint');
    if (isAuth) {
      dispatch(requestSprintDataAction({ group, page, book: true, userId }));
    } else {
      dispatch(requestSprintDataAction({ group, page }));
    }
  };
  return (
    <Container
      maxWidth="xl"
      sx={{
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        height: '4.5em',
      }}
    >
      <Button sx={{ color: '#202026' }} onClick={sprintHandler}>
        Sprint
      </Button>
      <ThemeProvider theme={theme}>
        {group !== DIFFICULT_GROUP ? (
          <PaginationRanges setPage={setPage} />
        ) : (
          <Typography variant="h2" component="h2">
            Difficult words
          </Typography>
        )}
        <BasicSelect setGroup={setGroup} group={group} />
        {children}
      </ThemeProvider>
    </Container>
  );
};
export default BookBar;
