import React from 'react';
import { Button } from "antd";
import { RequestSteps } from "./RequestSteps";
import s from './RequestSteps.module.scss';
import RegInfo from './requestComponents/regInfo/RegInfo';
import UserAbout from './requestComponents/userAbout/UserAbout';
import InfoSteps from './requestComponents/infoSteps/InfoSteps';
import { Checkbox } from 'antd';



const Rate = ({ nextStep }) => {
    const [checked1, setChecked1] = React.useState(false);
    const [checked2, setChecked2] = React.useState(false);
    const [checked3, setChecked3] = React.useState(false);
    const [checked4, setChecked4] = React.useState(false);
    const [checked5, setChecked5] = React.useState(false);
    const [checked6, setChecked6] = React.useState(false);
    const [checked7, setChecked7] = React.useState(false);
    const [checked8, setChecked8] = React.useState(false);


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
                                <div className={s.checkboxWrap}>
                                    <div className={s.checkboxItem}>
                                        <Checkbox value={checked1} onChange={() => setChecked1(!checked1)}>
                                            Прихожая
                                        </Checkbox>
                                    </div>
                                    <div className={checked1 ? 'description active' : 'description'}>
                                        <button>
                                            <img src="img/edit.svg" alt="" />
                                            <span>добавить описание</span>
                                        </button>
                                    </div>
                                </div>
                                <div className={s.checkboxWrap}>
                                    <div className={s.checkboxItem}>
                                        <Checkbox value={checked2} onChange={() => setChecked2(!checked2)}>
                                            Гардеробная
                                        </Checkbox>
                                    </div>
                                    <div className={checked2 ? 'description active' : 'description'}>
                                        <button>
                                            <img src="img/edit.svg" alt="" />
                                            <span>добавить описание</span>
                                        </button>
                                    </div>
                                </div>
                                <div className={s.checkboxWrap}>
                                    <div className={s.checkboxItem}>
                                        <Checkbox value={checked3} onChange={() => setChecked3(!checked3)}>
                                            Кухня
                                        </Checkbox>
                                    </div>
                                    <div className={checked3 ? 'description active' : 'description'}>
                                        <button>
                                            <img src="img/edit.svg" alt="" />
                                            <span>добавить описание</span>
                                        </button>
                                    </div>
                                </div>
                                <div className={s.checkboxWrap}>
                                    <div className={s.checkboxItem}>
                                        <Checkbox value={checked4} onChange={() => setChecked4(!checked4)}>
                                            Гостиная
                                        </Checkbox>
                                    </div>
                                    <div className={checked4 ? 'description active' : 'description'}>
                                        <button>
                                            <img src="img/edit.svg" alt="" />
                                            <span>добавить описание</span>
                                        </button>
                                    </div>
                                </div>
                                <div className={s.checkboxWrap}>
                                    <div className={s.checkboxItem}>
                                        <Checkbox value={checked5} onChange={() => setChecked5(!checked5)}>
                                            Спальня
                                        </Checkbox>
                                    </div>
                                    <div className={checked5 ? 'description active' : 'description'}>
                                        <button>
                                            <img src="img/edit.svg" alt="" />
                                            <span>добавить описание</span>
                                        </button>
                                    </div>
                                </div>
                                <div className={s.checkboxWrap}>
                                    <div className={s.checkboxItem}>
                                        <Checkbox value={checked6} onChange={() => setChecked6(!checked6)}>
                                            Детская
                                        </Checkbox>
                                    </div>
                                    <div className={checked6 ? 'description active' : 'description'}>
                                        <button>
                                            <img src="img/edit.svg" alt="" />
                                            <span>добавить описание</span>
                                        </button>
                                    </div>
                                </div>
                                <div className={s.checkboxWrap}>
                                    <div className={s.checkboxItem}>
                                        <Checkbox value={checked7} onChange={() => setChecked7(!checked7)}>
                                            Санузел
                                        </Checkbox>
                                    </div>
                                    <div className={checked7 ? 'description active' : 'description'}>
                                        <button>
                                            <img src="img/edit.svg" alt="" />
                                            <span>добавить описание</span>
                                        </button>
                                    </div>
                                </div>
                                <div className={s.checkboxWrap}>
                                    <div className={s.checkboxItem}>
                                        <Checkbox value={checked8} onChange={() => setChecked8(!checked8)}>
                                            Кабинет
                                        </Checkbox>
                                    </div>
                                    <div className={checked8 ? 'description active' : 'description'}>
                                        <button>
                                            <img src="img/edit.svg" alt="" />
                                            <span>добавить описание</span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className={s.userText}>
                                <div className={s.title}>Произвольное пожелание</div>
                                <textarea placeholder='Ваше пожелание...' name="" id="" cols="30" rows="10"></textarea>
                            </div>
                            <div className={s.next}>
                                <div className={s.nextItem}>План БТИ</div>
                            </div>
                            <Button className={s.btnColor} type="primary" onClick={() => nextStep(RequestSteps.PLAN)}>Далее</Button>
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