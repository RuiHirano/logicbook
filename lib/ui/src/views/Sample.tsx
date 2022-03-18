import React, { useState, useEffect, useContext } from "react";
import API from "../api";
import LogTerminal from "../components/LogTerminal";
import { makeStyles } from '@mui/styles';
import { TextField, Typography, Button, Paper, Theme, styled } from '@mui/material'
import SideBar from "../components/SideBar";
import ExamplePanel from "../components/ExamplePanel";
import TestPanel from "../components/TestPanel";
import MarkdownPanel from "../components/MarkdownPanel";
import Footer from "../components/Footer";
import InformationPanel from "../components/InformationPanel";

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
        const result = await api.executeLogic(data)
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
            <Body>
                {!logic && <Typography variant="h5">Loading</Typography>}
                {logic &&
                    <div>
                        <h1>{logic.name}</h1>
                        <InformationPanel logic={logic} />
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
            </Body>
            <div style={{ paddingLeft: 250 }}>
                <Footer />
            </div>
        </div >
    );
};

const Body = styled('div')(({ theme }) => ({
    margin: 30,
    paddingLeft: 250,
    [theme.breakpoints.up('lg')]: {
        marginLeft: 100,
        marginRight: 100,
    },
    [theme.breakpoints.up('xl')]: {
        marginLeft: 200,
        marginRight: 200,
    },
}));

export default Sample;
