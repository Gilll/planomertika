import React, {useEffect, useState} from 'react';
import { Button } from "antd";
import { RequestSteps } from "./RequestSteps";
import s from './RequestSteps.module.scss';
import UserAbout from './requestComponents/userAbout/UserAbout';
import InfoSteps from './requestComponents/infoSteps/InfoSteps';
import { Checkbox } from 'antd';
import {useApi} from "../../hooks/useApi";
import FormRooms from "./FormRooms";



const Characteristics = ({ nextStep, form, setForm }) => {
    const [stepComplete, setStepComplete] = useState(false)
    const data = {
        numberStep: "1",
        title: "Заполнение анкеты",
        par1: "1. Без проекта перепланировки нельзя приступать к ремонту квартир: Непонятно, что можно изменять в ходе ремонта, а что запрещается законом; Случайное повреждение несущих конструкций может повлечь разрушение дома. Без проекта перепланировки нельзя приступать к ремонту квартиры;",
        par2: "2. Непонятно, что можно изменять входе ремонта,а что запрещается законом; Случайное повреждение несущих конструкций может повлечь разрушение дома. 1.Без проекта перепланировки нельзя приступать к ремонту квартиры;",
    }

    useEffect(() => {
        const validate = () => {
            let count = 0;
            for (let room in form.rooms) {
                count += room !== 'advanced' ? (form.rooms[room] ? 1 : 0) : 0
            }
            console.log(count);
            setStepComplete(count > 1)
        }
        validate();
    },[form])

    return (
        <div className={s.step2}>
            <div className="container">
                <div className={s.inner}>
					<div className={s.quizeBlock}>
						<div className={s.title}>Заполните анкету для&nbsp;передачи данных архитектору</div>
						<div className={s.done}>
							<img src="/img/done2.svg" alt="" />
							<span>Индивидуальные особенности</span>
						</div>
						<div className={s.aboutQuize}>
							<div className={s.aboutquizeTitle}>Комнаты</div>
							<div className={s.aboutquizeSubtitle}>
								Добавьте комнаты, которые вы хотели бы иметь в вашей будущей квартире
							</div>
						</div>
						<div className={s.itemsQuize}>
							<FormRooms form={form} setForm={setForm}/>
							<div className={s.next}>
								<div className={s.nextItem}>План БТИ</div>
							</div>
							<div className="nextstep-wrap">
								<Button className={s.btnColor} type="primary" onClick={() => nextStep(RequestSteps.PLAN)} disabled={!stepComplete}>Далее</Button>
								<span className={'fade ' + (stepComplete && 'hide')}>Для продолжения выберите как миннимум 2 комнаты</span>
							</div>
						</div>
					</div>
                    <div className={s.infoBlock}>
                        <UserAbout user={form.user} modal={form} setUser={(val) => setForm({...form, user: val})}/>
                        <InfoSteps numberStep={data.numberStep} title={data.title} par1={data.par1} par2={data.par2} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Characteristics;
