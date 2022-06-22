import React from 'react';
// import { Link } from "react-router-dom";
// import { RouteNames } from "../router/routeNames";
// import { Button } from "antd";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import Slider from "react-slick";
// import img from "../styles/img/img.jpg";//пример импорта картинки напрямую
import Banner from '../components/banner/Banner';
import FaqSection from '../components/faqSection/FaqSection';
import StepSection from '../components/stepsSection/StepSection';
import Reviews from '../components/reviews/Reviews';
import AccordionSection from '../components/accordionSection/AccordionSection';
import FormSection from '../components/FormSection/FormSection';








const Landing = () => {

    return (
        <div className='main'>
            <Banner />
            <StepSection />
            <FaqSection />
            <Reviews />
            <AccordionSection />
            <FormSection />
        </div>
    );
};

export default Landing;