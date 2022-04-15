import React, { useEffect, useState } from "react";
import { Paper, IconButton, TextField, Typography, ButtonGroup } from '@mui/material'
import MDEditor from '@uiw/react-md-editor';
import Edit from '@mui/icons-material/Edit';
import Save from '@mui/icons-material/Save';
export interface Props {
  logic: any
  onSave: (text: string) => void
}

const DocumentPanel: React.FC<Props> = ({ logic, onSave }) => {
  const [value, setValue] = useState<string | undefined>(logic.document.text)
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    setValue(logic.document.text);
  }, [logic])

  const handleSave = () => {
    if (value) {
      onSave(value)
    }
  }
  console.log("value", logic.document)
  return (
    <div>
      <h2>Document</h2>
      <Paper style={{ padding: 30 }}>
        {!logic.document.path ?
          <div style={{ marginTop: 20 }}>
            <Typography style={{ fontSize: 15, textAlign: 'center' }}>{"No Document"}</Typography>
          </div> :
          <div>
            {edit &&
              <div>
                <div style={{ display: 'flex' }}>
                  <IconButton style={{ marginLeft: 10, margin: '0 0 0 auto' }} onClick={() => { handleSave(); setEdit(!edit) }}>
                    <Save />
                  </IconButton>
                </div>
                <MDEditor
                  height={800}
                  value={value}
                  onChange={setValue}
                /></div>}
            {!edit &&
              <div>
                <div style={{ display: 'flex' }}>
                  <IconButton style={{ marginLeft: 10, margin: '0 0 0 auto' }} onClick={() => { setEdit(!edit) }}>
                    <Edit />
                  </IconButton>
                </div>
                <MDEditor.Markdown source={value} />
              </div>}
          </div>
        }
      </Paper>
    </div>
  )
};

export default DocumentPanel;