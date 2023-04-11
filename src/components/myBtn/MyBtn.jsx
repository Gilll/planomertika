import React from "react";
import s from "./MyBtn.module.scss";





const MyBtn = (props) => {
    return (
        <button className={s.myBtn} onClick={() => props.onClick() }>
            {props.title}
        </button>
    );
};


export default MyBtn;
