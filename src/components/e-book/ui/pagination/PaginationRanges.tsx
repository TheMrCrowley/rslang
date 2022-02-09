import React, { useLayoutEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export interface PaginationRangesProps {
  setPage: (val: number) => void;
}

const PaginationRanges: React.FC<PaginationRangesProps> = ({ setPage }) => {
  function useWindowWidth() {
    const [width, setWidth] = useState(0);
    useLayoutEffect(() => {
      function updateSize() {
        setWidth(window.innerWidth);
      }
      window.addEventListener('resize', updateSize);
      updateSize();
      return () => window.removeEventListener('resize', updateSize);
    }, []);
    return width;
  }

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
        siblingCount={0}
        size={
          useWindowWidth() < 780 ? PageNumberSize.small : PageNumberSize.large
        }
        color="primary"
        onChange={(e, page) => setPage(page - 1)}
      />
    </Stack>
  );
};

export default PaginationRanges;
