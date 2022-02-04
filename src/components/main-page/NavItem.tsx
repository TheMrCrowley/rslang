import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

type NavItemProps = {
  children: React.ReactElement | React.ReactNode;
  innerText: string;
  onClick: () => void;
};

const NavItem: FC<NavItemProps> = ({ children, innerText, onClick }) => {
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
