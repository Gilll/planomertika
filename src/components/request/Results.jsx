import React, {useEffect, useState} from 'react';
import { RequestSteps } from "./RequestSteps";
import { Button } from "antd";
import s from './RequestSteps.module.scss';
import UserAbout from './requestComponents/userAbout/UserAbout';
import InfoSteps from './requestComponents/infoSteps/InfoSteps';
import { Rate } from 'antd';
import {useApi} from "../../hooks/useApi";
import Loading from "../../pages/Loading";
import {useNavigate} from "react-router";



const Results = ({ nextStep, form, setForm, archived }) => {

    const data = {
        numberStep: "5",
        title: "Примите результат работы",
        par1: "Услуги архитектора как правило носят комплексный характер, и поэтому очень хорошо оплачиваются: долгие согласования, альбомы чертежей, визуализации, развертки и подборки материалов – иногда все это излишне. Это выгодно отличает наш сервис от обычных дизайнерских бюро: в десятки раз дешевле мы предлагаем вам идею планировки вашей квартиры и ничего лишнего – вы можете передавать чертеж строителям уже через сутки после заказа.",
        par2: "На тарифе «Базовый» вы загружаете исходные данные и через 24 часа после оплаты получаете готовую планировку в формате PDF: архитектурный чертеж вашей квартиры в масштабе с нанесением всех перегородок, напольных покрытий, расстановкой необходимой мебели и сантехники, а также экспликацией помещений и балансом площадей.",
    }
	const [getReview, getReviewIsLoading] = useApi({
		url: '/reviews/' + form.order.id,
		method: 'GET'
	});

    const [finalComment, setFinalComment] = useState('')

    useEffect(() => {
    	console.log(form)
    	if (form.archived) {
			getReview().then((resp) => { setFinalComment(resp[0].comment)})
		}
	},[])

    const [rate, setRate] = useState(4.5);
    const [reviewText, setReviewText] = useState('')

	const [sendReview, sendReviewIsLoading] = useApi({
		url: '/reviews/create',
		data: {
			"comment": "awesome!",
			"mark": rate,
			"orderId": form.order.id
		}
	});

    const navigate = useNavigate()

    const trySendReview = () => {
		sendReview().then(() => navigate('/history'));
	}

    return (
        <div className={s.results}>
            <div className="container">
                <div className={s.inner}>
                    <div className={s.quizeBlock}>
                        <div className={s.title}>Все готово!</div>
                        <div className={s.subtitle}>Файл отправлен на Ваш e-mail,
                        так же вы можете его скачать по ссылке ниже
                        </div>
                        <a href={form.architectFiles[0].url} className={s.download} download>
                                <img src="/img/download-icon.svg" alt="" />
                                <span>Скачать</span>
                        </a>
						{form.archived ?
							<>
								{getReviewIsLoading ?
										<div><Loading /></div>
									:
										<>
											<div className={s.raiting}>
												<div className={s.raitingTitle}>Ваша оценка</div>
												<Rate allowHalf value={4.5} count="5"/>
											</div>
											<div className={s.message}>
												<div className={s.messageTitle}>Ваш отзыв</div>
												<div className={s.messageTitle}>{finalComment}</div>
											</div>
										</>
								}

							</>
							:
							<>
								<div className={s.raiting}>
									<div className={s.raitingTitle}>Оставьте вашу оценку</div>
									<Rate allowHalf value={rate} defaultValue={rate} onChange={(val) => setRate(val)} count="5"/>
								</div>
								<div className={s.message}>
									<div className={s.messageTitle}>Поле для произвольного сообщения</div>
									<textarea value={reviewText} onChange={(e) => setReviewText(e.target.value)} className={s.messageBox} placeholder="Оставьте ваше сообщение" name="" id="" cols="30" rows="10"></textarea>
								</div>
								<Button className={s.btnColor} loading={sendReviewIsLoading} type="primary" onClick={trySendReview}>Отправить</Button>
							</>
						}

                    </div>
                    <div className={s.infoBlock}>
                        <UserAbout user={form.user} setUser={(val) => setForm({...form, user: val})} modal={form} setModal={setForm}/>
                        <InfoSteps numberStep={data.numberStep} title={data.title} par1={data.par1} par2={data.par2} />
                        <Button className={s.btnDark} onClick={() => nextStep(RequestSteps.QUESTIONNAIRE)} type="primary">Заказать еще вариант со скидкой</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Results;
