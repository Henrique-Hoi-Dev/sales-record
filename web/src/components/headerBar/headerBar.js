import React, { useContext, useState } from "react";
import { useDispatch} from "react-redux";
import { templateContext } from "components/templates/main/main";
import { useNavigate } from "react-router-dom";
import { signOut } from "store/modules/auth/actions";

import {
  Avatar,
  Grid,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";

const HeaderBar = () => {

  const dispatch = useDispatch();

  const { openMenu, } = useContext(templateContext);
  const [openSettings, setOpenSettings] = useState(false);
  const [anchorEl, setAnchorEl] = useState(false);


  const handleClick = (ev) => {
    setOpenSettings(!openSettings);
    setAnchorEl(ev.currentTarget);
  };

  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch(signOut())
    navigate("/login");
  };

  return (
    <>
      <Grid
        container
        sx={{
          position: "sticky",
          backgroundColor: "inherit",
          height: "64px",
          ml: `${openMenu ? "268px" : "60px"}`,
          width: `${openMenu ? "calc(100% - 268px)" : "calc(100% - 60px)"}`,
        }}
        justifyContent="flex-end"
        alignItems="center"
      >

        <Grid 
          item 
          container
          xs={6}
          md={8}
          flexWrap="nowrap"
          alignItems="center"
          justifyContent="flex-end"
        >
          <IconButton
            color="inherit"
            fontSize="12px"
            sx={{ mr: 1 }}
            onClick={(ev) => handleClick(ev)}
          >
            <Avatar
              sx={{
                ":hover": {
                  cursor: "pointer",
                },
                height: "30px",
                width: "30px",
              }}
            />
          </IconButton>
        </Grid>

        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          sx={{
            zIndex: 4444,
            mt: 5,
          }}
          open={openSettings}
          onClose={() => setOpenSettings(!openSettings)}
        >
          <MenuItem onClick={handleLogOut}>Sair</MenuItem>
        </Menu>
      </Grid>
    </>
  );
};

export default HeaderBar;
