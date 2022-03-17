import React, { useEffect, useState } from "react";
import { Paper, Button, TextField, Typography, ButtonGroup } from '@mui/material'
import _ from 'lodash'

export interface Props {
  logic: any
  onExecute: (input: any) => any
}

const ExamplePanel: React.FC<Props> = ({ logic, onExecute }) => {
  const defaultExamples = _.cloneDeep([...logic.examples])
  const [examples, setExamples] = useState(defaultExamples)
  const [selectedIndex, setSelectedIndex] = useState(examples.length > 0 ? 0 : null)
  const [output, setOutput] = useState(null)
  console.log('ExamplePanel', logic.examples, examples)

  useEffect(() => {
    (async () => {
      if (selectedIndex !== null) {
        const input = examples[selectedIndex].input
        const result = await onExecute(input)
        setOutput(result)
      }
    })()
  }, [])


  const handleReset = async (index: number) => {
    const newExamples = [...examples]
    newExamples[index].input = _.cloneDeep(logic.examples)[index].input
    setExamples(newExamples)
  }

  const handleExecute = async (index: number) => {
    const reuslt = await onExecute(examples[index].input)
    console.log("result", reuslt)
    setOutput(reuslt)
  }

  return (
    <div>
      <h2>Example</h2>
      <Paper style={{ padding: 30 }}>
        {selectedIndex === null && <Typography variant="h6">{"No example selected"}</Typography>}
        {selectedIndex !== null &&
          <div>
            <ButtonGroup variant="outlined" aria-label="outlined primary button group">
              {examples.map((ex: any, i: number) => (
                <Button key={i} size="small" onClick={() => setSelectedIndex(i)}>{ex.name}</Button>
              ))}
            </ButtonGroup>
            <h3>Input</h3>
            {Object.keys(examples[selectedIndex].input).map((key: any) => {
              console.log(key, examples[selectedIndex])
              return (
                <TextField key={`${examples[selectedIndex].name}_${key}`} size="small" label={key} value={examples[selectedIndex].input[key]}
                  onChange={(e) => {
                    const newExamples = [...examples]
                    newExamples[selectedIndex].input[key] = e.target.value
                    setExamples(newExamples)
                  }}
                />)
            })}
            <Button variant="contained" onClick={() => handleExecute(selectedIndex)}>Execute</Button>
            <Button onClick={() => handleReset(selectedIndex)}>Reset</Button>
            <h3>Output</h3>
            <Typography>{output}</Typography>
          </div>
        }
      </Paper>
    </div>
  )
};

export default ExamplePanel;
