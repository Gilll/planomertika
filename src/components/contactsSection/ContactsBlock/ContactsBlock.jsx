
import React from "react";
import s from "./ContactsBlock.module.scss";



const ContactsBlock = () => {
    const [visible, setVisible] = React.useState(true);

    const handleClose = () => {
        setVisible(false);
    };

    return (
        <>
            {visible ? (
                <div className={s.contacts}>
                    <div className={s.top}>
                        <div className={s.logo}>
                            <img src="img/logoMedium.png" alt="" />
                        </div>
                        <div className={s.blockTitle}>Контакты</div>
                        <button className={s.blockClose} onClick={() => handleClose()}>
                            <img src="img/clouseIcon.svg" alt="" />
                        </button>
                    </div>
                    <div className={s.info}>
                        <div className={s.infoItem}>
                            <div className={s.key}>Адрес</div>
                            <div className={s.value}>г. Москва, Малый Кисловский переулок д.9 к.1</div>
                        </div>
                        <div className={s.infoItem}>
                            <div className={s.key}>Телефон</div>
                            <a href="tel:+89959044150" className={s.value}>8 (995) 904-41-50</a>
                        </div>
                        <div className={s.infoItem}>
                            <div className={s.key}>Режим</div>
                            <div className={s.value}>Пн-Пт: 10-20 / Сб-Вс: 10-15</div>
                        </div>
                        <div className={s.infoItem}>
                            <div className={s.key}>Метро</div>
                            <div className={s.value}>Арбатская</div>
                        </div>
                        <div className={s.infoItem}>
                            <div className={s.key}>Реквизиты</div>
                            <div className={s.value}>ИНН 771579800634 ОГРН:&nbsp;313774619000634</div>
                        </div>
                    </div>
                    <div className={s.bottom}>
                        <div className={s.bottomTitle}>Заключение договора</div>
                        <div className={s.bottomInfo}>Работа сервиса PLANOMETRIKA осуществляется в соответствии с договором офертой</div>
                    </div>
                </div>
            ) : null}
        </>
    );
};


export default ContactsBlock;



