import React, { FC } from 'react';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import HomeIcon from '@mui/icons-material/Home';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import GroupIcon from '@mui/icons-material/Group';
import BarChartIcon from '@mui/icons-material/BarChart';
import NavItem from './NavItem';

const StyledList = styled(List)`
  display: flex;
  justify-content: center;
  column-gap: 1rem;
  width: 85%;
`;
// TODO make pages observable
const Nav: FC = () => {
  return (
    <StyledList>
      <NavItem innerText="Home">
        <HomeIcon />
      </NavItem>
      <NavItem innerText="Book">
        <MenuBookIcon />
      </NavItem>
      <NavItem innerText="Games">
        <SportsEsportsIcon />
      </NavItem>
      <NavItem innerText="Statistics">
        <BarChartIcon />
      </NavItem>
      <Divider />
    </StyledList>
  );
};

export default Nav;
