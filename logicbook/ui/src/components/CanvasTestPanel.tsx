import React, { useEffect, useState } from "react";
import { Typography, Button, Paper, List, ListSubheader, Collapse, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import SuccessIcon from '@mui/icons-material/CheckCircleOutline';
import UnknownIcon from '@mui/icons-material/Loop';
import FailureIcon from '@mui/icons-material/ErrorOutline';
import FileIcon from '@mui/icons-material/Article';
import TimeIcon from '@mui/icons-material/AccessTime';
import LogTerminal from "./LogTerminal";
import LoadingButton from '@mui/lab/LoadingButton';
import moment from "moment";
import _ from 'lodash'

export async function timeout(ms: number) {
  await new Promise(resolve => setTimeout(resolve, ms));
  return
}

export interface Props {
  logic: any
  onExecuteTest: (test: any) => any
  onExecuteAllTest: () => any
}

const CanvasTestPanel: React.FC<Props> = ({ logic, onExecuteTest, onExecuteAllTest }) => {

  const [open, setOpen] = useState(logic.tests.map((test: any) => test.cases.map(() => { return false })));
  const [loading, setLoading] = useState(logic.tests.map(() => false));
  const [loadingAll, setLoadingAll] = useState(false);

  console.log(logic.name, open, logic.tests, logic.tests.map((test: any) => test.cases.map(() => false)))
  const handleClick = (i: number, j: number) => {
    const newOpen = [...open]
    newOpen[i][j] = !open[i][j]
    setOpen(newOpen)
  };

  const handleExecuteTest = (index: number) => {
    console.log("execute test")
  }

  const handleExecuteAllTest = () => {
    console.log("execute all test")
  }

  return (
    <div>
      <h2>Tests</h2>
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
              <ListItem>
                <ListItemText primary={test.name} primaryTypographyProps={{ fontWeight: 'bold' }} />
              </ListItem>
              {test.cases.map((case_: any, j: number) => (
                <div key={j}>
                  <ListItemButton onClick={() => handleClick(i, j)}>
                    <ListItemIcon>
                      {case_.status === null && <UnknownIcon style={{ color: "blue" }} />}
                      {case_.status === "success" && <SuccessIcon style={{ color: "green" }} />}
                      {case_.status === "failure" && <FailureIcon style={{ color: "red" }} />}
                    </ListItemIcon>
                    <ListItemText primary={case_.name} />
                    {open[i][j] ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>

                  <Collapse in={open[i][j]} timeout="auto" unmountOnExit>
                    <div style={{ display: "flex", justifyContent: "flex-end", marginRight: 40 }}>
                      <LoadingButton loading={loading[i]} onClick={() => handleExecuteTest(i)} variant="outlined" size="small" style={{ margin: 5 }}>Run Test</LoadingButton>
                    </div>
                    <div style={{ marginLeft: 40, marginRight: 40 }}>
                      <Typography style={{ margin: 5, fontWeight: 'bold' }} variant="body1">Code</Typography>
                      <div style={{ height: 200 }}>
                        <LogTerminal text={loading[i] ? " " : case_.source} loading={loading[i]} />
                      </div>
                    </div>
                    <div style={{ marginLeft: 40, marginRight: 40 }}>
                      <Typography style={{ margin: 5, fontWeight: 'bold' }} variant="body1">Result</Typography>
                      <div style={{ height: 200 }}>
                        <LogTerminal text={!loading[i] && case_.result ? case_.result : " "} loading={loading[i]} />
                      </div>
                    </div>
                  </Collapse>
                </div>
              ))}
            </div>
          ))}
        </List>
      </Paper>
    </div>
  )
};

export default CanvasTestPanel;
