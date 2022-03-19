import React, { useState, useEffect, useContext } from "react";
import API from "../api";
import LogTerminal from "../components/LogTerminal";
import { useParams, useNavigate } from "react-router";
import { TextField, Typography, Button, Paper, Theme, styled } from '@mui/material'
import SideBar from "../components/SideBar";
import ExamplePanel from "../components/ExamplePanel";
import TestPanel from "../components/TestPanel";
import MarkdownPanel from "../components/MarkdownPanel";
import Footer from "../components/Footer";
import InformationPanel from "../components/InformationPanel";
import { AppStore } from "../store/app";
import _ from 'lodash'

const backendAddr = "http://localhost:8000"
const api = new API(backendAddr)

export const Sample: React.FC = () => {
    const logics = useContext(AppStore).state.app.data
    const params = useParams<"name">();
    const logic_name = params.name
    const logic = logics.find(logic => logic.name === logic_name)
    const navigate = useNavigate()

    useEffect(() => {
        if (logics.length > 0) {
            handleChangeLogic(logics[0])
        }
    }, [])

    const handleChangeLogic = (logic: any) => {
        navigate(`/${logic.name}`)
    }

    const handleExecute = async (data: any) => {
        const result = await api.executeLogic(data)
        return result
    }

    const handleExecuteTest = async (test: any) => {
        const data = { id: test.id }
        const result = await api.executeTest(data)
    }

    const handleExecuteAllTest = async (logic: any) => {
        for (let test of logic.tests) {
            await handleExecuteTest(test)
        }
    }

    return (
        <div>
            <SideBar logics={logics} onLogicClick={handleChangeLogic} />
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
