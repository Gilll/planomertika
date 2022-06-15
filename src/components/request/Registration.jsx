import React from 'react';
import { Button } from "antd";
import { RequestSteps } from "./RequestSteps";
import LoginForm from '../loginForm/LoginForm';
import s from './RequestSteps.module.scss';
import BtnDark from '../btnDark/BtnDark';
import MyBtn from '../myBtn/MyBtn';
import {Link} from "react-router-dom";




const Registration = ({ nextStep }) => {
    return (
        <section className={s.login}>
            <div className="container">
                <div className={s.inner}>
                    <div className={s.loginBlock}>
                        <LoginForm>
                            <MyBtn title="Зарегистрироваться" />
                            <BtnDark title="Войти" onClick={() => nextStep(RequestSteps.QUESTIONNAIRE)} />
                        </LoginForm>
                        <div className={s.loginSocial}>
                            <div className={s.socialName}>Войти через социальную сеть</div>
                            <Link to="#" className={s.socialIcon}>
                                <img src="img/fbIcon.svg" alt="" />
                            </Link>
                            <Link to="#" className={s.socialIcon}>
                                <img src="img/vkIcon.svg" alt="" />
                            </Link>
                        </div>
                    </div>
                    <div className={s.infoBlock}>
                        <div className={s.infoItem}>
                            <div className={s.titleItem}>Зарегистрируйтесь и начните работать с архитектором сейчас!</div>
                            <div className={s.subtitleItem}>Планировка квартиры должна быть правильно
                                спроектирована, чтобы отвечать двум основным критериям.
                                Первое это функциональность и эргономика внутреннего пространства квартиры,
                                которые будут соответствовать всем вашим требованиям и пожеланиям.
                                Второе это соответствие всех планировочных решений нормам и правилам,
                                установленным законодательством РФ.
                                Объединить эти два важных критерия в одной планировке под силу только
                                профессиональному архитектору с опытом проектирования и знанием всех СНиПов,
                                СанПиНов, ТУ, ФЗ, регламентирующих устройство внутридомовых пространств, а
                                именно вашей квартиры.
                            </div>
                        </div>
                        <div className={s.infoItem}>
                            <div className={s.titleItem}>Результат за 24 часа!</div>
                            <div className={s.subtitleItem}>Благодаря Планометрике экономия времени переходит на
                                новый уровень – вы получите готовое планировочное решение вашей квартиры,
                                выполненное профессионалом, всего через сутки после заполнения анкеты.
                                Мы достигли такого уровня оптимизации процесса
                                благодаря полному переходу общения в онлайн, оперативности наших менеджеров и
                                опыту наших архитекторов.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Registration;