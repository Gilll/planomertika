import React from 'react';
import img from '../asetss/img/404.png'
import MyBtn from "../components/myBtn/MyBtn";
import {Link} from "react-router-dom";
import {RouteNames} from "../router/routeNames";
import s from "../components/myBtn/MyBtn.module.scss";

const Page404 = () => {
	return (
		<div className="container">
			<div className="page404">
				<div className="page404__img">
					<img src={img} alt=""/>
				</div>
				<div className="page404__info">
					<div className="page404__title">Страница не найдена</div>
					<div className="page404__text">Страница устарела, была удалена или не существовала вовсе</div>
					<Link to={RouteNames.LANDING}>
						<button className={s.myBtn}>Вернуться на главную</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Page404;
