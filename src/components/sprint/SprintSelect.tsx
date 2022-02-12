import { FC } from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import * as React from 'react';

interface SelectProps {
  isAuth: boolean;
  setGroup: (group: number) => void;
  group: number;
}

const SprintSelect: FC<SelectProps> = ({ isAuth, setGroup, group }) => {
  const selectGroup = (e: SelectChangeEvent) => {
    setGroup(+e.target.value);
  };
  return (
    <Box sx={{ minWidth: 100 }}>
      <FormControl fullWidth variant="standard">
        <InputLabel id="demo-simple-select-label">Difficulty</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={`${group}`}
          label="Age"
          onChange={selectGroup}
        >
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={6}>6</MenuItem>
          {isAuth ? <MenuItem value={7}>7</MenuItem> : null}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SprintSelect;
