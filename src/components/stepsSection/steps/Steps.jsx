import React from 'react';
import s from './Steps.module.scss';
import StepItem from './../stepItem/StepItem';
import img1 from './../../../asetss/img/step1.svg';
import img2 from './../../../asetss/img/step2.svg';
import img3 from './../../../asetss/img/step3.svg';
import img4 from './../../../asetss/img/step4.svg';



const data = {
    img1: img1,
    img2: img2,
    img3: img3,
    img4: img4,

    title1: "01 - Анкета онлайн",
    title2: "02 - Онлайн оплата",
    title3: "03 - Чат с архитектором",
    title4: "04 - Планировка готова",

    subtitle1: "Заполните анкету и укажите в ней свои пожелания, которые помогут нашим специалистам создать идеальный план специально для Вас.",
    subtitle2: "Выберите подходящий для Вас тариф, и оплатите его онлайн с помощью кредитной карты. Мы заботимся о безопасности Ваших данных.",
    subtitle3: "Мы учтем Ваши пожелания и предоставим план перепланировки от профессионального архитектора.",
    subtitle4: "Вы получаете готовый план перепланировки от профессионала. При желании Вы можете заказать дополнительный вариант со скидкой.",

}


const Steps = (props) => {

    return (
        <div className={s.stepSection}>
            <StepItem img={data.img1} title={data.title1} subtitle={data.subtitle1} />
            <StepItem img={data.img2} title={data.title2} subtitle={data.subtitle2} />
            <StepItem img={data.img3} title={data.title3} subtitle={data.subtitle3} />
            <StepItem img={data.img4} title={data.title4} subtitle={data.subtitle4} />
        </div>
    );
};

export default Steps;