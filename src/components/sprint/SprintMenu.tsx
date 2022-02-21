import { Box, Typography } from '@mui/material';
import React, { FC, useState } from 'react';
import { colors } from '../e-book/cosnstants';
import MainPageLayoutButton from '../pages/MainPageLayoutButton';
import LevelSelecContainer from '../ui/LevelSelectContainer';
import SprintSelect from './SprintSelect';

interface MenuProps {
  onClick: (group: number) => void;
  isAuth: boolean;
}

const SprintMenu: FC<MenuProps> = ({ onClick, isAuth, children }) => {
  const [group, setGroup] = useState(0);
  const clickHandler = () => {
    onClick(group);
  };
  return (
    <Box>
      {children}
      <LevelSelecContainer color={colors[group]}>
        <Typography variant="h5">Please select the difficulty</Typography>
        <SprintSelect setGroup={setGroup} isAuth={isAuth} group={group} />
        <MainPageLayoutButton
          onClick={clickHandler}
          text="Start"
          color={colors[group]}
        />
      </LevelSelecContainer>
    </Box>
  );
};

export default SprintMenu;
