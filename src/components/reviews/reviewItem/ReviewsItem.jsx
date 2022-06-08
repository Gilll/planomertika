import React from "react";
import s from "./ReviewsItem.module.scss";









const ReviewsItem = (props) => {

    return (
        <div className={s.item} >
            <div className={s.imgBlock}>
                <img src={props.img} alt="" />
            </div>
            <div className={s.textBlock}>
                <div className={s.author}>{props.name}</div>
                <div className={s.date}>{props.date}</div>
                <div className={s.text}>{props.text}
                </div>
                <div className={s.bottomBlock}></div>
            </div>
        </div>
    );
};


export default ReviewsItem;

