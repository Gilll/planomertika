import React from "react";
import Form from "./form/Form";
import s from "./FormSection.module.scss";
// import Accordion from "./accordion/Accordion";
// import MyButton from '../myBtn/MyBtn';



const FormSection = () => {


    return (
        <section className={s.formSection}>
            <img src={process.env.PUBLIC_URL + "/img/formSectionImg.png"} alt="" />
            <div className="container">
                <div className={s.inner}>
                    <Form />

                </div>
            </div>
        </section>
    );
};


export default FormSection;