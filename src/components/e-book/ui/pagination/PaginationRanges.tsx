import React, { ChangeEvent, FC } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import useWindowWidth from '../../../../hooks/useWindowWidth';
import useBookParams from '../../../../hooks/useBookParams';

const PaginationRanges: FC = () => {
  const winWith = useWindowWidth();
  const navigate = useNavigate();
  const { group } = useBookParams();
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

  const handleChangePage = (e: ChangeEvent<unknown>, current: number) => {
    navigate(`${group}/${current}`);
  };

  return (
    <Stack spacing={2}>
      <Pagination
        count={TOTAL_PAGES}
        defaultPage={START_PAGE}
        siblingCount={2}
        size={winWith < 780 ? PageNumberSize.small : PageNumberSize.large}
        color="primary"
        onChange={handleChangePage}
      />
    </Stack>
  );
};

export default PaginationRanges;
