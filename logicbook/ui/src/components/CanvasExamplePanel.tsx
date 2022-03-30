import React, { useEffect, useState } from "react";
import { Paper, Button, TextField, Typography, ButtonGroup } from '@mui/material'
import _ from 'lodash'

export interface Props {
  logic: any
  onExecute: (args: any) => any
}

const CanvasExamplePanel: React.FC<Props> = ({ logic, onExecute }) => {
  logic.examples = []
  const [targetLogic, setTargetLogic] = useState({ ...logic })
  const [examples, setExamples] = useState([...logic.examples])
  const [selectedIndex, setSelectedIndex] = useState(examples.length > 0 ? 0 : null)
  const [output, setOutput] = useState(selectedIndex ? examples[selectedIndex].output : null)

  useEffect(() => {
    if (logic.id !== targetLogic.id) {
      setExamples([...logic.examples]);
      setTargetLogic({ ...logic });
      setOutput(logic.examples.length > 0 ? [...logic.examples][0].output : null);
    }
  }, [logic])


  const handleReset = async (index: number) => {
    const newExamples = [...targetLogic.examples]
    newExamples[index].args = logic.examples[index].args
    setExamples(newExamples)
    setOutput(null)
  }

  const handleExecute = async (index: number) => {
    const data = { id: examples[index].id, args: examples[index].args }
    const reuslt = await onExecute(data)
    setOutput(reuslt)
  }

  const convertValueToString = (value: any, type: string) => {
    if (type === 'string') {
      return value
    } else if (type === 'number') {
      return value.toString()
    } else if (type === 'boolean') {
      return value.toString()
    } else if (type === 'object') {
      return JSON.stringify(value, null, 2)
    }
    return value
  }

  const convertStringToValue = (string: any, type: string) => {
    if (type === 'string') {
      return string
    } else if (type === 'number') {
      return string === "" ? 0 : parseFloat(string)
    } else if (type === 'boolean') {
      return string === 'true'
    } else if (type === 'object') {
      return JSON.parse(string)
    }
    return string
  }

  return (
    <div>
      <h2>Example</h2>
      <Paper style={{ padding: 30 }}>
        {selectedIndex === null && <Typography variant="body2" style={{ textAlign: 'center' }}>No Examples</Typography>}
        {selectedIndex !== null &&
          <div>
            <ButtonGroup variant="outlined" aria-label="outlined primary button group">
              {examples.map((ex: any, i: number) => (
                <Button key={i} size="small" onClick={() => setSelectedIndex(i)}>{ex.name}</Button>
              ))}
            </ButtonGroup>
            <h3>Input</h3>
            {Object.keys(examples[selectedIndex].args).map((key: any) => {
              const value = examples[selectedIndex].args[key]
              const str_value = convertValueToString(value, typeof value)
              return (
                <TextField
                  key={`${examples[selectedIndex].name}_${key}`}
                  style={{ margin: 5 }}
                  size="small"
                  label={key}
                  type={typeof value === "number" ? "number" : "text"}
                  multiline
                  value={str_value}
                  onChange={(e) => {
                    const newExamples = [...examples]
                    newExamples[selectedIndex].args[key] = convertStringToValue(e.target.value, typeof value)
                    setExamples(newExamples)
                  }}
                />)
            })}
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button style={{ margin: 5 }} variant="contained" onClick={() => handleExecute(selectedIndex)}>Execute</Button>
              <Button style={{ margin: 5 }} onClick={() => handleReset(selectedIndex)}>Reset</Button>
            </div>
            <h3>Output</h3>
            <Typography>{output ? convertValueToString(output, typeof output) : ""}</Typography>
          </div>
        }
      </Paper>
    </div>
  )
};

export default CanvasExamplePanel;
