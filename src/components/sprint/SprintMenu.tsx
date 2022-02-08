import { Box, Button } from '@mui/material';
import React, { FC, useState } from 'react';
import BasicSelect from '../e-book/ui/select/BasicSelect';

interface MenuProps {
  onClick: (group: number) => void;
}

const SprintMenu: FC<MenuProps> = ({ onClick }) => {
  const [group, setGroup] = useState(0);
  const clickHandler = () => {
    onClick(group);
  };
  return (
    <Box sx={{ display: 'flex', columnGap: '1rem' }}>
      <BasicSelect setGroup={setGroup} group={group} />
      <Button
        sx={{ fontSize: '24px', color: '#202026' }}
        onClick={clickHandler}
      >
        Start
      </Button>
    </Box>
  );
};

export default SprintMenu;
