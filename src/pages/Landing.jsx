import React from 'react';
import {Link} from "react-router-dom";
import {RouteNames} from "../router/routeNames";
import {Button} from "antd";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import img from "../styles/img/img.jpg";//пример импорта картинки напрямую
import Banner from '../components/banner/Banner';

const Landing = () => {
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        className: 'custom-slider'
    };

    return (
        <div className='main'>
            <Banner/>
            <div className="container">
            <h1>Landing</h1>
            <Link to={RouteNames.REQUEST}>
                <Button type="primary">Request page</Button>
            </Link>
            <Slider {...sliderSettings}>
                <div className="item">
                    <h3>1</h3>
                </div>
                <div className="item">
                    <h3>2</h3>
                </div>
                <div className="item">
                    <h3>3</h3>
                </div>
                <div className="item">
                    <h3>4</h3>
                </div>
                <div className="item">
                    <h3>5</h3>
                </div>
                <div className="item">
                    <h3>6</h3>
                </div>
            </Slider>
            <div>пример импорта напрямую</div>
            <img src={img} alt=""/>
            <div>пример импорта из папки /public/img</div>
            <img src={process.env.PUBLIC_URL + "/img/img.jpg"} alt=""/>
            <div>фон блока</div>
            <div className="img-bg"/>
            </div>
        </div>
    );
};

export default Landing;