import React from 'react';
import {RouteNames} from "../router/routeNames";
import {Link} from "react-router-dom";
import {Button} from "antd";

const Header = () => {
    return (
        <header>
            <h1>Header</h1>
            <Link to={RouteNames.LANDING}>
               <Button type="primary">back to main page</Button>
            </Link>
        </header>
    );
};

export default Header;