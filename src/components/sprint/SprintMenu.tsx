import { Typography } from '@mui/material';
import React, { FC, useState } from 'react';
import BasicSelect from '../e-book/ui/select/BasicSelect';
import { colors } from '../e-book/cosnstants';
import MainPageLayoutButton from '../pages/MainPageLayoutButton';
import LevelSelecContainer from '../ui/LevelSelectContainer';

interface MenuProps {
  onClick: (group: number) => void;
}

const SprintMenu: FC<MenuProps> = ({ onClick }) => {
  const [group, setGroup] = useState(0);
  const clickHandler = () => {
    onClick(group);
  };
  return (
    <LevelSelecContainer color={colors[group]}>
      <Typography variant="h5">Please select the difficulty</Typography>
      <BasicSelect setGroup={setGroup} group={group} />
      <MainPageLayoutButton
        onClick={clickHandler}
        text="Start"
        color={colors[group]}
      />
    </LevelSelecContainer>
  );
};

export default SprintMenu;
