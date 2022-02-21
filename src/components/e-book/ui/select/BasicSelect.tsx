import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import useBookParams from '../../../../hooks/useBookParams';

interface SelectProps {
  isAuth: boolean;
}
const BasicSelect: FC<SelectProps> = ({ isAuth }) => {
  const { page, group } = useBookParams();
  const navigate = useNavigate();
  const handleChange = (event: SelectChangeEvent) => {
    navigate(`${event.target.value}/${page}`);
  };

  return (
    <Box sx={{ minWidth: 100 }}>
      <FormControl fullWidth variant="standard">
        <InputLabel id="group-simple-select-label">Difficulty</InputLabel>
        <Select
          labelId="group-simple-select-label"
          id="group-simple-select"
          value={`${group}`}
          label="group"
          onChange={handleChange}
        >
          <MenuItem value={0}>1</MenuItem>
          <MenuItem value={1}>2</MenuItem>
          <MenuItem value={2}>3</MenuItem>
          <MenuItem value={3}>4</MenuItem>
          <MenuItem value={4}>5</MenuItem>
          <MenuItem value={5}>6</MenuItem>
          {isAuth ? <MenuItem value={6}>Hard words</MenuItem> : null}
        </Select>
      </FormControl>
    </Box>
  );
};

export default BasicSelect;
