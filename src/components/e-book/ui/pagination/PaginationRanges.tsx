import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import useWindowWidth from '../../../../hooks/useWindowWidth';

export interface PaginationRangesProps {
  setPage: (val: number) => void;
}

const PaginationRanges: React.FC<PaginationRangesProps> = ({ setPage }) => {
  const winWith = useWindowWidth();

  // **** TO DO ******
  // join  page numbers to original source
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
        siblingCount={2}
        size={winWith < 780 ? PageNumberSize.small : PageNumberSize.large}
        color="primary"
        onChange={(e, page) => setPage(page - 1)}
      />
    </Stack>
  );
};

export default PaginationRanges;
