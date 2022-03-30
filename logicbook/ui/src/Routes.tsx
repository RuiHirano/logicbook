import React from "react";
import { Routes as RouteList, Route, Navigate } from "react-router-dom";
import Canvas from "./views/Canvas";
import Sample from "./views/Sample";

const Routes: React.FC = () => {

    return (
        <RouteList>
            <Route path="/" element={<Canvas />} />
            <Route path="/logics/:name" element={<Sample />} />
            <Route path="/canvas" element={<Canvas />} />
            <Route element={<Navigate replace to="/not-found" />} />
        </RouteList>
    );
};

export default Routes;
