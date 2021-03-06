import React from "react";
import MyBtn from "../myBtn/MyBtn";
import s from "./AboutSection.module.scss";







const AboutSection = () => {


    return (
        <section className={s.aboutSection}>
            <div className="container">
                <div className={s.inner}>
                    <div className={s.contentBlock}>
                        <div className={s.heading}>О проекте</div>
                        <div className={s.text}>
                            <div className={s.item}>
                                <div className={s.title}>Зарегистрируйтесь и начните работать с архитектором прямо сейчас!</div>
                                <p>Планировка квартиры должна правильно спроектирована, 
                                    чтобы отвечать двум основным критериям. 
                                    Первое это функциональность и эргономика внутреннего 
                                    пространства квартиры, которые будут соответствовать
                                    всем вашим требованиям и пожеланиям. 
                                    Второе это соответствие всех планировочных решений нормам и 
                                    правилам, установленным законодательством РФ.
                                </p>
                                <p>Объединить эти два важных критерия в одной 
                                    планировке под силу только профессиональному 
                                    архитектору с опытом проектирования и знанием 
                                    всех СНиПов, СанПиНов, ТУ, ФЗ, регламентирующих 
                                    устройство внутридомовых пространств, а именно вашей квартиры.
                                </p>
                                <p>Также наш сервис предлагает вам сделать 
                                    меблировку отдельного помещения – в случае если 
                                    вы не переносите перегородки. Будь это спальня, 
                                    гостиная или санузел, мы поможем грамотно и комфортно 
                                    расположить в нем все предметы интерьера, сантехники, 
                                    бытовой техники и мебели.
                                </p>
                            </div>
                            <div className={s.item}>
                                <div className={s.title}>Результат за 24 часа!</div>
                                <p>Благодаря Планометрике экономия времени переходит на 
                                    новый уровень – вы получите готовое планировочное решение 
                                    вашей квартиры, выполненное профессионалом, всего через 
                                    сутки после заполнения анкеты. 
                                </p>
                                <p>Мы достигли такого уровня оптимизации процесса 
                                    благодаря полному переходу общения в онлайн, 
                                    оперативности наших менеджеров и опыту наших архитекторов.
                                </p>
                            </div>
                        </div>
                        <MyBtn title="Заполнить анкету"/>
                    </div>
                    <div className={s.imgBlock}>
                        <img src={process.env.PUBLIC_URL + "/img/AboutSection.png"} alt="" />
                    </div>
                </div>
            </div>

        </section>
    );
};


export default AboutSection;