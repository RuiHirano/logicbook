import React from "react";
import { Drawer, Box, List, ListItem, Divider, ListItemIcon, ListItemText } from '@mui/material'
import { MoveToInbox, Mail } from '@mui/icons-material';

export interface Props {
  logics: any[],
  onLogicClick: (logic: any) => void,
}

const SideBar: React.FC<Props> = ({ logics, onLogicClick }) => {

  const list = () => (
    <div style={{ width: 250 }}>
      <Box
        sx={{ width: 250 }}
        role="presentation"
        onClick={() => { }}
      >
        <List>
          <ListItem button key={"Logicbook"}>
            <ListItemText primary={"Logicbook"} />
          </ListItem>
        </List>
        <Divider />
        <List>
          {logics.map((logic, index) => (
            <ListItem button key={logic.name} onClick={() => onLogicClick(logic)}>
              <ListItemIcon>
                {index % 2 === 0 ? <MoveToInbox /> : <Mail />}
              </ListItemIcon>
              <ListItemText primary={logic.name} />
            </ListItem>
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
