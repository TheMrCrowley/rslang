import React, { ChangeEvent, FC, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import useWindowWidth from '../../../../hooks/useWindowWidth';
import useBookParams from '../../../../hooks/useBookParams';

const enum PageNumberSize {
  small = 'small',
  medium = 'medium',
  large = 'large',
  string = 'string',
}

const PaginationRanges: FC = () => {
  const winWith = useWindowWidth();
  const navigate = useNavigate();
  const { group, page } = useBookParams();
  const TOTAL_PAGES = 30;

  const handleChangePage = (e: ChangeEvent<unknown>, current: number) => {
    navigate(`${group}/${current - 1}`);
  };

  return (
    <Stack spacing={2}>
      <Pagination
        count={TOTAL_PAGES}
        defaultPage={page + 1}
        siblingCount={2}
        size={winWith < 780 ? PageNumberSize.small : PageNumberSize.large}
        color="primary"
        onChange={handleChangePage}
      />
    </Stack>
  );
};

export default PaginationRanges;
