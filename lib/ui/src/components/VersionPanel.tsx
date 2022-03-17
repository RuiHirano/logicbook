import React, { useEffect, useState } from "react";
import { Paper, Button, Typography, ListItem, List, ListItemIcon, ListItemText } from '@mui/material'
import BranchIcon from '@mui/icons-material/ForkRight';
import VersionIcon from '@mui/icons-material/GppGood';
import CommitIcon from '@mui/icons-material/History';
export interface Props {
  logic: any
}

const VersionPanel: React.FC<Props> = ({ logic }) => {


  return (
    <div>
      <h2>Version</h2>
      <Paper>
        {/*<FilesMenu files={menuStatus.files} anchorEl={menuStatus.anchorEl} handleClose={closeMenu} />*/}
        <List >
          <ListItem divider dense>
            <ListItemIcon>
              <VersionIcon />
            </ListItemIcon>
            <ListItemText primary={`1.0.0`} />
          </ListItem>
          <ListItem divider dense>
            <ListItemIcon>
              <BranchIcon />
            </ListItemIcon>
            <ListItemText primary={`develop`} />
          </ListItem>
          <ListItem dense >
            <ListItemIcon>
              <CommitIcon />
            </ListItemIcon>
            <Typography>{'3fk402'}</Typography>
          </ListItem>

        </List>
      </Paper>
    </div>
  )
};

export default VersionPanel;
