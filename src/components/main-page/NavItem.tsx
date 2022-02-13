import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';

type NavItemProps = {
  innerText: string;
};

const StyledListItem = styled(ListItem)`
  @media (max-width: 750px) {
    padding: 0.5rem 0;
  }
`;

const StyledIcon = styled(ListItemIcon)`
  @media (max-width: 840px) {
    min-width: 30px;
  }
`;

const NavItem: FC<NavItemProps> = ({ innerText, children }) => {
  const navigate = useNavigate();
  return (
    <StyledListItem
      button
      onClick={() => {
        if (innerText.toLocaleLowerCase() === 'book') {
          navigate('/book/1/1');
        } else {
          navigate(innerText.toLocaleLowerCase());
        }
      }}
    >
      <StyledIcon>{children}</StyledIcon>
      <ListItemText>{innerText}</ListItemText>
    </StyledListItem>
  );
};

export default NavItem;
