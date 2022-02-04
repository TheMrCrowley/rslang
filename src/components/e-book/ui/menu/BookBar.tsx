import * as React from 'react';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import BasicSelect from '../select/BasicSelect';
import PaginationRanges from '../pagination/PaginationRanges';

interface ResponsiveAppBarProps {
  setPage: (val: number) => void;
  setGroup: (val: number) => void;
  group: number;
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
}) => {
  return (
    <Container
      maxWidth="xl"
      sx={{
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        height: '5em',
      }}
    >
      <ThemeProvider theme={theme}>
        <PaginationRanges setPage={setPage} />
        <BasicSelect setGroup={setGroup} group={group} />
      </ThemeProvider>
    </Container>
  );
};
export default BookBar;
