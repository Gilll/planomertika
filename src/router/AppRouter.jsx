import React from 'react';
import {Route, Routes} from "react-router";
import {RouteNames} from "./routeNames";
import Landing from "../pages/Landing";
import Request from "../pages/Request";

const AppRouter = () => {
    return (
        <Routes>
            <Route path={RouteNames.LANDING} element={<Landing/>}/>
            <Route path={RouteNames.REQUEST} element={<Request/>}/>
        </Routes>
    );
};

export default AppRouter;