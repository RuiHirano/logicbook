import React, { useEffect, useState } from "react";
import { Typography, Button, Paper, List, ListSubheader, Collapse, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import SuccessIcon from '@mui/icons-material/CheckCircleOutline';
import UnknownIcon from '@mui/icons-material/Loop';
import FailureIcon from '@mui/icons-material/ErrorOutline';
import FileIcon from '@mui/icons-material/Article';
import LogTerminal from "./LogTerminal";
import LoadingButton from '@mui/lab/LoadingButton';

export async function timeout(ms: number) {
  await new Promise(resolve => setTimeout(resolve, ms));
  return
}

export interface Props {
  logic: any
  onExecuteTest: (test: any) => any
  onExecuteAllTest: () => any
}

const TestPanel: React.FC<Props> = ({ logic, onExecuteTest, onExecuteAllTest }) => {
  const [open, setOpen] = React.useState(logic.tests.map(() => false));
  const [loading, setLoading] = React.useState(logic.tests.map(() => false));
  const [loadingAll, setLoadingAll] = React.useState(false);

  const handleClick = (index: number) => {
    const newOpen = [...open]
    newOpen[index] = !newOpen[index]
    setOpen(newOpen)
  };

  const handleExecuteTest = (index: number) => {
    const newLoading = [...loading]
    newLoading[index] = true
    setLoading(newLoading)
    onExecuteTest(logic.tests[index])
    newLoading[index] = false
    setLoading(newLoading)
  }

  const handleExecuteAllTest = () => {
    setLoadingAll(true)
    onExecuteAllTest()
    setLoadingAll(false)
  }

  return (
    <div>
      <h2>Test</h2>
      <Paper>
        <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <LoadingButton loading={loadingAll} onClick={handleExecuteAllTest} variant="outlined" size="small" style={{ margin: 5 }} disabled={logic.tests.length === 0}>Run all</LoadingButton>
              </div>
            </ListSubheader>
          }
        >
          {logic.tests.length === 0 && <Typography variant="body2" style={{ textAlign: 'center' }}>No Tests</Typography>}
          {logic.tests.map((test: any, i: number) => (
            <div key={i}>
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
                    <ListItemText primary={test.path} />
                  </ListItem>
                </List>
                <div style={{ display: "flex", justifyContent: "flex-end", marginRight: 40 }}>
                  <LoadingButton loading={loading[i]} onClick={() => handleExecuteTest(i)} variant="outlined" size="small" style={{ margin: 5 }}>Run Test</LoadingButton>
                </div>
                <div style={{ marginLeft: 40, marginRight: 40 }}>
                  <Typography style={{ margin: 5, fontWeight: 'bold' }} variant="body1">Code</Typography>
                  <div style={{ height: 200 }}>
                    <LogTerminal text={loading[i] ? "" : test.code} loading={loading[i]} />
                  </div>
                </div>
                <div style={{ marginLeft: 40, marginRight: 40 }}>
                  <Typography style={{ margin: 5, fontWeight: 'bold' }} variant="body1">Result</Typography>
                  <div style={{ height: 200 }}>
                    <LogTerminal text={loading[i] ? "" : test.result} loading={loading[i]} />
                  </div>
                </div>
                <div style={{ marginBottom: 30 }} />
              </Collapse>
            </div>
          ))}
        </List>
      </Paper>
    </div>
  )
};

export default TestPanel;
