import React from 'react';
import BannerOther from '../components/bannerOther/BannerOther';
import img5 from '../asetss/img/contactsBanner.png';
import ContactsSection from '../components/contactsSection/ContactsSecion';
import FormSection from '../components/FormSection/FormSection';


const data = {
    img5: img5,
}

const Contacts = () => {
    return (
        <div>
            <BannerOther img={data.img5} />
            <ContactsSection />
            <FormSection />
        </div>
    );
};

export default Contacts;