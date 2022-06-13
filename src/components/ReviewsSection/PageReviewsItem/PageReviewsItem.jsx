import React from "react";
import s from "./PageReviewsItem.module.scss";







const PageReviewsItem = (props) => {


    return (
        <div className={s.reviewsItem}>
            <div className={s.avatarBlock}>
                <img src={props.avatar} alt="" />
            </div>
            <div className={s.infoBlock}>
                <div className={s.author}>{props.author}</div>
                <div className={s.place}>{props.place}</div>
                <div className={s.description}>{props.description}</div>
                <div className={s.rangeDate}>
                    <div className={s.rangeWrap}>
                        <img src={props.star} alt="" />
                        <img src={props.star} alt="" />
                        <img src={props.star} alt="" />
                        <img src={props.star} alt="" />
                        <img src={props.star} alt="" />
                    </div>
                    <div className={s.date}>{props.date}</div>
                </div>
                <div className={s.textReview}>{props.textReview}</div>
                <button className={s.more}>Читать полностью</button>
            </div>
        </div>
    );
};


export default PageReviewsItem;