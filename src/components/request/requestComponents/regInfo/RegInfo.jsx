import React from 'react';
import s from './RegInfo.module.scss';





const RegInfo = () => {
    return (
        <div className={s.regInfo}>
            <div className={s.icon}>
                <img src="img/done.svg" alt="" />
            </div>
            <div className={s.text}>
                <div className={s.title}>Регистрация прошла успешно!</div>
                <div className={s.subtitle}>
                    Вам на e-mail отправлено письмо с вашим паролем, который
                    вы можете заменить в личном кабинете, в разделе настроек.
                </div>
            </div>
        </div>
    );
};

export default RegInfo;