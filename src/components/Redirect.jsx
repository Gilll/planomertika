import React, {useEffect} from 'react';
import {useNavigate} from "react-router";
import {RouteNames} from "../router/routeNames";

const Redirect = () => {
	const navigate = useNavigate()
	useEffect(() => {
		navigate(RouteNames.LANDING)
	},[])
	return (
		<div/>
	);
};

export default Redirect;
