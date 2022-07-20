import React from 'react';
import { Button } from "antd";
import { RequestSteps } from "./RequestSteps";
import s from './RequestSteps.module.scss';
import RegInfo from './requestComponents/regInfo/RegInfo';
import { message, Upload } from 'antd';
import { Checkbox } from 'antd';
import UserAbout from './requestComponents/userAbout/UserAbout';
import InfoSteps from './requestComponents/infoSteps/InfoSteps';


const { Dragger } = Upload;

const props = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',

    onChange(info) {
        const { status } = info.file;

        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }

        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },

    onDrop(e) {
        console.log('Dropped files', e.dataTransfer.files);
    },
};

const Plan = ({ nextStep }) => {

    const data = {
        numberStep: "1",
        title: "Заполнение анкеты",
        par1: "1. Без проекта перепланировки нельзя приступать к ремонту квартир: Непонятно, что можно изменять в ходе ремонта, а что запрещается законом; Случайное повреждение несущих конструкций может повлечь разрушение дома. Без проекта перепланировки нельзя приступать к ремонту квартиры;",
        par2: "2. Непонятно, что можно изменять входе ремонта,а что запрещается законом; Случайное повреждение несущих конструкций может повлечь разрушение дома. 1.Без проекта перепланировки нельзя приступать к ремонту квартиры;",
    }

    return (
        <div className={s.stepPlan}>
            <div className="container">
                <div className={s.inner}>
                    <div className={s.quizeBlock}>
                        <RegInfo />
                        <div className={s.title}>Заполните анкету для&nbsp;передачи данных архитектору</div>
                        <div className={s.done}>
                            <img src="img/done2.svg" alt="" />
                            <span>Индивидуальные особенности</span>
                        </div>
                        <div className={s.done}>
                            <img src="img/done2.svg" alt="" />
                            <span>Комнаты</span>
                        </div>
                        <div className={s.aboutQuize}>
                            <div className={s.aboutquizeTitle}>План БТИ</div>
                            <div className={s.aboutquizeSubtitle}>
                                БТИ – это план вашей квартиры, выполненный
                                специалистами городской жилищной инспекцией,
                                который позволит нам увидеть вашу
                                существующую ситуацию глазами профессионалов
                            </div>
                        </div>
                        <div className={s.upLoadWrap}>
                            <Dragger {...props}>
                                <p className="ant-upload-hint">
                                    Перетащите сюда файл в формате pdf или
                                </p>
                                <p className="ant-upload-text">
                                    <img src="img/upLoad.svg" alt="" />
                                    Загрузить файл с компьютера</p>
                            </Dragger>

                        </div>
                        <Checkbox style={{ marginBottom: '4rem' }}>
                            У меня есть собственный замер, который я выполнил ответственно
                        </Checkbox>
                        <Button className={s.btnColor} type="primary" onClick={() => nextStep(RequestSteps.RATE)}>Выбрать тариф</Button>
                    </div>
                    <div className={s.infoBlock}>
                        <UserAbout name="Александр Решетников" eMail="aleksreshetnikov@gmail.com">
                            <div className={s.infoMoney}>
                                <img src="img/money.svg" alt="" />
                                <span>Вы еще не внесли оплату</span>
                            </div>
                        </UserAbout>
                        <InfoSteps numberStep={data.numberStep} title={data.title} par1={data.par1} par2={data.par2} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Plan;