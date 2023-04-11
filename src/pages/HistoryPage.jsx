import React, {useEffect, useState} from 'react';
import {useApi} from "../hooks/useApi";
import s from "../components/request/RequestSteps.module.scss";
import UserAbout from "../components/request/requestComponents/userAbout/UserAbout";
import Loading from "./Loading";
import {Button} from "antd";
import {Link} from "react-router-dom";

const HistoryPage = () => {
	const [hasDiscount, setHasDiscount] = useState()
	const [orders, setOrders] = useState([])
	const [checkDiscount, checkDiscountIsLoading] = useApi({
		url: '/clientOrders/checkDiscount',
		method: 'GET'
	});
	const [getRuquest, getRuquestIsLoading] = useApi({
		url: '/clientOrders/getOrdersFilter',
		data: {
			countElementOnPage: 100,
			numPage: 0
		}
	});

	const [form, setForm] = useState({
		order: {
			id: ''
		},
		orderState: '',
		questionnaire: {
			tenantsCount: '',
			pet: '',
			petAdvanced: '',
			age: '',
			childrens: '',
			childrensCount: '',
			childrensAge: [],
			guests: '',
			guestsCount: ''
		},
		rooms: {
			hallway: false,
			bedroom: false,
			childrensroom: false,
			kitchen: false,
			bathroom: false,
			livingroom: false,
			wardrobe: false,
			cabinet: false,
			advanced: ''
		},
		archived: false,
		timeOfChangeState: '',
		architectFiles: '',
		files: [],
		user: {
			name: localStorage.getItem('name'),
			surname: localStorage.getItem('surname'),
			email: localStorage.getItem('email'),
			phone: localStorage.getItem('phone')
		}
	})

	useEffect(() => {
		checkDiscount().then(resp => {
			setHasDiscount(resp)
		})
		getRuquest().then((resp) => {
			setOrders(resp.orderResponseList)
		})
		console.log(orders)
	},[])

	const newOrder = () => {
		console.log('newOrder');
	}
	const newOrderDiscount = () => {
		console.log('newOrderDiscount');
	}

	return (
		<div className={s.history}>
			<div className="container">
				<div className={s.inner}>
					<div className={s.quizeBlock}>
						<div className={s.title}>История заказов</div>
						{getRuquestIsLoading ?
							<div><Loading /></div>
							:<>
						{orders.filter((el) => el.state.state !== 'READY').length > 0 &&
						<div className="history-list">
							<div className="history-title">Активные</div>
							<div className="history-list__row history-list__title">
								<div className="history-list__col num">№ заказа</div>
								<div className="history-list__col status">Статус</div>
								<div className="history-list__col date">Дата</div>
							</div>
							{orders.filter((el) => el.state.state !== 'READY').map((order) =>
								<Link to={'/request/' + order.id} className="history-list__row bold" key={order.id}>
									<div className="history-list__col num">{order.id}</div>
									<div className="history-list__col status">
										{{
											'CREATED': 'Заполнена анкета',
											'LATE': 'Опаздывает',
											'IN_WORK': 'В работе',
											'DIALOG_CREATED': 'Обсуждение'
										}[order.state.state]}
									</div>
									<div className="history-list__col date">
										{order.state.state !== 'CREATED' &&
										<>
											<span>{new Date(order.timeOfChangeState).getDate()}</span>.
											<span>0{new Date(order.timeOfChangeState).getMonth() + 1}</span>.
											<span>{new Date(order.timeOfChangeState).getFullYear()}</span>
										</>
										}
									</div>
								</Link>
							)}
						</div>
						}
						{orders.filter((el) => el.state.state === 'READY').length > 0 &&
						<div className="history-list">
							<div className="history-title">В архиве</div>
							<div className="history-list__row history-list__title">
								<div className="history-list__col num">№ заказа</div>
								<div className="history-list__col date">Дата</div>
								<div className="history-list__col sum">Сумма</div>
								<div className="history-list__col">Файл</div>
							</div>
							{orders.filter((el) => el.state.state === 'READY').map((order) =>
								<Link to={'/request/' + order.id} className="history-list__row bold" key={order.id}>
									<div className="history-list__col num">{order.id}</div>
									<div className="history-list__col date">
										<span>{new Date(order.timeOfChangeState).getDate()}</span>.
										<span>0{new Date(order.timeOfChangeState).getMonth() + 1}</span>.
										<span>{new Date(order.timeOfChangeState).getFullYear()}</span>
									</div>
									<div className="history-list__col sum">{order.amount} RUB</div>
									<div className="history-list__col">
										<a onClick={(e) => e.stopPropagation()} href={order.architectFiles[0].url} className='download' download>
											<img src="img/download-icon.svg" alt=""/>
											<span>Скачать</span>
										</a>
									</div>
								</Link>
							)}
						</div>
						}
						</>}
					</div>
					<div className={s.infoBlock}>
						<UserAbout user={form.user} noOrder={true} setUser={(val) => setForm({...form, user: val})} modal={form} setModal={setForm}/>
						{(getRuquestIsLoading || checkDiscountIsLoading) ?
							<Loading />
							:
							<>{orders.filter((el) => el.state.state !== 'READY').length === 0 && <>
								{hasDiscount ?
									<div className="history-actions">
										<Link to={'/request/new'}>
											<Button className={s.btnDark} onClick={newOrder} type="primary">Заказать еще вариант со скидкой</Button>
										</Link>
									</div>
									:
									<div className="history-actions">
										<Link to={'/request/new'}>
											<Button className={s.btnDark} onClick={newOrderDiscount} type="primary">Заказать еще</Button>
										</Link>
									</div>
								}
							</>}</>
						}

					</div>
				</div>
			</div>
		</div>
	);
};

export default HistoryPage;
