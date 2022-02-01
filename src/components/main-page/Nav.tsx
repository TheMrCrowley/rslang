import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';
import React, { FC } from 'react';

interface NavProps {
  open: boolean;
  setOpen: (state: boolean) => void;
}

const Nav: FC<NavProps> = ({ open, setOpen }) => {
  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={() => setOpen(false)}
      variant="temporary"
      sx={{ position: 'relative' }}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Inbox" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Nav;
