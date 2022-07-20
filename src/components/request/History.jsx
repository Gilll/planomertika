import React from 'react';
import s from './RequestSteps.module.scss';
import UserAbout from './requestComponents/userAbout/UserAbout';


const History = () => {
    return (
        <div className={s.history}>
            <div className="container">
                <div className={s.inner}>
                    <div className={s.quizeBlock}>
                        <div className={s.title}>История заказов</div>
                    </div>
                    <div className={s.infoBlock}>
                        <UserAbout name="Александр Решетников" eMail="aleksreshetnikov@gmail.com">
                        </UserAbout>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default History;