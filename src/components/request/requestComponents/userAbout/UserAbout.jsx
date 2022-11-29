import React, {useEffect, useRef, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import t from './UserAbout.module.scss';
import PhoneInput from "../../../PhoneInput";
import IconEdit from "../../../icons/IconEdit";
import IconCheckCircle from "../../../icons/IconCheckCircle";
import IconPayment from "../../../icons/IconPayment";
import s from "../../RequestSteps.module.scss";
import {Form, Input, Modal} from "antd";
import FormQuest from "../../FormQuest";
import {useDispatch} from "react-redux";
import {redActions} from "../../../../reducer/actions";
import {RouteNames} from "../../../../router/routeNames";
import FormRooms from "../../FormRooms";
import {useApi} from "../../../../hooks/useApi";
import {getData} from "../../../../utils/utils";
import Button from "antd/es/button";

const UserAbout = ({ user, setUser, modal, setModal }) => {
    const [tooglePhone, setTogglePhone] = useState(!!user.phone)
    const [hasChanges, setHasChanges] = useState(false)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [changePassModal, setChangePassModal] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
	const [serverErrorCP, setServerErrorCP] = useState('');
    const [changePassForm, setChangePassForm] = useState({
		current: '',
		new: '',
		repeat: ''
	});

	const [saveAll, saveAllIsLoading] = useApi({
		url: '/orders/updateOrder',
		headers: {
			//'Content-Type': 'multipart/form-data'
			'Content-Type': 'application/json'
		},
		data: modal ? {...getData(modal, modal.files), id: modal.order.id } : {}
	});

	const tryUpdate = () => {
		saveAll().then((resp) => {
			console.log(resp)
		}).catch((err) => {
			console.log(err)
		})
	}

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('name')
        localStorage.removeItem('surname')
        localStorage.removeItem('email')
        localStorage.removeItem('userId')
        dispatch({ type: redActions.setIsAuth, payload: false });
        navigate(RouteNames.LANDING);
    }

    const tryChangePass = () => {}

    return (
        <div className={t.userAbout}>
            <div className={t.name}>{user.name} {user.surname}</div>
            <div className={t.eMail}>{user.email}</div>
            <div className="phone-row">
                {!tooglePhone && (user.phone ?
                    <div className="phone-input-wrap">
                        <div>{user.phone}</div>
                        <span className="phone-btn show" onClick={() => setTogglePhone(true)}><IconEdit/></span>
                    </div>
                :
                    <div className="phone-link-wrap">
                        <span className="phone-link" onClick={() => setTogglePhone(true)}>
                            <img src="img/plus.svg" alt="" />
                            <span className="phone">Добавить телефон</span>
                        </span>
                    </div>
                )}
                {tooglePhone &&
                    <div className="phone-edit-wrap">
                        <PhoneInput value={user.phone} placeholder='+7 (999) 999 99 99' onChange={(e) => {
                            setHasChanges(true)
                            setUser({...user, phone: e.target.value})
                        }}/>
                        <span className={`phone-btn ${hasChanges && 'show'}`} onClick={() => {
                            setHasChanges(false)
                            setTogglePhone(false)
                        }}>
                            <IconCheckCircle/>
                            <span className="text">Сохранить</span>
                        </span>
                    </div>
                }
            </div>
			<div className="payment-link qs">
				<div onClick={() => setChangePassModal(true)}>
					<IconPayment/>
					<span>Изменить пароль</span>
					<IconEdit/>
				</div>
			</div>
			<Modal className='modalAnket' visible={changePassModal} onCancel={() => setChangePassModal(false)}>
				<div className='modal-edit'>
					<div className='title-anket'>Изменение пароля</div>
					<div className='modal-text'>
						Для смены пароля введите текущий и новый пароль
					</div>
					<Form action="" onFinish={tryChangePass} autoComplete="off">
						<div className="modal-edit__form">
						<Form.Item
							name="current"
							rules={[
								{
									required: true,
									message: 'Введите пароль',
								},
							]}
						>
							<Input.Password type="text" value={changePassForm.current}
											onChange={(e) => {
												setChangePassForm({...changePassForm, current: e.target.value})
												setServerErrorCP('')
											}}
											className='m-input' placeholder="Текущий пароль" />
						</Form.Item>
						<Form.Item
							name="new"
							rules={[
								{
									required: true,
									message: 'Введите пароль',
								},
							]}
						>
							<Input.Password type="text" value={changePassForm.new}
											onChange={(e) => {
												setChangePassForm({...changePassForm, new: e.target.value})
												setServerErrorCP('')
											}}
											className='m-input' placeholder="Новый пароль" />
						</Form.Item>
						<Form.Item
							name="repeat"
							rules={[
								{
									required: true,
									message: 'Подтвердите пароль',
								},
							]}
						>
							<Input.Password type="text" value={changePassForm.repeat}
											onChange={(e) => {
												setChangePassForm({...changePassForm, repeat: e.target.value})
												setServerErrorCP('')
											}}
											className='m-input' placeholder="Подтвердите пароль" />
						</Form.Item>
						</div>
					</Form>
				</div>
			</Modal>
            <span className={t.logOut}>
				<div onClick={logout}>
					<img src="img/logOut.svg" alt="" />
                	<span>Выйти</span>
				</div>
            </span>
            <div className={t.bottomInfo}>
                {modal &&
                    <>
                        <div className="payment-link qs">
							<div onClick={() => setIsModalVisible(true)}>
								<IconPayment/>
								<span>Моя анкета</span>
								<IconEdit/>
                            </div>
                        </div>
                        <Modal className='modalAnket' visible={isModalVisible} onCancel={() => setIsModalVisible(false)}>
                            <div className={s.contentWrap}>
                                <div className='title-anket'>Моя анкета</div>
                                <div className={s.aboutQuize}>
                                    <div className={s.aboutquizeTitle}>Индивидуальные особенности</div>
                                    <div className={s.aboutquizeSubtitle}>
                                        Расскажите нам о себе что бы мы сделать
                                        вашу будущею квартиру более удобную именно для вас!
                                    </div>
                                </div>
                                <FormQuest form={modal} setForm={setModal}/>
                                <FormRooms form={modal} setForm={setModal}/>
                                <div className="buttons">
                                    <Button loading={saveAllIsLoading} className="MyBtn_myBtn__nNQdk" onClick={tryUpdate}>Сохранить</Button>
                                    <button type="button" onClick={() => setIsModalVisible(false)} className="ant-btn ant-btn-primary RequestSteps_btnDark__3gAJB"><span>Закрыть</span></button>
                                </div>
                            </div>
                        </Modal>
                    </>
                }
                <div className="payment-link">
                    <IconPayment/>
                    <span>Вы еще не внесли оплату</span>
                </div>
            </div>
        </div>
    );
};

export default UserAbout;
