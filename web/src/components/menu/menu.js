import React, { useContext, useEffect, useState } from "react";
import { Grid, List, ListItemText, Tooltip } from "@mui/material";
import { templateContext } from "components/templates/main/main";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { 
  Drawer, 
  ListItemCategory, 
  ListText, 
  MenuCollapse, 
  SubList,
  IconMenuCategory, 
  ButtonMenu,
  DrawerHeader
} from "./styles";

import { 
  IconList,
  IconSettings, 
  IconMenuHome,
  IconScratchGames,
  IconArrowLeft,
  IconHamburger,
  IconProduct,
} from "components/atoms/icons/icons";

import SubMenuScratchGame from "./subMenu/subMenuScratchGame";

const Menu = () => {
  const { openMenu, setOpenMenu} = useContext(templateContext);
  const [openScratchGames, setOpenScratchGames] = useState(false)

  const [scratchGame, setScratchGame] = useState(false);

  const isSmallDesktop = useMediaQuery({ maxWidth: "710px" });

  useEffect(() => {
    if (openMenu === false) {
      setScratchGame(false)
    }
    if (isSmallDesktop) {
      setOpenMenu(false)
    }
  }, [
    setScratchGame, 
    openMenu, 
    setOpenMenu, 
    isSmallDesktop
  ])
  
  const handleScratchGame = (event) => {
    setScratchGame(event.currentTarget)
  };

  const navigate = useNavigate();

  return (
    <Drawer variant="permanent" open={openMenu} >
      <DrawerHeader>
        {!openMenu && (
          <Grid item  sx={{
            // ml: `${openMenu ? "268px" : "60px"}`,
          }}>
            <IconHamburger
              aria-label="open drawer"
              onClick={() => setOpenMenu(true)}
              sx={{
                ":hover": {
                  cursor: "pointer",
                },
                fontSize: "30px",
                color: "inherit",
                pl: 2,
                width: "45px",
                height: "45px",
                display: `${!isSmallDesktop ? "" : "none"}`,
                ...(openMenu && { display: "none" }),
              }}
            />
          </Grid>
        )}
  
        {openMenu && (
          <Grid item sx={{
            // ml: `${openMenu ? "0px" : "268px"}`,
          }}>
            <IconArrowLeft
              aria-label="close drawer"
              onClick={() => setOpenMenu(false)}
              sx={{
                ":hover": {
                  cursor: "pointer",
                },
                fontSize: "40px",
                color: "inherit",
                pl: 2,
                width: "45px",
                height: "45px",
                display: `${!isSmallDesktop ? "" : "none"}`,
                ...(!openMenu && { display: "none" }),
              }}
            />
        </Grid>
      )}
      </DrawerHeader>
      <List sx={{ marginTop: "20px", border: "none" }}>
        <ListItemCategory
          onClick={() => navigate("/home")}
        >
          <ButtonMenu
            sx={{ justifyContent: openMenu ? 'initial' : 'center'}}
          >
            <Tooltip title={'Home'} placement="right">
              <IconMenuCategory sx={{ mr: openMenu ? 3 : 'auto' }}>
                <IconMenuHome sx={{ fontSize: "30px" }}/>
              </IconMenuCategory>
            </Tooltip>
           
            <ListItemText sx={{ opacity: openMenu ? 1 : 0, fontSize: "1.2rem", marginTop: "10px" }}>
              Home
            </ListItemText>
          </ButtonMenu>
        </ListItemCategory>

        <ListItemCategory
          onClick={() => navigate("/home")}
        >
          <ButtonMenu
            sx={{ justifyContent: openMenu ? 'initial' : 'center'}}
          >
            <Tooltip title={'Home'} placement="right">
              <IconMenuCategory sx={{ mr: openMenu ? 3 : 'auto' }}>
                <IconMenuHome sx={{ fontSize: "30px" }}/>
              </IconMenuCategory>
            </Tooltip>
           
            <ListItemText sx={{ opacity: openMenu ? 1 : 0, fontSize: "1.2rem", marginTop: "10px" }}>
              Produtos
            </ListItemText>
          </ButtonMenu>
        </ListItemCategory>

        <ListItemCategory>
          <ButtonMenu sx={{ justifyContent: openMenu ? 'initial' : 'center'}}>
            <Tooltip title={"Produtos"} placement="right">
              <IconProduct 
                aria-controls={scratchGame ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={scratchGame ? 'true' : undefined}
                onClick={handleScratchGame}
                sx={{ mr: openMenu ? 3 : 'auto'}}
              >
                <IconScratchGames sx={{ fontSize: "25px" }}/>
              </IconProduct>
            </Tooltip>
            
            <ListItemText 
              onClick={() => setOpenScratchGames(!openScratchGames)}
              sx={{ opacity: openMenu ? 1 : 0, fontSize: "1.2rem", marginTop: "10px" }} 
            >
              Produtos
            </ListItemText>
          </ButtonMenu>
          {scratchGame && (
            <SubMenuScratchGame 
              openMenu={openMenu}
              scratchGame={scratchGame}
              setScratchGame={setScratchGame}
            />
          )}
        </ListItemCategory>
        <MenuCollapse in={openScratchGames && openMenu}>
          <SubList>
            <ListText
              onClick={() => navigate("reports/historic-scratch-games")} 
              sx={{ opacity: openMenu ? 1 : 0 }}
            >
              <IconList sx={{ verticalAlign: "text-bottom" }}/> Celulares
            </ListText>
          </SubList>

          <SubList>
            <ListText 
              onClick={() => navigate("reports/settings-scratch-games")}
              sx={{ opacity: openMenu ? 1 : 0 }} 
            >
              <IconSettings sx={{ verticalAlign: "text-bottom" }}/> Outros
            </ListText>
          </SubList>      
        </MenuCollapse>

      </List>
    </Drawer>
  );
};

export default Menu;
