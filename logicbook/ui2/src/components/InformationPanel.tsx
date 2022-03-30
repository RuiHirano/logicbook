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
        <List >
          <ListItem dense>
            <ListItemIcon>
              <FileIcon />
            </ListItemIcon>
            <ListItemText primary={logic.id} />
          </ListItem>
          <ListItem dense>
            <ListItemIcon>
              <FileIcon />
            </ListItemIcon>
            <ListItemText primary={logic.name} />
          </ListItem>
          <ListItem dense>
            <ListItemIcon>
              <FileIcon />
            </ListItemIcon>
            <ListItemText primary={logic.module_file_name} />
          </ListItem>
        </List>
      </Paper>
    </div>
  )
};

export default InformationPanel;
