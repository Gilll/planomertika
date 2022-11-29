import React from 'react';
import {Route, Routes} from "react-router";
import {RouteNames} from "./routeNames";
import Landing from "../pages/Landing";
import Request from "../pages/Request";
import About from '../pages/About';
import Reviews from '../pages/Reviews';
import FAQPage from '../pages/FAQPage';
import Contacts from '../pages/Contacts';
import MyAccount from '../pages/MyAccount';
import AuthWrapper from "../components/AuthWrapper";
import Login from "../pages/Login";
import Registration from "../pages/Registration";




const AppRouter = () => {
    return (
        <Routes>
            <Route path={RouteNames.LANDING} element={<Landing/>}/>
            <Route path={RouteNames.REQUEST} element={<Request/>}/>
            <Route path={RouteNames.ABOUT} element={<About/>}/>
            <Route path={RouteNames.REVIEWS} element={<Reviews/>}/>
            <Route path={RouteNames.FAQPage} element={<FAQPage/>}/>
            <Route path={RouteNames.CONTACTS} element={<Contacts/>}/>
            <Route path={RouteNames.MYACCOUNT} element={<MyAccount/>}/>
            <Route element={<AuthWrapper/>}>
                <Route path={RouteNames.LOGIN} element={<Login/>}/>
                <Route path={RouteNames.REGISTRATION} element={<Registration/>}/>
            </Route>
        </Routes>
    );
};

export default AppRouter;