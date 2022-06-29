import React from 'react';
import { RequestSteps } from "./RequestSteps";
import { Button } from "antd";
import s from './RequestSteps.module.scss';
import UserAbout from './requestComponents/userAbout/UserAbout';
import InfoSteps from './requestComponents/infoSteps/InfoSteps';
import Modal from '../Modal/Modal';
import { Statistic } from 'antd';
import Time from './requestComponents/time/Time';
const { Countdown } = Statistic;
const deadline = Date.now() + 1000 * 60 * 60 * 24 * 1 + 1000 * 30; // Moment is also OK



 


const Waiting = ({ nextStep }) => {
    const [modalActive, setModalActive] = React.useState(false);

    const onFinish = () => {
        console.log('finished!');
    };

    const data = {
        numberStep: "4",
        title: "Делаем Вашу планировку",
        par1: "Услуги архитектора как правило носят комплексный характер, и поэтому очень хорошо оплачиваются: долгие согласования, альбомы чертежей, визуализации, развертки и подборки материалов – иногда все это излишне. Это выгодно отличает наш сервис от обычных дизайнерских бюро: в десятки раз дешевле мы предлагаем вам идею планировки вашей квартиры и ничего лишнего – вы можете передавать чертеж строителям уже через сутки после заказа.",
        par2: "На тарифе «Базовый» вы загружаете исходные данные и через 24 часа после оплаты получаете готовую планировку в формате PDF: архитектурный чертеж вашей квартиры в масштабе с нанесением всех перегородок, напольных покрытий, расстановкой необходимой мебели и сантехники, а также экспликацией помещений и балансом площадей.",
    }

    return (
        <div className={s.waiting}>
            <div className="container">
                <div className={s.inner}>
                    <div className={s.quizeBlock}>
                        <div className={s.title}>Архитектор делает планировку для вашей квартиры</div>
                        <Countdown value={deadline} onFinish={onFinish} format="HH:mm:ss"  
                        valueStyle ={{color: '#3f8600',}}/>
                        <div className={s.countdown__keyWrap}>
                            <span>часов</span>
                            <span>минут</span>
                        </div>
                        <Time  hours={0} minutes={1}/>
                    <Button className={s.btnColor} type="primary" onClick={() => nextStep(RequestSteps.RESULT)}>next step</Button>
                    </div>
                    <div className={s.infoBlock}>
                        <UserAbout name="Александр Решетников" eMail="aleksreshetnikov@gmail.com">
                            <div className={s.myAnket} onClick={() => setModalActive(true)}>
                                <img src="img/user.svg" alt="" />
                                <span>
                                    Моя анкета
                                </span>
                                <img src="img/edit2.svg" alt="" />
                            </div>
                        </UserAbout>
                        <InfoSteps numberStep={data.numberStep} title={data.title} par1={data.par1} par2={data.par2} />
                    </div>

                    <Modal active={modalActive} setActive={setModalActive} className={s.modalAnket}>
                        <div className={s.contentWrap}>
                            <div className={s.title}>Моя анкета</div>
                            <div className={s.subtitle}>Просмотрите свою заполненную анкету</div>
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
    );
};

export default Waiting;