import React from "react";
import { Drawer, Box, Typography, List, ListItem, Divider, ListItemIcon, ListItemText, Collapse, ListItemButton } from '@mui/material'
import { Apps, NestCamWiredStand } from '@mui/icons-material';
import BookmarkBorder from '@mui/icons-material/BookmarkBorder';

export interface Props {
  logics: any[],
  onLogicClick: (logic: any) => void,
}

const SideBar: React.FC<Props> = ({ logics, onLogicClick }) => {

  const sortedLogics = logics.sort((a, b) => {
    return a.name.localeCompare(b.name)
  })

  const list = () => (
    <div style={{ width: 250 }}>
      <Box
        sx={{ width: 250 }}
        role="presentation"
        onClick={() => { }}
      >
        <List>
          <ListItem button key={"Logicbook"}>
            <ListItemText primaryTypographyProps={{ fontWeight: 'bold' }} primary={"Logicbook"} />
          </ListItem>
        </List>
        <Divider />
        <List>
          {sortedLogics.map((logic, index) => (
            <div>
              <ListItem dense button key={logic.name} onClick={() => onLogicClick(logic)}>
                <ListItemIcon>
                  <Apps />
                </ListItemIcon>
                <ListItemText primary={logic.name.split("/")[0]} />
              </ListItem>
            </div>
          ))}
        </List>
      </Box>
    </div>
  );
  return (
    <div style={{ width: 250 }}>
      <Drawer
        anchor={'left'}
        variant="permanent"
        open={true}
        onClose={() => { }}
      >
        {list()}
      </Drawer>
    </div>
  )
};

export default SideBar;
