import React from "react";
import PageReviewsItem from "./PageReviewsItem/PageReviewsItem";
import s from "./ReviewsSection.module.scss";
import img2 from './../../asetss/img/avaReviews2.png';
import img3 from './../../asetss/img/avaReviews3.png';
import img4 from './../../asetss/img/avaReviews4.png';
import img5 from './../../asetss/img/avaReviews5.png';
import img6 from './../../asetss/img/avaReviews5.png';
import star from './../../asetss/img/starGold.svg';



const reviewsItem = [
    {
        avatar: img4,
        author: "Лена и Кирилл",
        place: "г. Москва",
        description: "Из большой однушки, просторную двушку",
        star: star,
        date: "12 декабря",
        textReview: "Особое спасибо за помощь в грамотном расположении мебели в пространстве квартиры. Нам здесь очень комфортно.",
		result: '/img/2017-04-17 Planometrika Andrey.pdf'
    },
    {
        avatar: img5,
        author: "Никита",
        place: "г. Тюмень",
        description: "Ребята умудрились сделать гардеробную в спальне и организовать рабочее место!",
        star: star,
        date: "11 декабря",
        textReview: "Купить квартиру для меня оказалась в разы проще, чем сделать ремонт, особенно приступить к нему...",
		result: '/img/2017-04-17 Planometrika Andrey.pdf'
    },
    {
        avatar: img2,
        author: "Антон и Ася",
        place: "г. Москва",
        description: "Спасибо ребятам из planometrika.ru!",
        star: star,
        date: "10 декабря",
        textReview: "Мы-Антон и Ася. Живем втроем с абиссинским котом Эшером в нашей любимой квартире. В свое время эта квартира стала подарком родителе...",
		result: '/img/2017-04-17 Planometrika Andrey.pdf'
    },
    {
        avatar: img6,
        author: "Ренат",
        place: "г. Санкт-Петербург",
        description: "Cовременное минималистичное жилье с максимально открытой, свободной планировкой",
        star: star,
        date: "9 марта 2021",
        textReview: "Друзья из штатов рассказали про сервис онлайн-планировок, они так самостоятельно сделали свою квартиру – оказывается у нас в России...",
		result: '/img/2017-04-17 Planometrika Andrey.pdf'
    },
    {
        avatar: img3,
        author: "Данила",
        place: "г. Санкт-Петербург",
        description: "Угловая квартира стала головной болью – мы никак не могли ее грамотно распланировать",
        star: star,
        date: "9 марта 2021",
        textReview: "Квартиру в новостройке нам с женой помогли приобрести родители, мы ее долго выбирали, нас очень подкупило количество окон и балконов",
		result: '/img/2017-04-17 Planometrika Andrey.pdf'
    },
]



const ReviewsSection = () => {


    return (
        <section className={s.reviewsSection}>
            <div className="container">
                <div className={s.inner}>
                    <div className={s.title}>Отзывы клиентов</div>
                    <div className={s.reviewsWrap}>
                    {reviewsItem.map((reviewsItem, index) =>
                        <PageReviewsItem key={index}
                            avatar={reviewsItem.avatar}
                            author={reviewsItem.author}
                            place={reviewsItem.place}
                            description={reviewsItem.description}
                            star={reviewsItem.star}
                            date={reviewsItem.date}
							result={reviewsItem.result}
                            textReview={reviewsItem.textReview}
                        />
                    )}
                    </div>
                </div>
            </div>
        </section>
    );
};


export default ReviewsSection;
