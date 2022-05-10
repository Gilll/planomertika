import React from 'react';
import s from './Header.module.scss';
import {RouteNames} from "../router/routeNames";
import {Link, NavLink} from "react-router-dom";
// import {Button} from "antd";



const Header = () => {
    return (
        <header className={s.header}>
            <div className={s.header__inner}>
                <Link className={s.header__logo} to={RouteNames.LANDING}>
                    {/* <Button type="primary">back to main page</Button> */}
                    <img src={process.env.PUBLIC_URL + "/img/logo.svg"} alt="" />
                </Link>
                <nav className={s.header__nav}>
                    <ul className={s.header__list}>
                        <li className={s.header__item}>
                            <a href="">О проекте</a>
                        </li>
                        <li className={s.header__item}>
                            <a href="">Отзывы</a>
                        </li>
                        <li className={s.header__item}>
                            <a href="">Вопросы и ответы</a>
                        </li>
                        <li className={s.header__item}>
                            <a href="">Контакты</a>
                        </li>
                        <li className={s.header__itemUser}>
                            <div className={s.header__itemImg}>
                                <img src={process.env.PUBLIC_URL + "/img/user.svg"} alt="" />
                            </div>
                            <a href="">Личный кабинет</a>
                        </li>
                    </ul>
                </nav>
                <div className={s.header__contact}>
                    <div className={s.header__tel}>
                        <a className='tel-link' href="tel:+84951201420">8 (495) 120-14-20</a>
                        <div className="tel-img">
                            <img src={process.env.PUBLIC_URL + "/img/tel.svg"} alt="" />
                        </div>
                    </div>
                    <div className={s.header__contactUs}>
                        <a className="contact-us__link" href="#">
                            Оставить заявку
                            <img src={process.env.PUBLIC_URL + "/img/mail.svg"} alt="" />
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;