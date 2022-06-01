import React from 'react';
import s from './StepItem.module.scss';






const StepItem = (props) => {
    
    return (
        <div className={s.stepItem} {...props}>
            <div className={s.stepItem__img}>
                <img src={props.img} alt="" />
            </div>
            <div className={s.stepItem__content}>
                <div className={s.stepItem__title}>{props.title}</div>
                <div className={s.stepItem__subtitle}>{props.subtitle}</div>
            </div>
        </div>
    );
};

export default StepItem;