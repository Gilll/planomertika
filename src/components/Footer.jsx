import React from 'react';
import { Link } from 'react-router-dom';
import s from './Footer.module.scss';
import {RouteNames} from "../router/routeNames";


const Footer = () => {
    return (
        <footer className={s.footer}>
            <div className="container">
                <div className={s.inner}>
                    <Link to="#" className={s.logo}>
                        <img src={process.env.PUBLIC_URL + "/img/logoWhite.svg"} alt="" />
                    </Link>
                    <div className={s.addressWrap}>
                        <div className={s.addressItem}>г.Москва, Берсеневская наб., 20, 119072</div>
						<a href="tel:+79153370855" className={s.addressItem}>+7 (915) 337-08-55</a>
                        <Link to="#" className={s.addressItem}>info@lichtschneider.ru</Link>
                    </div>
                    <ul className={s.navList}>
                        <li>
                            <Link to={RouteNames.ABOUT} className={s.footerLink}>Компания</Link>
                        </li>
                        <li>
                            <Link to={RouteNames.ABOUT} className={s.footerLink}>Фабрики</Link>
                        </li>
                        <li>
                            <Link to={RouteNames.ABOUT} className={s.footerLink}>Под заказ</Link>
                        </li>
                        <li>
                            <Link to={RouteNames.ABOUT} className={s.footerLink}>Доставка</Link>
                        </li>
                        <li>
                            <Link to={RouteNames.ABOUT} className={s.footerLink}>Контакты</Link>
                        </li>
                    </ul>
                    <ul className={s.navList}>
                        <li>
                            <Link to={RouteNames.ABOUT} className={s.footerLink}>План</Link>
                        </li>
                        <li>
                            <Link to={RouteNames.ABOUT} className={s.footerLink}>Обоснования</Link>
                        </li>
                        <li>
                            <Link to={RouteNames.ABOUT} className={s.footerLink}>Планировка</Link>
                        </li>
                        <li>
                            <Link to={RouteNames.ABOUT} className={s.footerLink}>Комнаты</Link>
                        </li>
                        <li>
                            <Link to={RouteNames.ABOUT} className={s.footerLink}>Стены</Link>
                        </li>
                        <li>
                            <Link to={RouteNames.ABOUT} className={s.footerLink}>Мебель</Link>
                        </li>
                    </ul>
                    <div className={s.logoDeveloper}>
                        <img src={process.env.PUBLIC_URL + "/img/logoDeveloper.svg"} alt="" />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
