import React from 'react';
import { Link } from 'react-router-dom';
import s from './UserAbout.module.scss';





const UserAbout = ({name, eMail}) => {



    
    return (
        <div className={s.userAbout}>
            <div className={s.name}>{name}</div>
            <div className={s.eMail}>{eMail}</div>
            <div className={s.phone}>
                <img src="img/plus.svg" alt="" />
                <input type="text" placeholder='Добавить телефон'/>
            </div>
            <Link to='#' className={s.logOut}>
                <img src="img/logOut.svg" alt="" />
                Выйти
            </Link>
            <div className={s.infoMoney}>
                <img src="img/money.svg" alt="" />
                <span>Вы еще не внесли оплату</span>
            </div>
        </div>
    );
};

export default UserAbout;