import React, {useState} from 'react';
import s from './Header.module.scss';
import {RouteNames} from "../router/routeNames";
import {Link, NavLink, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {redActions} from "../reducer/actions";
import { MenuOutlined } from '@ant-design/icons';
import CloseOutlined from "@ant-design/icons/lib/icons/CloseOutlined";


const Header = () => {
    const isAuth = useSelector(state => state.isAuth)
	const isAdmin = useSelector(state => state.isAdmin)

	const items = [
		{
			key: '1',
			label: (
				<a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
					1st menu item
				</a>
			),
		},
		{
			key: '2',
			label: (
				<a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
					2nd menu item
				</a>
			),
		},
		{
			key: '3',
			label: (
				<a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
					3rd menu item
				</a>
			),
		},
	];

	const dispatch = useDispatch();
	const navigate = useNavigate();

    const logOut = () => {
		localStorage.removeItem('token')
		localStorage.removeItem('name')
		localStorage.removeItem('surname')
		localStorage.removeItem('email')
		localStorage.removeItem('userId')
		localStorage.removeItem('phoneNumber')
		localStorage.removeItem('uuid')
		localStorage.removeItem('jwtToken')
		localStorage.removeItem('chatUserId')
		localStorage.removeItem('exchangeName')
		localStorage.removeItem('isAdmin')
		dispatch({ type: redActions.setIsAuth, payload: false });
		dispatch({ type: redActions.setIsAdmin, payload: false });
		dispatch({ type: redActions.setUser, payload: {
				name: '',
				email: '',
				phone: '',
				id: ''
			} });
		navigate(RouteNames.LOGIN)
	}

	const [isMobMenuOpen, setIsMobMenuOpen] = useState(false)

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
								{isAdmin ?
									<div className="admin-top-menu">
										<span>Администратор</span>
										<div className="admin-tm-dropdown">
											<div className="admin-tm-dropdown-item">
												<NavLink to={RouteNames.REQUEST} className="link">Активные чаты</NavLink>
											</div>
											<div className="admin-tm-dropdown-item">
												<NavLink to="/requests" className="link">Заказы</NavLink>
											</div>
											<div className="admin-tm-dropdown-item">
												<span onClick={logOut}>Выйти</span>
											</div>
										</div>
									</div>
								:
									<div className="admin-top-menu">
										<span>Профиль</span>
										<div className="admin-tm-dropdown">
											<div className="admin-tm-dropdown-item">
												<NavLink to={RouteNames.REQUEST} className="link">Текущая заявка</NavLink>
											</div>
											<div className="admin-tm-dropdown-item">
												<NavLink to={RouteNames.HISTORY} className="link">История заказов</NavLink>
											</div>
											<div className="admin-tm-dropdown-item">
												<span onClick={logOut}>Выйти</span>
											</div>
										</div>
									</div>
								}
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
						<a className='tel-link' href="tel:+79153370855">+7 (915) 337-08-55</a>
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
				<div className={isMobMenuOpen ? "menu-mobile isOpen" : "menu-mobile"}>
					<MenuOutlined onClick={() => setIsMobMenuOpen(true)}/>
					<div className="menu-mobile-wrapper">
						<CloseOutlined className="close-modal" onClick={() => setIsMobMenuOpen(false)}/>
						<img className="mm-logo" src={process.env.PUBLIC_URL + "/img/logo.svg"} alt="" />
						<div className="mm-tel">
							<a className='tel-link' href="tel:+79153370855">+7 (915) 337-08-55</a>
							<div className="tel-img">
								<img src={process.env.PUBLIC_URL + "/img/tel.svg"} alt="" />
							</div>
						</div>
						<div className="mm-wrapper">
							<div className="mm-item">
								<NavLink to={"/"} onClick={() => setIsMobMenuOpen(false)} className="link">Главная</NavLink>
							</div>
							<div className="mm-item">
								<NavLink to={RouteNames.ABOUT} onClick={() => setIsMobMenuOpen(false)} className="link">О проекте</NavLink>
							</div>
							<div className="mm-item">
								<NavLink to={RouteNames.REVIEWS} onClick={() => setIsMobMenuOpen(false)} className="link">Отзывы</NavLink>
							</div>
							<div className="mm-item">
								<NavLink to={RouteNames.FAQPage} onClick={() => setIsMobMenuOpen(false)} className="link">Вопросы и ответы</NavLink>
							</div>
							<div className="mm-item">
								<NavLink to={RouteNames.CONTACTS} onClick={() => setIsMobMenuOpen(false)} className="link">Контакты</NavLink>
							</div>
							<div className="mm-item">
								{isAuth ?
										<>
												{isAdmin ?

													<>
														<div className="mm-item">
															<NavLink to={RouteNames.REQUEST} onClick={() => setIsMobMenuOpen(false)} className="link">Активные чаты</NavLink>
														</div>
														<div className="mm-item">
															<NavLink to="/requests" onClick={() => setIsMobMenuOpen(false)} className="link">Заказы</NavLink>
														</div>
														<div className="mm-item">
															<span onClick={() => {
																logOut();
																setIsMobMenuOpen(false)
															}}>Выйти</span>
														</div>
													</>
													:
													<>
														<div className="mm-item">
															<NavLink to={RouteNames.REQUEST} onClick={() => setIsMobMenuOpen(false)} className="link">Текущая заявка</NavLink>
														</div>
														<div className="mm-item">
															<NavLink to={RouteNames.HISTORY} onClick={() => setIsMobMenuOpen(false)} className="link">История заказов</NavLink>
														</div>
														<div className="mm-item">
															<span onClick={() => {
																logOut();
																setIsMobMenuOpen(false)
															}}>Выйти</span>
														</div>
													</>
												}
										</>
									: <>
										<NavLink to={RouteNames.LOGIN} onClick={() => setIsMobMenuOpen(false)}
											 className="link">Вход</NavLink> / <NavLink onClick={() => setIsMobMenuOpen(false)} to={RouteNames.REGISTRATION} className="link">Регистрация</NavLink>
									</>
								}
							</div>
							<div className="mm-item">

							</div>
						</div>
					</div>
				</div>
            </div>
            </div>
        </header>
    );
};

export default Header;
