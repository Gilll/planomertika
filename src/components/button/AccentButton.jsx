import React from 'react';
import s from './AccentButton.module.scss';
// import {RouteNames} from "../router/routeNames";
// import {Link, NavLink} from "react-router-dom";
// import {Button} from "antd";



const AccentButton = (props) => {
    return (
        <button className={s.AccentButton}>
            {props.title}
        </button>
    );
};

export default AccentButton();