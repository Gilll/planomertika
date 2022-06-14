import React from 'react';
import BannerOther from './../components/bannerOther/BannerOther';
import img4 from './../asetss/img/faqBanner.png';
import QuestionsSection from '../components/questionsSection/QuestionsSecion';


const data = {
    img4: img4,
}



const Faq = () => {
    return (
        <div>
            <BannerOther img={data.img4}/>
            <QuestionsSection />
        </div>
    );
};

export default Faq;