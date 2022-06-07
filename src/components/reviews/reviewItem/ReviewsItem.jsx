import React from "react";
import s from "./ReviewsItem.module.scss";









const ReviewsItem = (props) => {

    return (

        <div className={s.item}>
            <div className={s.imgBlock}>
                <img src="" alt="" />
            </div>
            <div className={s.textBlock}>
                <div className={s.author}>{props.title}</div>
                <div className={s.date}>{props.comment}</div>
                <div className={s.text}>Всем привет!  Начинаются работы на стройке жилого комплекса.
                    Предлагаю здесь обмениваться фотографиями и новостями. Всем привет!
                    Начинаются работы на стройке жилого комплекса. Всем привет!
                    Начинаются работы на стройке жилого комплекса. Предлагаю здесь обмениваться фотографиями и новостями.
                </div>
                <div className={s.bottomBlock}></div>
            </div>
        </div>


    );
};


export default ReviewsItem;