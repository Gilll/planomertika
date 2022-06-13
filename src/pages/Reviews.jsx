// import { data } from 'jquery';
import React, {useState} from 'react';
import BannerOther from '../components/bannerOther/BannerOther';
import ReviewsSection from '../components/ReviewsSection/ReviewsSecion';
import FormSection from './../components/FormSection/FormSection';
import img2 from './../asetss/img/reviewsBanner.png';
import Modal from '../components/Modal/Modal';


const data2 = {
    img2: img2,
}



const Reviews = () => {



    return (
        <div>
            <BannerOther img={data2.img2}/>
            <ReviewsSection />
            <FormSection />

            
        </div>
    );
};

export default Reviews;