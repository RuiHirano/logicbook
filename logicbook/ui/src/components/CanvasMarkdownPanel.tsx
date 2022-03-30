import React, { useEffect, useState } from "react";
import { Paper, IconButton, TextField, Typography, ButtonGroup } from '@mui/material'
import MDEditor from '@uiw/react-md-editor';
import Edit from '@mui/icons-material/Edit';
import Save from '@mui/icons-material/Save';
export interface Props {
  logic: any
}

const CanvasMarkdownPanel: React.FC<Props> = ({ logic }) => {
  const [value, setValue] = useState<string | undefined>("**Hello world!!!**");
  const [edit, setEdit] = useState(false);

  const handleSave = () => {
    console.log("save")
  }
  return (
    <div>
      <h2>Document</h2>
      <Paper style={{ padding: 30 }}>

        {edit &&
          <div>
            <div style={{ display: 'flex' }}>
              <IconButton style={{ marginLeft: 10, margin: '0 0 0 auto' }} onClick={() => setEdit(!edit)}>
                <Save />
              </IconButton>
            </div>
            <MDEditor
              value={value}
              onChange={setValue}
            /></div>}
        {!edit &&
          <div>
            <div style={{ display: 'flex' }}>
              <IconButton style={{ marginLeft: 10, margin: '0 0 0 auto' }} onClick={() => { handleSave(); setEdit(!edit) }}>
                <Edit />
              </IconButton>
            </div>
            <MDEditor.Markdown source={value} />
          </div>}
      </Paper>
    </div>
  )
};

export default CanvasMarkdownPanel;
