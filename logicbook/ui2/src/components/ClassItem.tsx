import React from "react";
import { Typography, Paper, List, ListItemText, ListItem, ListItemIcon, Chip } from '@mui/material'
import SuccessIcon from '@mui/icons-material/CheckCircleOutline';
import UnknownIcon from '@mui/icons-material/Loop';
import FailureIcon from '@mui/icons-material/ErrorOutline';

export interface Props {
  logic: any
}

const ClassItem: React.FC<Props> = ({ logic }) => {

  return (
    <Paper elevation={3} style={{ padding: 10, backgroundColor: 'lightblue' }}>
      <div style={{ display: 'flex' }}>
        <Typography style={{ fontWeight: 'bold', fontSize: 20 }}>{logic.name}</Typography>
        <Chip style={{ margin: '0 0 0 auto', backgroundColor: "deepskyblue" }} size="small" label={logic.version} />
      </div>
      <Typography style={{}}>{logic.description}</Typography>
      <div style={{ marginTop: 10 }}>
        <Typography style={{ fontWeight: 'bold', fontSize: 13 }}>{"Functions"}</Typography>
        <List >
          {["func1", "sum2", "func3"].map((name, index) => (
            <ListItem dense divider style={{ backgroundColor: 'white' }}>
              <ListItemText primary={name} />
            </ListItem>
          ))}
        </List>
      </div>
      <div style={{ marginTop: 10 }}>
        <Typography style={{ fontWeight: 'bold', fontSize: 13 }}>{"Tests"}</Typography>
        <List >
          {["test_sum", "test_diff_ok", "test_diff_ng"].map((name, index) => (
            <ListItem dense divider style={{ backgroundColor: 'white' }}>
              <ListItemText primary={name} />
              <ListItemIcon>
                <SuccessIcon style={{ color: "green" }} />
              </ListItemIcon>
            </ListItem>
          ))}
        </List>
      </div>
    </Paper>
  )
};

export default ClassItem;
