import React from "react";
import s from "./Accordion.module.scss";
import AccordionItem from "./accordionItem/AccordionItem";



const Accordion = () => {


    return (
        <section className={s.accordion}>
            <div className="container">
                <AccordionItem />
            </div>
        </section>
    );
};


export default Accordion;