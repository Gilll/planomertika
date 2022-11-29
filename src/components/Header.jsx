import React from 'react';
import s from './Header.module.scss';
import {RouteNames} from "../router/routeNames";
import {Link, NavLink} from "react-router-dom";
import {useSelector} from "react-redux";


const Header = () => {
    const isAuth = useSelector(state => state.isAuth)

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
                            <NavLink to={RouteNames.ABOUT} className="link">О проекте</NavLink>
                        </li>
                        <li className={s.header__item}>
                            <NavLink to={RouteNames.REVIEWS} className="link">Отзывы</NavLink>
                        </li>
                        <li className={s.header__item}>
                            <NavLink to={RouteNames.FAQPage} className="link">Вопросы и ответы</NavLink>
                        </li>
                        <li className={s.header__item}>
                            <NavLink to={RouteNames.CONTACTS} className="link">Контакты</NavLink>
                        </li>
                        {isAuth ?
                            <li className={s.header__itemUser}>
                                <div className={s.header__itemImg}>
                                    <img src={process.env.PUBLIC_URL + "/img/user.svg"} alt="" />
                                </div>
                                <NavLink to={RouteNames.REQUEST} className="link">Заявка</NavLink>
                            </li>
                        :
                            <li className={s.header__item}>
                                <NavLink to={RouteNames.LOGIN} className="link">Вход</NavLink> / <NavLink to={RouteNames.REGISTRATION} className="link">Регистрация</NavLink>
                            </li>
                        }
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