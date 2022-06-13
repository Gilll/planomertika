import React from 'react';
import BannerOther from '../components/bannerOther/BannerOther';
import AboutSection from '../components/aboutSection/AboutSecion';
import FormSection from '../components/FormSection/FormSection';
import img1 from './../asetss/img/bannerOther1.png';


const data = {
    img1: img1,
}


const About = () => {
    

    return (
        <div>
            <BannerOther img={data.img1}/>
            <AboutSection />
            <FormSection />
        </div>
    );
};

export default About;