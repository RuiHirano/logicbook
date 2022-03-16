import React, { useState, useEffect, useContext } from "react";
import API from "../api";
import LogTerminal from "../components/LogTerminal";
import { TextField, Typography, Button, Paper } from '@mui/material'
import SideBar from "../components/SideBar";
import ExamplePanel from "../components/ExamplePanel";
import TestPanel from "../components/TestPanel";

const backendAddr = "http://localhost:8000"
const api = new API(backendAddr)

const Sample: React.FC = () => {

    const [logics, setLogics] = useState<any>([])
    const [logic, setLogic] = useState<any>(null)

    useEffect(() => {
        (async () => {
            const data = await api.getData()
            console.log(data)
            setLogics(data)
            if (data.length > 0) {
                setLogic(data[0])
            }
        })()
    }, [])

    const handleExecute = async (input: any) => {
        const data = input
        const result = await api.execute(data)
        console.log(result)
        return result
    }

    return (
        <div>
            <SideBar logics={logics} onLogicClick={(logic) => { setLogic(logic) }} />
            <div style={{ margin: 30, paddingLeft: 250 }}>
                {!logic && <Typography variant="h5">Loading</Typography>}
                {logic &&
                    <div>
                        <h1>{logic.name}</h1>
                        <Typography variant="h6">{"logic1.sum_logic"}</Typography>
                        <h2>Version</h2>
                        <Paper style={{ padding: 30 }}>
                            <Typography variant="h6">{"Version: 1.0.2"}</Typography>
                            <Typography variant="h6">{"Branch: develop"}</Typography>
                            <Typography variant="h6">{"Commit: 8edm23c"}</Typography>
                        </Paper>
                        <h2>ReadMe</h2>
                        <Paper style={{ padding: 30 }}>
                            <Typography>{"Description of SumLogic"}</Typography>
                        </Paper>
                        <ExamplePanel
                            logic={logic}
                            onExecute={handleExecute}
                        />
                        <h2>Usage</h2>
                        <div style={{ height: 150 }}>
                            {<LogTerminal text={
                                `from logic1 import sum_logic\n\nresult = sum_logic.sum(1, 2)`
                            } loading={false} />}
                        </div>
                        <h2>Code</h2>
                        <div style={{ height: 300 }}>
                            {logic.code && <LogTerminal text={logic.code} loading={false} />}
                        </div>
                        <TestPanel
                            logic={logic}
                            onExecute={() => { }}
                        />
                    </div>
                }
            </div>
        </div>
    );
};

export default Sample;
