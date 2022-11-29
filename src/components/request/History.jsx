import React from 'react';
import s from './RequestSteps.module.scss';
import UserAbout from './requestComponents/userAbout/UserAbout';


const History = ({form, setForm}) => {
    return (
        <div className={s.history}>
            <div className="container">
                <div className={s.inner}>
                    <div className={s.quizeBlock}>
                        <div className={s.title}>История заказов</div>
                    </div>
                    <div className={s.infoBlock}>
                        <UserAbout user={form.user} setUser={(val) => setForm({...form, user: val})} modal={form} setModal={setForm}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default History;