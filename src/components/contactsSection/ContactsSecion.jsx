import React from "react";
import MyBtn from "../myBtn/MyBtn";
import s from "./ContactsSection.module.scss";
import { YMaps, Map, Placemark } from "react-yandex-maps";
import ContactsBlock from "./ContactsBlock/ContactsBlock";






const ContactsSection = () => {

    return (
        <section className={s.contactsSection}>
            <div className="container">
                <div className={s.inner}>
                    <div className={s.titleWrap}>
                        <div className={s.title}>Как нас найти</div>
                        <MyBtn title="Оставить заявку" />
                    </div>
                    <div className={s.content}>
                        <YMaps>
                            <div className={s.mapWrap}>
                                <Map className={s.map} defaultState={{ center: [55.756128, 37.602382], zoom: 15 }}>
                                    <Placemark geometry={[55.756128, 37.602382]} />
                                </Map>
                            </div>
                        </YMaps>
                        <ContactsBlock />
                    </div>
                </div>
            </div>
        </section>
    );
};


export default ContactsSection;