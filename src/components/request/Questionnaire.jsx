import React from 'react';
import { RequestSteps } from "./RequestSteps";
import { Button } from "antd";
import RegInfo from './requestComponents/regInfo/RegInfo';
import s from './RequestSteps.module.scss';
import { Select } from 'antd';
const { Option } = Select;




const Questionnaire = ({ nextStep }) => {
    // const [selectState, setSelectState] = React.useState(false);
   
    return (
        <section>
            <div className="container">
                <div className={s.inner}>
                    <div className={s.quizeBlock}>
                        <RegInfo />
                        <div className={s.title}>Заполните анкету для передачи данных архитектору</div>
                        <div className={s.aboutQuize}>
                            <div className={s.aboutquizeTitle}>Индивидуальные особенности</div>
                            <div className={s.aboutquizeSubtitle}>
                                Расскажите нам о себе что бы мы сделать
                                вашу будущею квартиру более удобную именно для вас!
                            </div>
                            <div className={s.itemsQuize}>
                                <div className={s.selectItem}>
                                    <div className={s.selectTitle}>1. Сколько человек будет жить в вашей квартире?</div>
                                    <div className={s.selectSubtitle}>Кол-во</div>
                                    <Select
                                        defaultValue=" ">
                                        <Option value="1">1</Option>
                                        <Option value="2">2</Option>
                                        <Option value="3">3</Option>
                                        <Option value="4">4</Option>
                                        <Option value="5+">5+</Option>
                                    </Select>
                                </div>
                                <div className={s.selectItem}>
                                    <div className={s.selectTitle}>2. Есть ли у вас домашний питомец?</div>
                                    <div className={s.selectSubtitle}>Питомец</div>
                                    <Select
                                        defaultValue=" ">
                                        <Option value="Нет">Нет</Option>
                                        <Option value="Да">Да</Option>
                                        <Option value="Другое" >Другое</Option>
                                    </Select>
        
                                </div>
                                <div className={s.selectItem}>
                                    <div className={s.selectTitle}>3. Какой ваш примерный возраст?</div>
                                    <div className={s.selectSubtitle}>Возраст</div>
                                    <Select
                                        defaultValue=" ">
                                        <Option value="">18-25</Option>
                                        <Option value="">25-40</Option>
                                        <Option value="">40-60</Option>
                                        <Option value="">60+</Option>
                                    </Select>
                                </div>
                                <div className={s.selectItem}>
                                    <div className={s.selectTitle}>4. Есть ли у вас дети, или планируете в ближайшем будущем?</div>
                                    <div className={s.selectSubtitle}>Дети</div>
                                    <Select
                                        defaultValue=" ">
                                        <Option value="">Есть</Option>
                                        <Option value="">Нет, но планируется</Option>
                                        <Option  value="">Нет</Option>
                                    </Select>
                                </div>
                                <div className={s.selectItem}>
                                    <div className={s.selectTitle}>5. Как часто к вам приходят гости  и сколько человек вы готовы принять к застолью?</div>
                                    <div className={s.selectSubtitle}>Гости</div>
                                    <Select
                                        defaultValue=" ">
                                        <Option value="">Раз в неделю</Option>
                                        <Option value="">Раз в месяц</Option>
                                        <Option value="">Раз в пол года</Option>
                                    </Select>
                                </div>
                            </div>
                        </div>

                    </div>
                    <h1>Questionnaire</h1>
                    <Button type="primary" onClick={() => nextStep(RequestSteps.RATE)}>next step</Button>
                </div>
            </div>

        </section>
    );
};

export default Questionnaire;