import React, { useState, useEffect, useContext } from "react";
import API from "../api";
import LogTerminal from "../components/LogTerminal";
import { TextField, Typography, Button, Paper } from '@mui/material'
import SideBar from "../components/SideBar";
import ExamplePanel from "../components/ExamplePanel";
import TestPanel from "../components/TestPanel";
import MarkdownPanel from "../components/MarkdownPanel";
import Footer from "../components/Footer";
import VersionPanel from "../components/VersionPanel";

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

    const handleExecute = async (data: any) => {
        const result = await api.execute(data)
        console.log(result)
        return result
    }

    const handleExecuteTest = async (test: any) => {
        const data = { id: test.id }
        const result = await api.executeTest(data)
        console.log(result)
    }

    const handleExecuteAllTest = async (logic: any) => {
        for (let test of logic.tests) {
            await handleExecuteTest(test)
        }
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
                        <VersionPanel logic={logic} />
                        <MarkdownPanel logic={logic} />
                        <ExamplePanel
                            logic={logic}
                            onExecute={handleExecute}
                        />
                        <TestPanel
                            logic={logic}
                            onExecuteTest={(test: any) => { handleExecuteTest(test) }}
                            onExecuteAllTest={() => handleExecuteAllTest(logic)}
                        />
                        <h2>Code</h2>
                        <div style={{ height: 300 }}>
                            {logic.code && <LogTerminal text={logic.code} loading={false} />}
                        </div>
                        <div style={{ height: 200 }} />
                    </div>
                }
            </div>
            <div style={{ paddingLeft: 250 }}>
                <Footer />
            </div>
        </div>
    );
};

export default Sample;
