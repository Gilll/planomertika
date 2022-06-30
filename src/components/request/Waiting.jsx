import React from 'react';
import { RequestSteps } from "./RequestSteps";
import { Button } from "antd";
import s from './RequestSteps.module.scss';
import UserAbout from './requestComponents/userAbout/UserAbout';
import InfoSteps from './requestComponents/infoSteps/InfoSteps';
import Modal from '../Modal/Modal';
import Time from './requestComponents/time/Time';



const Waiting = ({ hours = 0, minutes = 0, seconds = 10, nextStep}) => {
    const [modalActive, setModalActive] = React.useState(false);

    const [over, setOver] = React.useState(false);
    const [[h, m, sec], setTime] = React.useState([hours, minutes, seconds]);

    const tick = () => {

        if (h === 0 && m === 0 && sec === 0) {
            setOver(true);
            console.log('Время вышло')
        } else if (m === 0 && sec === 0) {
            setTime([h - 1, 59, 59]);
        } else if (sec === 0) {
            setTime([h, m - 1, 59]);
        } else {
            setTime([h, m, sec - 1]);
        }
    };

    React.useEffect(() => {
        const timerID = setInterval(() => tick(), 1000);
        return () => clearInterval(timerID);
    });

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
                        <Time  hours={0} minutes={0} seconds={10}>
                            <Button className={over ? "BtnColorTime active" : 'BtnColorTime'} onClick={() => nextStep(RequestSteps.RESULT)} type="primary">Скачать план</Button>
                        </Time>
                    
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