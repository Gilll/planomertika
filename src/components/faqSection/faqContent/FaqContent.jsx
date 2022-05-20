import React from 'react';
import s from './FaqContent.module.scss';

const FaqContent = (props) => {
    return (
        <div className={s.content} {...props}>
            <div className={s.content__title}>{props.title}</div>
            <div className={s.content__text}>{props.text}</div>
        </div>
    );
};

export default FaqContent;
