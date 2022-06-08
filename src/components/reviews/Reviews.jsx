import React from "react";
import s from "./Reviews.module.scss";
import MyBtn from './../myBtn/MyBtn';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import ReviewsItem from "./reviewItem/ReviewsItem";
import img from './../../asetss/img/rev1.png';
import img2 from './../../asetss/img/rev1.png';



const Reviews = () => {

    const data = {
        title: "Оставить отзыв",
    }

    const reviews = [
        {
            img: img, name: 'Александр и Валерия Решетниковы',
            date: 'Москва,  20 мая 2022',
            text: 'Всем привет!  Начинаются работы на стройке жилого комплекса. Предлагаю здесь обмениваться фотографиями и новостями. Всем привет!  Начинаются работы на стройке жилого комплекса. Всем привет!  Начинаются работы на стройке жилого комплекса. Предлагаю здесь обмениваться фотографиями и новостями. '
        },
        {
            img: img2,
            name: 'Настя и Коля Какие-Нибудь',
            date: 'comment1',
            text: 'text1'
        },
    ]

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        className: 'custom-slider',
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        dotsClass: 'dots',
    };


    function NextArrow(props) {
        const { onClick } = props;
        return (
            <div
                className={s.nextArrow}
                onClick={onClick}
            />
        );
    }

    function PrevArrow(props) {
        const { onClick } = props;
        return (
            <div
                className={s.prevArrow}
                onClick={onClick}
            />
        );
    }



    return (
        <section className={s.reviews}>
            <div className="container">
                <div className={s.inner}>
                    <div className={s.titleWrap}>
                        <div className={s.title}>Отзывы</div>
                        <MyBtn title={data.title} />
                    </div>
                    <div className="">
                        <Slider  {...sliderSettings}>
                            {reviews.map((reviews, index) =>
                                <ReviewsItem img={reviews.img} name={reviews.name} date={reviews.date} text={reviews.text} />
                            )}
                        </Slider>
                    </div>
                </div>
            </div>
        </section>
    );
};


export default Reviews;