import React from 'react';
import s from './Header.module.scss';
import {RouteNames} from "../router/routeNames";
import {Link, NavLink} from "react-router-dom";
// import {Button} from "antd";



const Header = () => {
    return (
        <header className={s.header}>
            <div className="container">
            <div className={s.header__inner}>
                <Link className={s.header__logo} to={RouteNames.LANDING}>
                    {/* <Button type="primary">back to main page</Button> */}
                    <img src={process.env.PUBLIC_URL + "/img/logo.svg"} alt="" />
                </Link>
                <nav className={s.header__nav}>
                    <ul className={s.header__list}>
                        <li className={s.header__item}>

                            <NavLink to={RouteNames.ABOUT} className={s.header__link}>О проекте</NavLink>
                        </li>
                        <li className={s.header__item}>
                            <NavLink to={RouteNames.REVIEWS} className={s.header__link}>Отзывы</NavLink>
                        </li>
                        <li className={s.header__item}>
                            <NavLink to={RouteNames.FAQPage} className={s.header__link}>Вопросы и ответы</NavLink>
                        </li>
                        <li className={s.header__item}>
                            <NavLink to={RouteNames.CONTACTS} className={s.header__link}>Контакты</NavLink>
                        </li>
                        <li className={s.header__itemUser}>
                            <div className={s.header__itemImg}>
                                <img src={process.env.PUBLIC_URL + "/img/user.svg"} alt="" />
                            </div>
                            <NavLink to={RouteNames.MYACCOUNT} className={s.header__link}>Личный кабинет</NavLink>
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
            </div>
        </header>
    );
};

export default Header;