import React, {useEffect} from 'react';
import s from './RequestSteps.module.scss';
import UserAbout from "./requestComponents/userAbout/UserAbout";
import InfoSteps from "./requestComponents/infoSteps/InfoSteps";
import {useApi} from "../../hooks/useApi";
import {RequestSteps} from "./RequestSteps";
import img from "../../asetss/img/waiting.png"

const WaitingForRoom = ({ nextStep, form, setForm }) => {
	const [getRuquest, getRuquestIsLoading] = useApi({
		url: '/clientOrders/getOrdersFilter',
		data: {
			countElementOnPage: 100,
			numPage: 0
		}
	});

	useEffect(() => {
		const timerID = setInterval(() => getRuquest().then((resp) => {
			console.log(resp);
			let dtOrd = resp.orderResponseList.filter((el) => el.id === form.order.id)[0]
			if (dtOrd.state.state === 'DIALOG_CREATED') {
				nextStep(RequestSteps.CHAT)
				setForm({...form, orderState: 'DIALOG_CREATED', chatId: dtOrd.chatDialogId, timeOfChangeState: dtOrd.timeOfChangeState})
			}
		}), 5000);
		return () => clearInterval(timerID);
	},[])

	const data = {
		numberStep: "3",
		title: "Чат с архитектором",
		par1: "Услуги архитектора как правило носят комплексный характер, и поэтому очень хорошо оплачиваются: долгие согласования, альбомы чертежей, визуализации, развертки и подборки материалов – иногда все это излишне. Это выгодно отличает наш сервис от обычных дизайнерских бюро: в десятки раз дешевле мы предлагаем вам идею планировки вашей квартиры и ничего лишнего – вы можете передавать чертеж строителям уже через сутки после заказа.",
		par2: "На тарифе «Базовый» вы загружаете исходные данные и через 24 часа после оплаты получаете готовую планировку в формате PDF: архитектурный чертеж вашей квартиры в масштабе с нанесением всех перегородок, напольных покрытий, расстановкой необходимой мебели и сантехники, а также экспликацией помещений и балансом площадей.",
	}

	return (
		<div className={s.chatBlock}>
			<div className="container">
				<div className={s.inner}>
					<div className={s.quizeBlock}>
						<div className={s.title}>Обсудите с архитектором необходимые детали</div>
						<div className={s.chat}>
							<div className="chat-room user">
								<div className="chat-room__container">
									<div className="chat-room__title">
										<div className="chat-room__title-name">Чат с архитектором</div>
										<div className="chat-room__title-email">Архитектор</div>
									</div>
									<div className="chat-room__waiting-room">
										<div className="chat-room__waiting-img">
											<img src={img} alt=""/>
										</div>
										<div className="chat-room__waiting-title">Чат создается</div>
										<div className="chat-room__waiting-text">Пожалуйста, подождите 5 минут, пока система</div>
										<div className="chat-room__waiting-text">создает комнату с архитектором.</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className={s.infoBlock}>
						<UserAbout user={form.user} setUser={(val) => setForm({...form, user: val})} modal={form} setModal={setForm}/>
						<InfoSteps numberStep={data.numberStep} title={data.title} par1={data.par1} par2={data.par2} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default WaitingForRoom;
