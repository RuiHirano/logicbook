import React, { useEffect, useState } from "react";
import { Paper, Button, TextField, Typography, ButtonGroup, Switch, FormControlLabel } from '@mui/material'
import _ from 'lodash'

export interface Props {
  logic: any
  onExecute: (args: any) => any
}

const ExamplePanel: React.FC<Props> = ({ logic, onExecute }) => {
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



  const handleChangeArgument = (key: string, value: any) => {
    console.log("key", key, value)
    if (selectedIndex !== null) {
      console.log("key 2", key, value)
      const newExamples = [...examples]
      newExamples[selectedIndex].args[key] = value
      setExamples(newExamples)
    }
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
            {examples[selectedIndex].error && <div style={{ marginTop: 20 }}>
              <Typography variant="body2" style={{ textAlign: 'center', fontSize: 15 }}>{examples[selectedIndex].error}</Typography>
            </div>}
            {!examples[selectedIndex].error &&
              <div>
                <h3>Input</h3>
                {Object.keys(examples[selectedIndex].signature).map((key: any) => {
                  const type = examples[selectedIndex].signature[key]
                  const value = examples[selectedIndex].args[key]
                  console.log(type, value)
                  switch (type) {
                    case "int":
                      return (
                        <IntField key={key}
                          label={key}
                          value={value}
                          onChange={(value) => { handleChangeArgument(key, value) }} />

                      )
                    case "float":
                      return (
                        <FloatField key={key}
                          label={key}
                          value={value}
                          onChange={(value) => { handleChangeArgument(key, value) }} />

                      )
                    case "str":
                      return (
                        <StringField key={key}
                          label={key}
                          value={value}
                          onChange={(value) => { handleChangeArgument(key, value) }} />

                      )
                    case "bool":
                      return (
                        <BooleanField key={key}
                          label={key}
                          value={value}
                          onChange={(value) => { handleChangeArgument(key, value) }} />
                      )

                    default:
                      return (
                        <AnyField key={key}
                          label={key}
                          value={value}
                          onChange={(value) => { handleChangeArgument(key, value) }} />
                      )
                  }

                })}
                {/*Object.keys(examples[selectedIndex].args).map((key: any) => {
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
                })*/}
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button style={{ margin: 5 }} variant="contained" onClick={() => handleExecute(selectedIndex)}>Execute</Button>
                  <Button style={{ margin: 5 }} onClick={() => handleReset(selectedIndex)}>Reset</Button>
                </div>
                <h3>Output</h3>
                <Typography>{output ? convertValueToString(output, typeof output) : ""}</Typography>
              </div>
            }
          </div>
        }
      </Paper>
    </div>
  )
};

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

const IntField: React.FC<{ label: string, value: number, onChange: (value: number) => void }> = ({ label, value, onChange }) => {
  return (
    <TextField
      key={`${label}_int`}
      style={{ margin: 5 }}
      size="small"
      label={label}
      type={"number"}
      value={value}
      onChange={(e) => {
        let value = 0
        if (e.target.value !== "") {
          value = parseInt(e.target.value)
        }
        console.log(value)
        onChange(value)
      }}
    />
  )
}

const FloatField: React.FC<{ label: string, value: number, onChange: (value: number) => void }> = ({ label, value, onChange }) => {
  return (
    <TextField
      key={`${label}_float`}
      style={{ margin: 5 }}
      size="small"
      label={label}
      type={"number"}
      value={value}
      onChange={(e) => {
        let value = 0
        if (e.target.value !== "") {
          value = parseFloat(e.target.value)
        }
        console.log(value)
        onChange(value)
      }}
    />
  )
}

const BooleanField: React.FC<{ label: string, value: boolean, onChange: (value: boolean) => void }> = ({ label, value, onChange }) => {
  return (
    <FormControlLabel control={<Switch checked={value} onChange={(e, checked) => { onChange(checked) }} />} label={label} />
  )
}

const StringField: React.FC<{ label: string, value: string, onChange: (value: string) => void }> = ({ label, value, onChange }) => {
  return (
    <TextField
      key={`${label}_string`}
      style={{ margin: 5 }}
      size="small"
      label={label}
      type={"string"}
      value={value}
      onChange={(e) => {
        let value = e.target.value
        onChange(value)
      }}
    />
  )
}

const AnyField: React.FC<{ label: string, value: any, onChange: (value: any) => void }> = ({ label, value, onChange }) => {
  console.log("value", value)
  const str_value = convertValueToString(value, typeof value)
  return (
    <TextField
      key={`${label}_any`}
      style={{ margin: 5 }}
      size="small"
      label={label}
      type={"string"}
      value={str_value}
      onChange={(e) => {
        value = convertStringToValue(e.target.value, typeof value)
        onChange(value)
      }}
    />
  )
}

export default ExamplePanel;
