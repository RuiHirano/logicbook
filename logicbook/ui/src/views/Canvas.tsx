import React, { useState, useEffect, useContext } from "react";
import { styled } from '@mui/material'
import { AppStore } from "../store/app";
import _ from 'lodash'
import { Rnd } from 'react-rnd'
import ClassItem from "../components/ClassItem";
import FunctionItem from "../components/FunctionItem";
import CanvasSideBar from "../components/CanvasSideBar";
import Menu from '@mui/icons-material/Menu';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import CanvasSideMenuBar from "../components/CanvasSideMenuBar";
import MainAppBar from "../components/MainAppBar";

const convertSlashToUnderScore = (name: string) => {
    return name.split("/").join("_")
}

const convertUnderScoreToSlash = (name: string) => {
    return name.split("_").join("/")
}

const Canvas: React.FC = () => {
    const data: any = useContext(AppStore).state.app.data
    const data2: any = useContext(AppStore).state.app.data2
    console.log(data2)
    const sortedFuncs = data.funcs.sort((a: any, b: any) => {
        return a.name.localeCompare(b.name)
    })
    const [logic, setLogic] = useState(data.funcs[0])
    const [open, setOpen] = useState(true)
    const [disabledPan, setDisabledPan] = useState(false)

    const handleChangeLogic = (logic: any) => {
        setLogic(logic)
    }

    const handleToggleSideBar = () => {
        setOpen(!open)
    }

    return (
        <div>
            <MainAppBar onClickMenu={handleToggleSideBar} />
            <CanvasSideMenuBar
                data={data2}
                onClickLogic={handleChangeLogic}
            />
            <CanvasSideBar
                logic={logic}
                open={open}
                onClickClose={handleToggleSideBar}
            />
            {/*<div style={{ paddingLeft: '15vw', width: '300vw', height: '300vh', backgroundColor: 'white' }}>

                <TransformWrapper
                    initialScale={1}
                    maxScale={20}
                    minScale={1}
                    wheel={{ step: 0.1 }}
                    //pinch={{ step: 1 }}
                    centerZoomedOut
                >
                    <TransformComponent>
                        <div style={{ width: "85vw", height: "100vh", backgroundColor: "whitesmoke" }}>
                            {sortedFuncs.map((func: any) => (
                                <Rnd
                                    key={func.id}
                                    //onDragStart={() => setDisabledPan(true)}
                                    //onDragStop={() => setDisabledPan(false)}
                                    //onClick={() => { handleChangeLogic(func) }}
                                    enableResizing={false}
                                    enableDragging={false}
                                    disableDragging
                                    position={{ x: 550, y: 500 }}
                                //default={{ x: 700, y: 500, width: 320, height: 200 }}
                                >
                                    <TransformWrapper
                                        initialScale={0.1}
                                        maxScale={0.1}
                                        minScale={0.1}
                                        disabled={true}
                                    >
                                        <TransformComponent>
                                            <div style={{ height: 200, width: 320 }} onClick={() => { handleChangeLogic(func) }}>
                                                <FunctionItem logic={func} />
                                            </div>
                                        </TransformComponent>
                                    </TransformWrapper>
                                </Rnd>
                            ))}
                            {data.classes.map((cls: any) => (
                                <Rnd
                                    key={cls.id}
                                    //onDragStart={() => setDisabledPan(true)}
                                    //onDragStop={() => setDisabledPan(false)}
                                    //onClick={() => { handleChangeLogic(cls) }}
                                    enableResizing={false}
                                    enableDragging={false}
                                    disableDragging
                                    position={{ x: 500, y: 500 }}
                                >
                                    <TransformWrapper
                                        initialScale={0.1}
                                        maxScale={0.1}
                                        minScale={0.1}
                                        disabled={true}
                                    >
                                        <TransformComponent>
                                            <div style={{ height: 200, width: 320 }} onClick={() => { handleChangeLogic(cls) }}>
                                                <ClassItem logic={cls} />
                                            </div>
                                        </TransformComponent>
                                    </TransformWrapper>
                                </Rnd>
                            ))}
                        </div>
                    </TransformComponent>
                            </TransformWrapper>
            </div>*/}
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

export default Canvas;
