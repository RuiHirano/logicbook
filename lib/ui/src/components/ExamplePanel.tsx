import React, { useEffect, useState } from "react";
import { Paper, Button, TextField, Typography, ButtonGroup } from '@mui/material'
import _ from 'lodash'

export interface Props {
  logic: any
  onExecute: (args: any) => any
}

// TODO: fix useState to store the args value
const ExamplePanel: React.FC<Props> = ({ logic, onExecute }) => {
  const defaultExamples = _.cloneDeep([...logic.examples])
  const [examples, setExamples] = useState([...logic.examples])
  const [selectedIndex, setSelectedIndex] = useState(examples.length > 0 ? 0 : null)
  const [output, setOutput] = useState(null)

  useEffect(() => {
    (async () => {
      setExamples([...logic.examples])
      if (selectedIndex !== null) {
        const data = { id: logic.id, args: logic.examples[selectedIndex].args }
        const result = await onExecute(data)
        setOutput(result)
      }
    })()
  }, [logic])


  const handleReset = async (index: number) => {
    const newExamples = [...examples]
    newExamples[index].args = _.cloneDeep(examples)[index].args
    setExamples(newExamples)
  }

  const handleExecute = async (index: number) => {
    const data = { id: logic.id, args: logic.examples[index].args }
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
      return parseFloat(string)
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
            <Button variant="contained" onClick={() => handleExecute(selectedIndex)}>Execute</Button>
            <Button onClick={() => handleReset(selectedIndex)}>Reset</Button>
            <h3>Output</h3>
            <Typography>{convertValueToString(output, typeof output)}</Typography>
          </div>
        }
      </Paper>
    </div>
  )
};

export default ExamplePanel;
