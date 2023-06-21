import React from "react";
import MyBtn from "../myBtn/MyBtn";
import s from "./AboutSection.module.scss";
import {RouteNames} from "../../router/routeNames";
import {Link} from "react-router-dom";







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
								<p>Наш сервис поможет вам быстро, за 24 часа, и за разумные деньги получить планировочное решение вашей квартиры, разработанное специально для вас. Каждый человек рано или поздно сталкивается с необходимостью сделать ремонт в своей квартире, будь то новостройка, будь, то обычный дом в спальном районе. Для того чтобы сделать ремонт, вам понадобится план вашей будущей квартиры. Чтобы вам было комфортно жить в квартире, планировка должна быть удобной для вас и всех, кто с вам будет проживать.
									</p>
								<p>Многие люди скажут, что знают сами как хотят расположить стены в своей квартире и без проблем сами удобно расставят мебель. Мы понимаем и ценим ваше стремление к самостоятельному решению вопросу будущей планировки вашей квартиры, и хотим вас оградить от возможных ошибок в проектировании пространства. Мы хотим помочь вам, чтобы каждый квадратный метр вашей квартиры использовался с пользой и был комфортен для вас.
									</p>
								<p>При самостоятельном проектировании можно не учесть все нормы и правила, установленные нашим законодательством, такие как нормы СанПиН, СНиП и требования ТБТИ. Нормы, установленные законодательством РФ обязательны к соблюдению при проведении ремонтно-строительных работ в вашей квартире. Вы столкнётесь с ними, когда после ремонта вы придете в районное ТБТИ и Мосжилинспекцию для внесения изменений в ваш паспорт жилого помещения, а именно в план БТИ. Для того чтобы Бюро Технической Инвентаризации (БТИ) внесло изменения в ваш документ на квартиру все установленные нормы должны быть соблюдены. Ещё одна сложность, с которой вы можете столкнуться при проектировании - это минимальное необходимое пространство для расположения санузла или расположения кухонного оборудования. К примеру, можно допустить ошибку и потом получить очень близко расположенный унитаз к стене и неудобно расположенную стиральную машинку к углу, которой невозможно пользоваться.
								</p>
								<p>Немаловажный момент взаимопонимания вас и ваших рабочих, которые будут вам делать ремонт. Когда любой рабочий, будь то обычный разнорабочий или профессиональный строитель, встречает вас и заводит разговор о ремонте квартиры, он спросит: Есть ли план того, что вы хотите? Есть ли планы по перепланировке вашей квартиры?
								План вашей будущей квартиры, а именно план перепланировки - это тот минимальный материал, который нужен в любом случае для ремонта вашей квартиры. Вам посоветуют, обращаясь в проектное бюро или архитектурную студию, но вы можете столкнуться с тем, что стоимость проектирования складывается из количества квадратных метров вашей квартиры, сроки проектирования будут не менее пары недель, а то и месяцев.
								В проектной организации основная цель - получить клиента, а после всеми способами убедить его, что ему необходимы чертежи для ремонта, и получить с клиента максимальное количество работ для своего бюро. Для бюро интересны комплексные заказы, которые обеспечат бюро загрузкой на долгое время и позволят оплачивать работы специалистам разных назначений.
								</p>
								<p>Наш сервис специализируется на самом главном, с чего начинается любой ремонт - это планировка. Мы предлагаем фиксированную стоимость за планировочное решение, выполняем работы за 24 часа, делаем планировку для вас, удобной и с учетом всех норм и правил, установленных нашим законодательством. Вам не нужно, тратить время на поездку к нам в офис и время на общение с менеджерами и составления технического задания и заполнения договоров.
								</p>
								<p>Мы работаем онлайн и на связи с вами все 24 часа, которые будут потрачены на создание удобной планировки для вас.
								</p>
                            </div>
                        </div>
                        <Link to={RouteNames.REQUEST}><MyBtn title="Заполнить анкету"/></Link>
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
