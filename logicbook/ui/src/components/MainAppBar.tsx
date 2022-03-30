import React from "react";
import { Divider, Box, AppBar, Toolbar, IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';

export interface Props {
  onClickMenu: () => void,
}

const MainAppBar: React.FC<Props> = ({ onClickMenu }) => {

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ backgroundColor: 'white' }}>
        <Toolbar>
          <div style={{ flex: 1 }} />
          <IconButton edge="end" aria-label="menu" sx={{ mr: 2 }} onClick={onClickMenu}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
        <Divider />
      </AppBar>
    </Box>
  )
};

export default MainAppBar;
