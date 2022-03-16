import React, { useEffect, useState } from "react";
import { Typography, List, ListSubheader, Collapse, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import StarBorder from '@mui/icons-material/StarBorder';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import SuccessIcon from '@mui/icons-material/CheckCircleOutline';
import UnknownIcon from '@mui/icons-material/Loop';
import FailureIcon from '@mui/icons-material/ErrorOutline';
import FileIcon from '@mui/icons-material/Article';
import LogTerminal from "./LogTerminal";

export interface Props {
  logic: any
  onExecute: (input: any) => any
}

const TestPanel: React.FC<Props> = ({ logic, onExecute }) => {
  const [open, setOpen] = React.useState(logic.tests.map(() => false));

  const handleClick = (index: number) => {
    const newOpen = [...open]
    newOpen[index] = !newOpen[index]
    setOpen(newOpen)
  };

  return (
    <div>
      <h2>Test</h2>
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Nested List Items
          </ListSubheader>
        }
      >
        {logic.tests.map((test: any, i: number) => (
          <div>
            <ListItemButton onClick={() => handleClick(i)}>
              <ListItemIcon>
                {test.status === "success" && <SuccessIcon style={{ color: "green" }} />}
                {test.status === "failure" && <FailureIcon style={{ color: "red" }} />}
                {test.status === "unknown" && <UnknownIcon style={{ color: "blue" }} />}
              </ListItemIcon>
              <ListItemText primary={test.name} />
              {open[i] ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open[i]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <FileIcon />
                  </ListItemIcon>
                  <ListItemText primary={test.filename} />
                </ListItem>
              </List>
              <div style={{ marginLeft: 40, marginRight: 40 }}>
                <Typography variant="body1">Code</Typography>
                <div style={{ height: 300 }}>
                  <LogTerminal text={test.code} loading={false} />
                </div>
              </div>
            </Collapse>
          </div>
        ))}
      </List>
    </div>
  )
};

export default TestPanel;
