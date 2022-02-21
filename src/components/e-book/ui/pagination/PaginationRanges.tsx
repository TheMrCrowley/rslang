import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Box from '@mui/material/Box';
import { MenuItem } from '@mui/material';
import useBookParams from '../../../../hooks/useBookParams';
import { darkBgColor, TOTAL_PAGES } from '../../cosnstants';

interface PageSelectProps {
  isLearnedPage: boolean;
}

const PageSelect: FC<PageSelectProps> = ({ isLearnedPage }) => {
  const navigate = useNavigate();
  const { group, page } = useBookParams();

  const handleChange = (event: SelectChangeEvent) => {
    navigate(`${group}/${event.target.value}`);
  };

  const selectItems = (() => {
    const res = [];
    for (let i = 0; i < TOTAL_PAGES; i += 1) {
      res.push(
        <MenuItem key={i} value={i}>
          {i + 1}
        </MenuItem>
      );
    }
    return res;
  })();

  return (
    <Box sx={{ minWidth: 100 }}>
      <FormControl fullWidth variant="standard">
        <InputLabel id="page-simple-select-label">Page</InputLabel>
        <Select
          labelId="page-simple-select-label"
          id="page-simple-select"
          value={`${page}`}
          label="Page"
          onChange={handleChange}
          sx={{ backgroundColor: isLearnedPage ? darkBgColor : '' }}
        >
          {selectItems}
        </Select>
      </FormControl>
    </Box>
  );
};

export default PageSelect;
