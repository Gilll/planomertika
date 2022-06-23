import React from 'react';
import { RequestSteps } from "./RequestSteps";
import { Button } from "antd";
import RegInfo from './requestComponents/regInfo/RegInfo';
import s from './RequestSteps.module.scss';
import { Select } from 'antd';
import UserAbout from './requestComponents/userAbout/UserAbout';
import InfoSteps from './requestComponents/infoSteps/InfoSteps';
const { Option } = Select;





const Questionnaire = ({ nextStep }) => {
    const [valuePet, setValuePet] = React.useState('');
    const [valueChildren, setValueChildren] = React.useState('');

    const data = {
        numberStep: "1",
        title: "Заполнение анкеты",
        par1: "1. Без проекта перепланировки нельзя приступать к ремонту квартир: Непонятно, что можно изменять в ходе ремонта, а что запрещается законом; Случайное повреждение несущих конструкций может повлечь разрушение дома. Без проекта перепланировки нельзя приступать к ремонту квартиры;",
        par2: "2. Непонятно, что можно изменять входе ремонта,а что запрещается законом; Случайное повреждение несущих конструкций может повлечь разрушение дома. 1.Без проекта перепланировки нельзя приступать к ремонту квартиры;",
    }

    return (
        <section className={s.step1}>
            <div className="container">
                <div className={s.inner}>
                    <div className={s.quizeBlock}>
                        <RegInfo />
                        <div className={s.title}>Заполните анкету для&nbsp;передачи данных архитектору</div>
                        <div className={s.aboutQuize}>
                            <div className={s.aboutquizeTitle}>Индивидуальные особенности</div>
                            <div className={s.aboutquizeSubtitle}>
                                Расскажите нам о себе что бы мы сделать
                                вашу будущею квартиру более удобную именно для вас!
                            </div>
                        </div>
                        <div className={s.itemsQuize}>
                            <div className={s.item}>
                                <div className={s.selectTitle}>1. Сколько человек будет жить в вашей квартире?</div>
                                <div className={s.selectItem}>
                                    <div className={s.selectSubtitle}>Кол-во</div>
                                    <Select className={s.select}>
                                        <Option value="" hidden></Option>
                                        <Option value="1">1</Option>
                                        <Option value="2">2</Option>
                                        <Option value="3">3</Option>
                                        <Option value="4">4</Option>
                                        <Option value="5+">5+</Option>
                                    </Select>
                                </div>
                            </div>
                            <div className={s.item}>
                                <div className={s.selectTitle}>2. Есть ли у вас домашний питомец?</div>
                                <div className={s.selectesWrap}>
                                    <div className={s.selectItem}>
                                        <div className={s.selectSubtitle}>Питомец</div>
                                        <Select className={s.select}
                                            onChange={setValuePet}> value={valuePet}
                                            <Option value="" hidden></Option>
                                            <Option value="Нет">Нет</Option>
                                            <Option value="Да">Да</Option>
                                            <Option value="Другое">Другое</Option>
                                        </Select>
                                    </div>
                                    <div className={s.selectItem}>
                                        {valuePet === 'Другое' &&
                                            <div>
                                                <div className={s.selectSubtitle}>Питомец</div>
                                                <input className={s.input} type="text" />
                                            </div>}
                                    </div>
                                </div>
                            </div>
                            <div className={s.item}>
                                <div className={s.selectTitle}>3. Какой ваш примерный возраст?</div>
                                <div className={s.selectItem}>
                                    <div className={s.selectSubtitle}>Возраст</div>
                                    <Select className={s.select}>
                                        <Option value="" hidden></Option>
                                        <Option value="18-25">18-25</Option>
                                        <Option value="25-40">25-40</Option>
                                        <Option value="40-60">40-60</Option>
                                        <Option value="60+">60+</Option>
                                    </Select>
                                </div>
                            </div>
                            <div className={s.item}>
                                <div className={s.selectTitle}>4. Есть ли у вас дети, или планируете в ближайшем будущем?</div>
                                <div className={s.selectesWrap}>
                                    <div className={s.selectItem}>
                                        <div className={s.selectSubtitle}>Дети</div>
                                        <Select value={valueChildren} className={s.select}
                                            onChange={setValueChildren}>
                                            <Option value="" hidden></Option>
                                            <Option value="Есть">Есть</Option>
                                            <Option value="Нет, но планируется">Нет, но планируется</Option>
                                            <Option value="Нет">Нет</Option>
                                        </Select>
                                    </div>
                                    <div className={s.selectItem}>
                                        {valueChildren !== 'Нет' && valueChildren !== '' &&
                                            <div>
                                                <div className={s.selectSubtitle}>Кол-во</div>
                                                <Select className={s.select} name="" id="">
                                                    <Option value="" hidden></Option>
                                                    <Option value="1">1</Option>
                                                    <Option value="2">2</Option>
                                                    <Option value="3">3</Option>
                                                    <Option value="3+">3+</Option>
                                                </Select>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className={s.item}>
                                <div className={s.selectTitle}>5. Как часто к вам приходят гости  и сколько человек вы готовы принять к застолью?</div>
                                <div className={s.selectesWrap}>
                                    <div className={s.selectItem}>
                                        <div className={s.selectSubtitle}>Гости</div>

                                        <Select className={s.select}>
                                            <Option value="" hidden></Option>
                                            <Option value="Раз в неделю">Раз в неделю</Option>
                                            <Option value="Раз в месяц">Раз в месяц</Option>
                                            <Option value="Раз в пол года">Раз в пол года</Option>
                                        </Select>
                                    </div>
                                    <div className={s.selectItem}>
                                        <div className={s.selectSubtitle}>Кол-во</div>

                                        <Select className={s.select}>
                                            <Option value="" hidden></Option>
                                            <Option value="1">1</Option>
                                            <Option value="2">2</Option>
                                            <Option value="3">3</Option>
                                            <Option value="4">5</Option>
                                            <Option value="5+">5+</Option>
                                        </Select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={s.next}>
                            <div className={s.nextItem}>Комнаты</div>
                            <div className={s.nextItem}>План БТИ</div>
                        </div>
                        <Button className={s.btnColor} type="primary" onClick={() => nextStep(RequestSteps.CHARACTERISTICS)}>Далее</Button>
                    </div>

                    <div className={s.infoBlock}>
                        <UserAbout name="Александр Решетников" eMail="aleksreshetnikov@gmail.com" />
                        <InfoSteps numberStep={data.numberStep} title={data.title} par1={data.par1} par2={data.par2} />
                    </div>
                </div>
            </div>
        </section >
    );
};

export default Questionnaire;