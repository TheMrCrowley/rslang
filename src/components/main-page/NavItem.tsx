import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

type NavItemProps = {
  innerText: string;
  onClick: () => void;
};

const NavItem: FC<NavItemProps> = ({ innerText, onClick, children }) => {
  const navigate = useNavigate();
  return (
    <ListItem
      button
      onClick={() => {
        onClick();
        navigate(innerText.toLocaleLowerCase());
      }}
    >
      <ListItemIcon>{children}</ListItemIcon>
      <ListItemText>{innerText}</ListItemText>
    </ListItem>
  );
};

export default NavItem;
