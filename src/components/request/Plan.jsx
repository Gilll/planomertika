import React, {useEffect, useState} from 'react';
import { Button } from "antd";
import { RequestSteps } from "./RequestSteps";
import s from './RequestSteps.module.scss';
import { Upload } from 'antd';
import { Checkbox } from 'antd';
import UserAbout from './requestComponents/userAbout/UserAbout';
import InfoSteps from './requestComponents/infoSteps/InfoSteps';
import {useApi} from "../../hooks/useApi";
import {getData} from "../../utils/utils";
import {hostName} from "../../API/config";
import {useNavigate} from "react-router";

const Plan = ({ nextStep, form, setForm, oldOrderId }) => {
    const { Dragger } = Upload;
    const [stepComplete, setStepComplete] = useState(false)
	const [orderFiles, setOrderFiles] = useState([])

    const [saveAll, saveAllIsLoading] = useApi({
        url: '/clientOrders/create',
        headers: {
            //'Content-Type': 'multipart/form-data'
            'Content-Type': 'application/json'
        },
        data: getData(form, orderFiles)
    });

    const [newOrderDiscount, newOrderDiscountIsLoading] = useApi({
		url: '/clientOrders/repeatOrder/' + oldOrderId,
	})

    const props = {
        name: 'files',
        multiple: true,
        action: hostName + '/clientOrders/addClientFiles',
        headers: {
            'Authorization': localStorage.getItem('token')
        },
        onChange(info) {
            const { status } = info.file;

            if (status !== 'uploading') {
                setForm({...form, files: [...form.files, info.file] })
                setStepComplete(true)
                console.log(info.file, info.fileList);
            }

            if (status === 'done') {
                console.log(`${info.file.name} file uploaded successfully.`);
                console.log(info.file);
				setOrderFiles([...orderFiles, info.file.response[0].id ])
            } else if (status === 'error') {
                console.log(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };

    const data = {
        numberStep: "1",
        title: "Заполнение анкеты",
        par1: "1. Без проекта перепланировки нельзя приступать к ремонту квартир: Непонятно, что можно изменять в ходе ремонта, а что запрещается законом; Случайное повреждение несущих конструкций может повлечь разрушение дома. Без проекта перепланировки нельзя приступать к ремонту квартиры;",
        par2: "2. Непонятно, что можно изменять входе ремонта,а что запрещается законом; Случайное повреждение несущих конструкций может повлечь разрушение дома. 1.Без проекта перепланировки нельзя приступать к ремонту квартиры;",
    }

    const navigate = useNavigate()

    const saveRequest = () => {
    	if (form.discount && oldOrderId) {
			newOrderDiscount().then((resp) => {
				navigate('/request/' + resp.id)
			}).catch((e) => console.log(e.message))
		} else {
			saveAll().then((resp) => {
				navigate('/request/' + resp.id)
			}).catch((e) => console.log(e.message))
		}
    }

    useEffect(() => {
        console.log(form);
    },[])

    return (
        <div className={s.stepPlan}>
            <div className="container">
                <div className={s.inner}>
                    <div className={s.quizeBlock}>
                        <div className={s.title}>Заполните анкету для&nbsp;передачи данных архитектору</div>
                        <div className={s.done}>
                            <img src="/img/done2.svg" alt="" />
                            <span>Индивидуальные особенности</span>
                        </div>
                        <div className={s.done}>
                            <img src="/img/done2.svg" alt="" />
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
                            <Dragger {...props} listType="picture">
                                <p className="ant-upload-hint">
                                    Перетащите сюда файл в формате pdf или
                                </p>
                                <p className="ant-upload-text">
                                    <img src="/img/upLoad.svg" alt="" />
                                    Загрузить файл с компьютера</p>
                            </Dragger>
                        </div>
                        <Checkbox style={{ marginBottom: '4rem' }}>
                            У меня есть собственный замер, который я выполнил ответственно
                        </Checkbox>
                        <div className="nextstep-wrap">
                            <Button className={s.btnColor} type="primary" loading={saveAllIsLoading && newOrderDiscountIsLoading} onClick={() => saveRequest()} disabled={!stepComplete}>Далее</Button>
                            <span className={'fade ' + (stepComplete && 'hide')}>Для продолжения загрузите БТИ</span>
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

export default Plan;
