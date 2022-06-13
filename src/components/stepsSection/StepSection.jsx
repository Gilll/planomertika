// import { Steps } from 'antd';
import React from 'react';
// import StepItem from './stepItem/StepItem';
import s from './StepSection.module.scss';
// import img1 from './../../asetss/img/step1.svg';
// import img2 from './../../asetss/img/step2.svg';
// import img3 from './../../asetss/img/step3.svg';
// import img4 from './../../asetss/img/step4.svg';
// 
import Steps from './steps/Steps';




const StepSection = () => {
    
    return (
        <section className={s.stepSection}>
            <div className='container'>
                <div className={s.stepSection__inner}>
                    <div className={s.stepSection__top}>
                        <div className={s.stepSection__title}>Шаги к вашей задумке</div>
                        <div className={s.stepSection__parBlock}>
                            <p>Профессиональные архитекторы создадут по вашим пожеланиям в 
                                кротчайшие сроки план. Будем рады Вас проконсультировать по любому вопросу. 
                                Профессиональные архитекторы создадут по вашим пожеланиям в кротчайшие сроки план. 
                            </p>
                            <p>Профессиональные архитекторы создадут по вашим пожеланиям в кротчайшие сроки план. 
                                Будем рады Вас проконсультировать по любому вопросу.  
                                Будем рады Вас проконсультировать по любому вопросу. 
                            </p>
                        </div>
                    </div>
                    <Steps />
                </div>
            </div>
        </section>
    );
};

export default StepSection;