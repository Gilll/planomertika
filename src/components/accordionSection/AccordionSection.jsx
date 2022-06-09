import React from "react";
import s from "./AccordionSection.module.scss";
import Accordion from "./accordion/Accordion";
import MyButton from '../myBtn/MyBtn';



const AccordionSection = () => {


    return (
        <section className={s.accordionSection}>
            <div className="container">
                <div className={s.inner}>
                    <div className={s.titleBlock}>
                        <div className={s.title}>Вопросы</div>
                        <div className={s.subtitle}>Если Вы собираетесь сделать ремонт в квартире,
                            сначала нужно согласовать работы по перепланировке в Мосжилинспекции.
                            Для этого Вам потребуется проект перепланировки и техничесвкое заключение.
                            Если Вы собираетесь сделать ремонт в квартире,
                            сначала нужно согласовать работы по перепланировке в
                            Мосжилинспекции.
                        </div>
                        <MyButton title={"Задать вопрос"} />
                    </div>
                    <div className={s.accordionBlock}>
                        <Accordion />
                    </div>
                </div>
            </div>
        </section>
    );
};


export default AccordionSection;