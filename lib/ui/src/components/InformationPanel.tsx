import React, { useEffect, useState } from "react";
import { Paper, Button, Typography, ListItem, List, ListItemIcon, ListItemText } from '@mui/material'
import BranchIcon from '@mui/icons-material/ForkRight';
import VersionIcon from '@mui/icons-material/GppGood';
import CommitIcon from '@mui/icons-material/History';
import FileIcon from '@mui/icons-material/Article';
export interface Props {
  logic: any
}

const InformationPanel: React.FC<Props> = ({ logic }) => {

  return (
    <div>
      <Paper>
        {/*<FilesMenu files={menuStatus.files} anchorEl={menuStatus.anchorEl} handleClose={closeMenu} />*/}
        <List >
          <ListItem dense>
            <ListItemIcon>
              <FileIcon />
            </ListItemIcon>
            <ListItemText primary={logic.func_path} />
          </ListItem>
          {/*<ListItem divider dense>
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
          </ListItem>*/}

        </List>
      </Paper>
    </div>
  )
};

export default InformationPanel;
