import React from "react";
import MyBtn from "../myBtn/MyBtn";
import s from "./Banner.module.scss";







const Banner = () => {

    const data = {
        title: "Заполнить анкету",
    }

    return (
        <section className={s.banner}>
            <img className={s.banner__img} src={process.env.PUBLIC_URL + "/img/banner-img.png"} alt="" />
            <div className="container">
                <div className={s.banner__inner}>
                <button className={s.banner__btnVideo}>
                    <img src={process.env.PUBLIC_URL + "/img/play.png"} alt="" />
                    <span className={s.banner__btnVideoName}>Смотреть видео</span>
                </button>
                <div className={s.banner__content}>
                    <div className={s.banner__description}>От профессиональных архитекторов</div>
                    <div className={s.banner__title}>Planometrika</div>
                    <div className={s.banner__subtitle}>Планировочное решение вашей квартиры</div>
                    <div className={s.banner__contentBottom}>
                    <MyBtn title={data.title}/>
                    <div className={s.banner__price}>
                        <span>3 500 р.</span>/24 часа
                    </div>
                </div>
                </div>
                </div>
            </div>
        </section>
    );
};


export default Banner;