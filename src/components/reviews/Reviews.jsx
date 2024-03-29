import React from "react";
import s from "./Reviews.module.scss";
import MyBtn from './../myBtn/MyBtn';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import ReviewsItem from "./reviewItem/ReviewsItem";
import img1 from './../../asetss/img/avaReviews1.png';
import img2 from './../../asetss/img/avaReviews2.png';
import img3 from './../../asetss/img/avaReviews3.png';
import img4 from './../../asetss/img/avaReviews4.png';
import img5 from './../../asetss/img/avaReviews5.png';
import img6 from './../../asetss/img/avaReviews6.png';
import img7 from './../../asetss/img/avaReviews7.png';



const Reviews = (props) => {


    const data = {
        title: "Оставить отзыв",
    }

    const reviews = [
        {
            img: img5,
            name: 'Никита',
            date: 'Москва,  20 мая 2022',
			result: '/img/2017-04-17 Planometrika nikita.pdf',
            text: <>
					<p>Купить квартиру для меня оказалась в разы проще, чем сделать ремонт, особенно приступить к нему. Я пытался на бумажках самостоятельно нарисовать планировку, но все получалось как-то криво, с коридорами, странными выпирающими углами. В общем, требовалась помощь профессионала, а стоимость проекта в архитектурном бюро была довольно пугающей. В этом плане, Planometrika стала реальной помощью. </p>
					<p>На моих скромных сорока метрах ребята умудрились сделать гардеробную в спальне и организовать рабочее место – я и не представлял, что в таком ограниченном пространстве можно все так грамотно разместить.
						Сейчас в моей квартире ремонт уже завершается, и я в предвкушении переезда – это действительно очень удобное и хорошо спланированное жилье.
					</p>
				</>
        },
        {
            img: img6,
            name: 'Ренат ',
            date: 'Москва,  20 мая 2022',
            text: <>
				<p>У меня было представление, что я примерно хочу от этой квартиры – хотелось современное минималистичное жилье с максимально открытой, свободной планировкой, с большим количеством встроенной техники. Но на деле оказалось все намного сложнее – ничего не умещалось, а строители просили планировку квартиры – без нее никак не могли приступить к ремонту. В общем на этом этапе все и остановилось. Друзья из штатов рассказали про сервис онлайн-планировок, они так самостоятельно сделали свою квартиру – оказывается у нас в России тоже есть такая услуга – Planometrika. </p>
				<p>Прораб замерил для нас пустую квартиру, я подробно описал все свои пожелания в онлайн-форме, а уже через два дня строители приступили к возведению перегородок. Если не Planometrika, я бы скорее всего до сих пор во всем этом барахтался. Спасибо, Planometrika!</p>
			</>,
			result: '/img/2017-04-17 Planometrika Renat.pdf',
        },
        {
            img: img3,
            name: 'Данила',
            date: 'Москва,  20 мая 2022',
			result: '/img/2017-04-17 Planometrika Danila.pdf',
            text: 'Квартиру в новостройке нам с женой помогли приобрести родители, мы ее долго выбирали, нас очень подкупило количество окон и балконов – квартира обещала быть светлой и хорошо проветриваемой. По площадям мы прикинули, что по идее должны поместиться спальня, детская, кухня, гостиная и санузел. Но на деле там еще были стояки, а в планировке постоянно получались странные треугольники из перегородок. В общем такая угловая квартира стала головной болью – мы никак не могли ее грамотно распланировать. Архитекторы из Planometrika справились с этим на отлично – все комнаты имеют большое количество хранения, они даже сумели организовать гостевой санузел и удобный гардероб при входе. Наши строители тоже оценили планировку на пять, говорят, что в такой грамотной планировке провести все коммуникации не составит никаких проблем. '
        },
        {
            img: img2,
            name: 'Антон и Настя.',
            date: 'Москва,  20 мая 2022',
			result: '/img/2017-04-17 Planometrika Anton.pdf',
            text: 'Квартиру мы приобрели уже с ремонтом, но нам хотелось что-то частично поменять и добавить, чтобы сделать квартиру удобной именно для нас, но мы понимали, что если мы будем заказывать полный дизайн-проект и углубляться в детали, то процесс переезда затянется на долгие месяцы. Нам хотелось быстро сделать ремонт, и мы знали точно, что и где хотим, нам нужно было получить чертеж что бы строители поняли нас и сделали все в короткий срок. Сервис Planometrika оправдал наши ожидания, мы быстро заполнили анкету, написали наши пожелания по изменениям в планировки и уже на следующий день получили готовую планировку, выполненную специально для нас!    '
        },
        {
            img: img4,
            name: 'Кирилл и Лена.',
            date: 'Москва,  20 мая 2022',
			result: '/img/2017-04-17 Planometrika Lena i Kirill.pdf',
			text: 'Нам с супругой досталась квартира от нашего дедушки в доме академиков наук, квартира старинная в историческом доме. В квартире много старинных вещей дорогих для нас, которые мы хотели оставить, но при этом мы все же хотели добавить современных элементов в интерьер, и хотели функционально изменить зонировании квартиры. Квартира советских времен очень просторная и большой площади, с большой парадной прихожей целых 12 м2, и у нас родилась идея перенести в это пространство кухню, сделав ее в виде скрытой кухни-нищи, для того что бы использовать площадь существующей кухни под дополнительную спальню. Мы очень много читали в интернете материала по поводу перепланировки и не знали можно ли сделать, и тут увидели рекламу сервиса по онлайн перепланировки Planometrika, увидели много положительных отзывов и еще стоимость услугу очень приятная и мы решили обратиться с нашим вопросом. В итоге уже на следующий день мы получили обоснование по возможности реализации нашей идеи и получили отличное планировочное решение, в которое мы влюбились с мужем и в итоге сдали отличный ремонт! Спасибо команде Planometrika за помощь! '
		},
        {
            img: img7,
            name: 'Юля',
            date: 'Москва,  20 мая 2022',
			result: '/img/2017-04-17 Planometrika Ulia.pdf',
			text: 'Мы с мужем купили квартиру с отделкой white box еще на начальном этапе строительства, но, когда застройщик заканчивал строительство нашего ЖК, мы уже ждали пополнение в нашей семье. Сразу встал вопрос в том, что нам нужно будет каким-то минимальными средствами адаптировать наше жилье под нашего нового члена семьи, мы понимали, что нам нужно добавить зон хранения и сделать за место нашей спальни детскую, а нашу спальню перенести на место кабинета, но при этом еще нужно было добавить ванну в санузел, и сохранить душевую кабину… и все это при этом что бы не менять кардинально уже готовый ремонт с отделкой white box от застройщика. Тут я поняла, что самим в короткие сроки нам не справиться, да и дизайн студиям не будет интересно делать такие фрагментарные работы, и тут мне подружка посоветовала сервис Planometrika, в который она обратилась при похожей проблеме. И я сначала скептически отнеслась к этой идеи, но потом, когда прочитала отзывы и еще увидела, что стоимость очень приятная, да и результат ты получаешь через 24 часа, я сразу приняла решение что это то что нужно для нас! И я не прогадала! '
		},
        {
            img: img1,
            name: 'Андрей',
            date: 'Москва,  20 мая 2022',
			result: '/img/2017-04-17 Planometrika Andrey.pdf',
			text: 'Я искал подходящую для себя небольшую квартиру в новостройках Москвы, но при выборе разных вариантов я столкнулся с такой проблемой, что я не понимал получиться ли у меня в том или ином варианте сделать то что я хочу, получиться ли сделать изолированную спальню и при этом уместить различные зоны хранения еще я хотел, чтобы у меня была кухня столовая и гостиная и что бы все помещения имели естественное освещение. И тут мне знакомые риелторы посоветовали перед окончательным выбором и покупкой квартиры обратиться в сервис Planometrika, чтобы понять смогу ли я в понравившихся мне вариантах уместить все что я хочу. Я заказал в сервисе планировку трех понравившихся мне квартир и уже на следующий день я получил варианты планировочных решений исходя из моих пожеланий и сразу увидел, то что лучше всего подходит для меня. Благодаря сервису Planometrika я еще на этапе выборе квартиры уже сразу выбрал тот вариант, который для меня будет самый комфортный. '
		},
    ]



    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        className: 'custom-slider',
        nextArrow: <Next />,
        prevArrow: <Prev />,
        dotsClass: 'dots',
    };


    function Next(props) {
        const { onClick } = props;
        return (
            <div
                className={s.arNext}
                onClick={onClick}
            />
        );
    }

    function Prev(props) {
        const { onClick } = props;
        return (
            <div
                className={s.arPrev}
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
                    </div>
                    <div className="">
                        <Slider  {...sliderSettings}>
                            {reviews.map((reviews, index) =>
                                <ReviewsItem key={index} img={reviews.img} name={reviews.name} date={reviews.date} text={reviews.text} result={reviews.result} />
                            )}
                        </Slider>
                    </div>
                </div>
            </div>
        </section>
    );
};


export default Reviews;
