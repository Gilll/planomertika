import React from "react";
import s from "./Reviews.module.scss";
import MyBtn from './../myBtn/MyBtn';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import ReviewsItem from "./reviewItem/ReviewsItem";









const Reviews = () => {

    const data = {
        title: "Оставить отзыв",
    }

    const reviews = [
        {title: 'title1', comment: 'comment1'},
        {title: 'title2', comment: 'comment2'}
    ]

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        className: 'custom-slider',
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />
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
                            <ReviewsItem />
                            <ReviewsItem />
                            <ReviewsItem />
                        </Slider>
                    </div>
                </div>
            </div>

        </section>
    );
};


export default Reviews;