import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import BasicSelect from '../select/BasicSelect';
import PaginationRanges from '../pagination/PaginationRanges';

interface ResponsiveAppBarProps {
  setPage: (val: number) => void;
  setGroup: (val: number) => void;
  group: number;
}

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
      <Box>
        <PaginationRanges setPage={setPage} />
      </Box>
      <Box>
        <BasicSelect setGroup={setGroup} group={group} />
      </Box>
    </Container>
  );
};
export default BookBar;
