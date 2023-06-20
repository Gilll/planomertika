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
import {useSelector} from "react-redux";
import AdminMain from "../pages/AdminMain";
import Room from "../components/admin/Room";
import Requists from "../pages/Requists";
import Page404 from "../pages/Page404";
import HistoryPage from "../pages/HistoryPage";
import Redirect from "../components/Redirect";
import Restore from "../pages/Restore";

const AppRouter = () => {
	const isAuth = useSelector(state => state.isAuth)
	const isAdmin = useSelector(state => state.isAdmin)

    return (
        <Routes>
            <Route path={RouteNames.LANDING} element={<Landing/>}/>
			{isAdmin ?
				<>
					<Route path='/request' element={<AdminMain/>}>
						<Route path='/request/:id' element={<Room/>}/>
						<Route index element={<Room/>}/>
					</Route>
					<Route path='/requests' element={<Requists/>}/>
				</>
				:
				<>
					<Route path='/request' element={<Request/>}/>
					<Route path='/request/new' element={<Request newOrder={true}/>}/>
					<Route path='/request/:id' element={<Request/>}/>
					<Route path={RouteNames.HISTORY} element={<HistoryPage/>}/>
				</>
			}
            <Route path={RouteNames.ABOUT} element={<About/>}/>
            <Route path={RouteNames.REVIEWS} element={<Reviews/>}/>
            <Route path={RouteNames.FAQPage} element={<FAQPage/>}/>
            <Route path={RouteNames.CONTACTS} element={<Contacts/>}/>
            <Route path={RouteNames.MYACCOUNT} element={<MyAccount/>}/>
			{isAuth ?
				<>
					<Route path={RouteNames.LOGIN} element={<Redirect/>}/>
					<Route path={RouteNames.REGISTRATION} element={<Redirect/>}/>
					<Route path={RouteNames.RESTORE_PASS} element={<Redirect/>}/>
				</>
			:
				<Route element={<AuthWrapper/>}>
					<Route path={RouteNames.LOGIN} element={<Login/>}/>
					<Route path={RouteNames.REGISTRATION} element={<Registration/>}/>
					<Route path={RouteNames.RESTORE_PASS} element={<Restore/>}/>
				</Route>
			}

			<Route path='*' element={<Page404 />}/>
        </Routes>
    );
};

export default AppRouter;
