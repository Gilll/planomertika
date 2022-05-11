// import { Button } from 'antd';
import React from 'react';
import AccentButton from '../button/AccentButton';
import s from './Banner.module.scss';




function Banner() {
    
    const data = {
        title: "Заполнить анкету",
    }

    return (
        <section className={s.Banner}>
            <img className={s.bannerImg} src={process.env.PUBLIC_URL + "/img/banner-img.png"} alt="" />
            <div className="container">
                <button className={s.bannerPlay}>
                    <img src={process.env.PUBLIC_URL + "/img/play.png"} alt="" />
                    <span>Смотреть видео</span>
                </button>
                <div className={s.titleBlock}>
                    <div className={s.description}></div>
                    <div className={s.title}></div>
                    <div className={s.subtitle}></div>
                    <div className={s.bottom}>
                    <AccentButton title={data.title}/>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Banner;