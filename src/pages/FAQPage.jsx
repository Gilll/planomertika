import React from 'react';
import BannerOther from './../components/bannerOther/BannerOther';
import img4 from './../asetss/img/faqBanner.png';
import QuestionsSection from '../components/questionsSection/QuestionsSecion';
import FormSection from '../components/FormSection/FormSection';


const data = {
    img4: img4,
}



const Faq = () => {
    return (
        <div>
            <BannerOther img={data.img4}/>
            <QuestionsSection />
            <FormSection />
        </div>
    );
};

export default Faq;