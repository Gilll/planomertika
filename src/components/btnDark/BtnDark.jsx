import React from "react";
import s from "./BtnDark.module.scss";





const BtnDark = ({title}) => {
    return (
        <button className={s.btnDark}>
            {title}
        </button>
    );
};


export default BtnDark;