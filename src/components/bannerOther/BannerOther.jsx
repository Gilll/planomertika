import React from "react";
import s from "./BannerOther.module.scss";
import Steps from './../stepsSection/steps/Steps';







const BannerOther = () => {

    return (
        <section className={s.bannerOther}>
            <img className={s.backgroundImg} src={process.env.PUBLIC_URL + "/img/bannerOther1.png"} alt="" />
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