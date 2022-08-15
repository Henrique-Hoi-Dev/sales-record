import * as React from 'react';
import { ListText } from '../styles';
import { useNavigate } from "react-router-dom";
import { IconList, IconSettings } from 'components/atoms/icons/icons';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function SubMenuScratchGame({ scratchGame, setScratchGame, openMenu }) {
  const navigate = useNavigate();

  const open = Boolean(scratchGame);

  const handleClose = () => {
    setScratchGame(null);
  };

  return (
    <React.Fragment>
      <Menu
        anchorEl={scratchGame}
        id="account-menu"
        open={open && !openMenu}
        onClose={handleClose}
        // onClick={handleClick}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 2.5,
            backgroundColor: "#794de3",
            ml: 1,
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 17,
              right: 104,
              width: 10,
              height: 10,
              bgcolor: '#794de3',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'left', vertical: 'center' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose} disableRipple>
          <ListText onClick={() => navigate("reports/historic-scratch-games")}>
            <IconList sx={{ verticalAlign: "text-bottom" }}/> Celulares
          </ListText>
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
          <ListText onClick={() => navigate("reports/settings-scratch-games")}>
            <IconSettings sx={{ verticalAlign: "text-bottom" }}/> Outros
          </ListText>
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
