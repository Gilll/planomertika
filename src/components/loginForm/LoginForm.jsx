
import React from "react";
import s from "./LoginForm.module.scss";





const LoginForm = ({children}) => {
    return (
        <div className={s.loginForm}>
            <div className={s.title}>Регистрация</div>
            <form action="">
                <div className={s.inputsWrap}>
                <input type="text" className={s.input} placeholder="Ваше имя" />
                <input type="number" className={s.input} placeholder="Номер телефона" />
                </div>
                <div className={s.buttonsWrap}>
                    {children}
                </div>
            </form>
        </div>
    );
};


export default LoginForm;