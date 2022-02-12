import { Typography } from '@mui/material';
import React, { FC, useState } from 'react';
import { colors } from '../e-book/cosnstants';
import MainPageLayoutButton from '../pages/MainPageLayoutButton';
import LevelSelecContainer from '../ui/LevelSelectContainer';
import SprintSelect from './SprintSelect';

interface MenuProps {
  onClick: (group: number) => void;
  isAuth: boolean;
}

const SprintMenu: FC<MenuProps> = ({ onClick, isAuth }) => {
  const [group, setGroup] = useState(1);
  const clickHandler = () => {
    onClick(group);
  };
  return (
    <LevelSelecContainer color={colors[group]}>
      <Typography variant="h5">Please select the difficulty</Typography>
      <SprintSelect setGroup={setGroup} isAuth={isAuth} group={group} />
      <MainPageLayoutButton
        onClick={clickHandler}
        text="Start"
        color={colors[group]}
      />
    </LevelSelecContainer>
  );
};

export default SprintMenu;
