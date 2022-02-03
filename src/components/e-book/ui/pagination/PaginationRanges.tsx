import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export interface PaginationRangesProps {
  setPage: (val: number) => void;
}

const PaginationRanges: React.FC<PaginationRangesProps> = ({ setPage }) => {
  const TOTAL_PAGES = 30;
  const START_PAGE = 1;
  const enum PageNumberSize {
    small = 'small',
    medium = 'medium',
    large = 'large',
    string = 'string',
  }

  return (
    <Stack spacing={2}>
      <Pagination
        count={TOTAL_PAGES}
        defaultPage={START_PAGE}
        siblingCount={0}
        size={PageNumberSize.small}
        color="primary"
        onChange={(e, page) => setPage(page)}
      />
    </Stack>
  );
};

export default PaginationRanges;
