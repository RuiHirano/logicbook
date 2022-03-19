import React from "react";
import { Routes as RouteList, Route, Navigate } from "react-router-dom";
import Sample from "./views/Sample";

const Routes: React.FC = () => {

    return (
        <RouteList>
            <Route path="/" element={<Sample />} />
            <Route path="/logics/:name" element={<Sample />} />
            <Route element={<Navigate replace to="/not-found" />} />
        </RouteList>
    );
};

export default Routes;
