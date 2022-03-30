import React from "react";
import { Typography, Paper, List, ListItemText, ListItemIcon, ListItem, Chip } from '@mui/material'
import SuccessIcon from '@mui/icons-material/CheckCircleOutline';
import UnknownIcon from '@mui/icons-material/Loop';
import FailureIcon from '@mui/icons-material/ErrorOutline';

export interface Props {
  logic: any
}

const FunctionItem: React.FC<Props> = ({ logic }) => {

  return (
    <Paper style={{ padding: 10, backgroundColor: 'antiquewhite' }}>
      <div style={{ display: 'flex' }}>
        <Typography style={{ fontWeight: 'bold', fontSize: 20 }}>{logic.name}</Typography>
        <Chip style={{ margin: '0 0 0 auto', backgroundColor: "orange" }} size="small" label={logic.version} />
      </div>
      <Typography style={{}}>{logic.description}</Typography>
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

export default FunctionItem;
