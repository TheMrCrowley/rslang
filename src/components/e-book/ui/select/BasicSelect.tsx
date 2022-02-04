import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
// **** TO DO ***** join isAuth to original source
import { isAuth } from '../../cosnstants';

interface BasicSelectProps {
  setGroup: (val: number) => void;
  group: number;
}

const BasicSelect: React.FC<BasicSelectProps> = ({ setGroup, group }) => {
  const handleChange = (event: SelectChangeEvent) => {
    setGroup(event.target.value as unknown as number);
  };

  return (
    <Box sx={{ minWidth: 100 }}>
      <FormControl fullWidth variant="standard">
        <InputLabel id="demo-simple-select-label">Difficulty</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={group.toString()}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={0}>1</MenuItem>
          <MenuItem value={1}>2</MenuItem>
          <MenuItem value={2}>3</MenuItem>
          <MenuItem value={3}>4</MenuItem>
          <MenuItem value={4}>5</MenuItem>
          <MenuItem value={5}>6</MenuItem>
          {isAuth ? <MenuItem value={6}>7</MenuItem> : null}
        </Select>
      </FormControl>
    </Box>
  );
};

export default BasicSelect;