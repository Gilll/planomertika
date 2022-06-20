import React from 'react';
import s from './InfoSteps.module.scss';





const InfoSteps = ({ numberStep, title, par1, par2, par3 }) => {
    return (
        <div className={s.infoStepBlock}>
            <div className={s.numberStep}>
                <span>{numberStep}</span>
            </div>
            <div className={s.title}>
                {title}
            </div>
            <div className={s.text}>
                <p>{par1}</p>
                <p>{par2}</p>
                <p>{par3}</p>
            </div>
        </div>
    );
};

export default InfoSteps;