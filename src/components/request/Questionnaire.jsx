import React, {useEffect, useState} from 'react';
import { RequestSteps } from "./RequestSteps";
import { Button } from "antd";
import s from './RequestSteps.module.scss';
import UserAbout from './requestComponents/userAbout/UserAbout';
import InfoSteps from './requestComponents/infoSteps/InfoSteps';
import FormQuest from "./FormQuest";

const Questionnaire = ({ nextStep, form, setForm }) => {
    const [stepComplete, setStepComplete] = useState(false)
    const data = {
        numberStep: "1",
        title: "Заполнение анкеты",
        par1: "1. Без проекта перепланировки нельзя приступать к ремонту квартир: Непонятно, что можно изменять в ходе ремонта, а что запрещается законом; Случайное повреждение несущих конструкций может повлечь разрушение дома. Без проекта перепланировки нельзя приступать к ремонту квартиры;",
        par2: "2. Непонятно, что можно изменять входе ремонта,а что запрещается законом; Случайное повреждение несущих конструкций может повлечь разрушение дома. 1.Без проекта перепланировки нельзя приступать к ремонту квартиры;",
    }

    useEffect(() => {
        const validate = () => {
            setStepComplete(
                form.questionnaire.tenantsCount &&
                form.questionnaire.pet &&
                (form.questionnaire.pet === 'Другое' ? form.questionnaire.petAdvanced : true) &&
                form.questionnaire.age &&
                form.questionnaire.childrens &&
                (form.questionnaire.childrens === 'Нет' ? true : form.questionnaire.childrensCount &&
                    (form.questionnaire.childrens !== 'Есть' ? true : form.questionnaire.childrensAge )) &&
                form.questionnaire.guests &&
                form.questionnaire.guestsCount
            )
        }
        validate();
    },[form])

    return (
        <section className={s.step1}>
            <div className="container">
                <div className={s.inner}>
                    <div className={s.quizeBlock}>
                        <div className={s.title}>Заполните анкету для&nbsp;передачи данных архитектору</div>
                        <div className={s.aboutQuize}>
                            <div className={s.aboutquizeTitle}>Индивидуальные особенности</div>
                            <div className={s.aboutquizeSubtitle}>
                                Расскажите нам о себе что бы мы сделать
                                вашу будущею квартиру более удобную именно для вас!
                            </div>
                        </div>
                        <FormQuest form={form} setForm={setForm}/>
                        <div className={s.next}>
                            <div className={s.nextItem}>Комнаты</div>
                            <div className={s.nextItem}>План БТИ</div>
                        </div>
                        <div className="nextstep-wrap">
                            <Button className={s.btnColor} type="primary" onClick={() => nextStep(RequestSteps.CHARACTERISTICS)} disabled={!stepComplete}>Далее</Button>
                            <span className={'fade ' + (stepComplete && 'hide')}>Для продолжения заполните все поля</span>
                        </div>
                    </div>

                    <div className={s.infoBlock}>
                        <UserAbout user={form.user} setUser={(val) => setForm({...form, user: val})}/>
                        <InfoSteps numberStep={data.numberStep} title={data.title} par1={data.par1} par2={data.par2} />
                    </div>
                </div>
            </div>
        </section >
    );
};

export default Questionnaire;