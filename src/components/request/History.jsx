import React, {useEffect, useState} from 'react';
import s from './RequestSteps.module.scss';
import UserAbout from './requestComponents/userAbout/UserAbout';
import {RequestSteps} from "./RequestSteps";
import {Button} from "antd";
import {useApi} from "../../hooks/useApi";
import Loading from "../../pages/Loading";


const History = ({form, setForm, nextStep, orders}) => {
	const [hasDiscount, setHasDiscount] = useState()
	const [checkDiscount, checkDiscountIsLoading] = useApi({
		url: '/clientOrders/checkDiscount',
		method: 'GET'
	});
	const [getReview, setGetReview] = useApi({
		url: '/reviews/' + form.order.id,
		method: 'GET'
	});

	useEffect(() => {
		checkDiscount().then(resp => {
			setHasDiscount(resp)
		})
		getReview().then((resp) => console.log(resp))
		console.log(orders)
	},[])

    return (
        <div className={s.history}>
            <div className="container">
                <div className={s.inner}>
                    <div className={s.quizeBlock}>
                        <div className={s.title}>История заказов</div>
							{orders.filter((el) => el.state.state !== 'READY').length > 0 &&
							<div className="history-list">
								<div className="history-title">Активные</div>
								<div className="history-list__row history-list__title">
									<div className="history-list__col num">№ заказа</div>
									<div className="history-list__col status">Статус</div>
									<div className="history-list__col date">Осталось</div>
								</div>
								{orders.filter((el) => el.state.state !== 'READY').map((order) =>
									<div className="history-list__row bold" key={order.id}>
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
									</div>
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
									<div className="history-list__row bold" key={order.id}>
										<div className="history-list__col num">{order.id}</div>
										<div className="history-list__col date">
											<span>{new Date(order.timeOfChangeState).getDate()}</span>.
											<span>0{new Date(order.timeOfChangeState).getMonth() + 1}</span>.
											<span>{new Date(order.timeOfChangeState).getFullYear()}</span>
										</div>
										<div className="history-list__col sum">{order.amount} RUB</div>
										<div className="history-list__col">
											<a href={order.architectFiles[0].url} className='download' download>
												<img src="/img/download-icon.svg" alt=""/>
												<span>Скачать</span>
											</a>
										</div>
									</div>
								)}
							</div>
							}
                    </div>
                    <div className={s.infoBlock}>
                        <UserAbout user={form.user} noOrder={true} setUser={(val) => setForm({...form, user: val})} modal={form} setModal={setForm}/>
						{checkDiscountIsLoading ?
							<Loading />
						:
							<>
								{hasDiscount ?
									<div className="history-actions">
										<Button className={s.btnDark} onClick={() => nextStep(RequestSteps.QUESTIONNAIRE)} type="primary">Заказать еще вариант со скидкой</Button>
									</div>
								:
									<div className="history-actions">
										<Button className={s.btnDark} onClick={() => nextStep(RequestSteps.QUESTIONNAIRE)} type="primary">Заказать еще</Button>
									</div>
								}
							</>
						}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default History;
