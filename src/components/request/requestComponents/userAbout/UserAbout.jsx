import React from 'react';
import { Link } from 'react-router-dom';
import s from './UserAbout.module.scss';





const UserAbout = ({ name, eMail, children }) => {
    const [phone, setphone] = React.useState(false);
    const [btnPhone, setbtnPhone] = React.useState(false);

    const addPhone = () => {
        setphone(true);
    };

    // const changeBtn = () => {
    //     setbtnPhone(prev => !prev);
    // }


    // let btn1 = document.querySelector('#btn1');
    

    const changeBtn = () => {
        let span1 = document.querySelector('#span1');
        let input1 = document.querySelector('#input1');

        setbtnPhone(prev => !prev);
        span1.innerHTML = input1.value;
        console.log(input1.value);
    }
    

    return (
        <div className={s.userAbout}>
            <div className={s.name}>{name}</div>
            <div className={s.eMail}>{eMail}</div>
            <div>
                {/* <form action=""> */}
                    <img src="img/plus.svg" alt="" />
                    <span id='span1' className={`phone ${phone ? 'active' : ''}`} onClick={addPhone}>Добавить телефон</span>
                    <input id='input1' type="text" placeholder='+7 (492) 546 45 45'  />
                    <button id='btn' className={`btn ${btnPhone ? 'active' : ''}`} onClick={changeBtn}>
                        <span className={`span ${btnPhone ? 'active' : ''}`} >546</span>
                    </button>
                {/* </form> */}
            </div>
            <Link to='#' className={s.logOut}>
                <img src="img/logOut.svg" alt="" />
                Выйти
            </Link>
            <div className={s.bottomInfo}>
                {children}
            </div>
        </div>
    );
};

export default UserAbout;