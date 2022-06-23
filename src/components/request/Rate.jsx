import React from 'react';
import { Button } from "antd";
import { RequestSteps } from "./RequestSteps";
import s from './RequestSteps.module.scss';
import RegInfo from './requestComponents/regInfo/RegInfo';
import UserAbout from './requestComponents/userAbout/UserAbout';
import InfoSteps from './requestComponents/infoSteps/InfoSteps';
import { Checkbox } from 'antd';
import Modal from '../Modal/Modal';




const Rate = ({ nextStep }) => {
    const [modalActive, setModalActive] = React.useState(false);


    const data = {
        numberStep: "2",
        title: "Выбор тарифа",
        par1: "Услуги архитектора как правило носят комплексный характер, и поэтому очень хорошо оплачиваются: долгие согласования, альбомы чертежей, визуализации, развертки и подборки материалов – иногда все это излишне. Это выгодно отличает наш сервис от обычных дизайнерских бюро: в десятки раз дешевле мы предлагаем вам идею планировки вашей квартиры и ничего лишнего – вы можете передавать чертеж строителям уже через сутки после заказа.",
        par2: "На тарифе «Базовый» вы загружаете исходные данные и через 24 часа после оплаты получаете готовую планировку в формате PDF: архитектурный чертеж вашей квартиры в масштабе с нанесением всех перегородок, напольных покрытий, расстановкой необходимой мебели и сантехники, а также экспликацией помещений и балансом площадей.",
    }

    return (
        <div className={s.rate}>
            <div className="container">
                <div className={s.inner}>
                    <div className={s.quizeBlock}>
                        <RegInfo />
                        <div className={s.title}>Выберите подходящий для вас тариф</div>
                        <div className={s.selectRate}>
                            <div className={s.rateWrap}>
                                <Checkbox>С чатом с архитектором</Checkbox>
                                <div className={s.price}>4000 <sup>₽</sup></div>
                            </div>
                            <div className={s.aboutRate}>
                                Без проекта перепланировки нельзя приступать к ремонту квартир:
                                Непонятно, что можно изменять в ходе ремонта, а что запрещается законом.
                                Без проекта перепланировки нельзя приступать к ремонту квартир:
                                Непонятно, что можно изменять в ходе ремонта, а что запрещается законом
                            </div>
                            <div className={s.videoWrap}>
                                <div className={s.videoTitle}>Пример работы</div>
                                <div className={s.video}>
                                    <img src="img/video.png" alt="" />
                                    <button>
                                        <img src="img/play.png" alt="" />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className={s.bottomBlock}>
                            <Button className={s.btnColor} type="primary" onClick={() => nextStep(RequestSteps.CHAT)}>Перейти к оплате</Button>
                            <div className={s.logoBank}>
                                <img src="img/logoBank.png" alt="" />
                            </div>
                        </div>
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
                </div>
            </div>
            <Modal active={modalActive} setActive={setModalActive}>
                <div className={s.contentWrap}>
                    dfdfdf
                </div>
            </Modal>
        </div>
    );
};

export default Rate;