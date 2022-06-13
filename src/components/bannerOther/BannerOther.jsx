import React from "react";
import s from "./BannerOther.module.scss";
import Steps from './../stepsSection/steps/Steps';







const BannerOther = (props) => {

    return (
        <section className={s.bannerOther}>
            <img className={s.backgroundImg} src={props.img} alt="" />
            <div className="container">
                <div className={s.inner}>
                    <div className={s.content}>
                        <Steps />
                    </div>
                </div>
            </div>
        </section>
    );
};


export default BannerOther;