import React from 'react';
import { Button } from "antd";
import { RequestSteps } from "./RequestSteps";
import s from './RequestSteps.module.scss';
import RegInfo from './requestComponents/regInfo/RegInfo';
import UserAbout from './requestComponents/userAbout/UserAbout';
import InfoSteps from './requestComponents/infoSteps/InfoSteps';
import { Checkbox } from 'antd';





const checkboxItem = [
    {
        title: "Прихожая",
    },
    {
        title: "Гардеробная",
    },
    {
        title: "Кухня",
    },
    {
        title: "Гостиная",
    },
    {
        title: "Спальня",
    },
    {
        title: "Детская",
    },
    {
        title: "Санузел",
    },
    {
        title: "Кабинет",
    }
]

const Rate = ({ nextStep }) => {
    const [checked, setChecked] = React.useState(false);


    const data = {
        numberStep: "1",
        title: "Заполнение анкеты",
        par1: "1. Без проекта перепланировки нельзя приступать к ремонту квартир: Непонятно, что можно изменять в ходе ремонта, а что запрещается законом; Случайное повреждение несущих конструкций может повлечь разрушение дома. Без проекта перепланировки нельзя приступать к ремонту квартиры;",
        par2: "2. Непонятно, что можно изменять входе ремонта,а что запрещается законом; Случайное повреждение несущих конструкций может повлечь разрушение дома. 1.Без проекта перепланировки нельзя приступать к ремонту квартиры;",
    }

    return (
        <div className={s.step2}>
            <div className="container">
                <div className={s.inner}>
                    <div className={s.quizeBlock}>
                        <RegInfo />
                        <div className={s.title}>Заполните анкету для&nbsp;передачи данных архитектору</div>
                        <div className={s.done}>
                            <img src="img/done2.svg" alt="" />
                            <span>Индивидуальные особенности</span>
                        </div>
                        <div className={s.aboutQuize}>
                            <div className={s.aboutquizeTitle}>Комнаты</div>
                            <div className={s.aboutquizeSubtitle}>
                                Добавьте комнаты, которые вы хотели бы иметь в вашей будущей квартире
                            </div>
                        </div>
                        <div className={s.itemsQuize}>
                            <div className={s.checkboxes}>
                                {checkboxItem.map((checkboxItem, index) =>
                                    <div className="">
                                        <Checkbox key={index}
                                            id=''
                                            value={checked} onChange={() => setChecked(!checked)} >
                                            {checkboxItem.title}
                                            
                                        </Checkbox>
                                        <div className={s.selectItem}>
                                            <div className="">
                                                состояние: {checked ? 'отмечен' : 'не отмечен'}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className={s.userText}>
                                <div className={s.title}></div>
                                <textarea name="" id="" cols="30" rows="10"></textarea>
                            </div>
                            <div className={s.next}>
                                <div className={s.nextItem}>План БТИ</div>
                            </div>
                            <Button className={s.btnColor} type="primary" onClick={() => nextStep(RequestSteps.CHAT)}>Далее</Button>
                        </div>
                    </div>
                    <div className={s.infoBlock}>
                        <UserAbout name="Александр Решетников" eMail="aleksreshetnikov@gmail.com" />
                        <InfoSteps numberStep={data.numberStep} title={data.title} par1={data.par1} par2={data.par2} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Rate;