import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import t from './UserAbout.module.scss';
import PhoneInput from "../../../PhoneInput";
import IconEdit from "../../../icons/IconEdit";
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
import IconProfile from "../../../icons/IconProfile";
import IconPass from "../../../icons/IconPass";
import Dragger from "antd/es/upload/Dragger";
import {hostName} from "../../../../API/config";

const UserAbout = ({ user, setUser, modal, setModal, noOrder }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [changePassModal, setChangePassModal] = useState(false);
    const [changeEmailModal, setChangeEmailModal] = useState(false);
    const [changePhoneModal, setChangePhoneModal] = useState(false);
    const [phoneTMP, setPhoneTMP] = useState(user.phone);
    const [emailTMP, setEmailTMP] = useState(user.email);
    const dispatch = useDispatch();
    const navigate = useNavigate();
	const [serverErrorCP, setServerErrorCP] = useState('');
	const [orderFiles, setOrderFiles] = useState(modal.files || [])
	const [serverErrorModal, setServerErrorModal] = useState('');
    const [changePassForm, setChangePassForm] = useState({
		current: '',
		new: '',
		repeat: ''
	});

	const [saveAll, saveAllIsLoading] = useApi({
		url: '/clientOrders/updateOrder',
		headers: {
			//'Content-Type': 'multipart/form-data'
			'Content-Type': 'application/json'
		},
		data: modal ? {...getData(modal, orderFiles.map((el) => { return el.id })), id: modal.order.id } : {}
	});

	const [changePass, changePassIsLoading] = useApi({
		url: '/users/password',
		data: {
			oldPassword: changePassForm.current,
			password: changePassForm.new
		}
	})

	const [changePhone, changePhoneIsLoading] = useApi({
		url: '/users/phone',
		data: {
			phone: phoneTMP
		}
	})

	const [changeEmail, changeEmailIsLoading] = useApi({
		url: '/users/email',
		data: {
			email: emailTMP
		}
	})

	const tryCHangePhone = () => {
		changePhone().then(() => {
			setUser({...user, phone: phoneTMP });
			localStorage.setItem('phone', phoneTMP)
			setChangePhoneModal(false)
		}).catch((e) => console.log(e.message))
	}

	const tryChangePass = () => {
		changePass().then((resp) => {
			setChangePassModal(false)
		}).catch((err) => {
			setServerErrorModal(err.message)
		})
	}

	const tryUpdate = () => {
		saveAll().then((resp) => {
			console.log(resp)
			setIsModalVisible(false)
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
        localStorage.removeItem('uuid')
        localStorage.removeItem('jwtToken')
        localStorage.removeItem('exchangeName')
        localStorage.removeItem('chatUserId')
        localStorage.removeItem('phoneNumber')
        dispatch({ type: redActions.setIsAuth, payload: false });
        navigate(RouteNames.LANDING);
    }

	const props = {
		name: 'file',
		multiple: true,
		action: hostName + '/orders/addFiles',
		headers: {
			'Authorization': localStorage.getItem('token')
		},
		onChange(info) {
			const { status } = info.file;

			if (status !== 'uploading') {
				setOrderFiles(info.fileList.map((el) => { return  el.uid  }))
				console.log(info.file, info.fileList);
			}

			if (status === 'done') {
				console.log(`${info.file.name} file uploaded successfully.`);
				setOrderFiles([...orderFiles, info.file.response[0].id ])
			} else if (status === 'error') {
				console.log(`${info.file.name} file upload failed.`);
			}
		},
		onDrop(e) {
			console.log('Dropped files', e.dataTransfer.files);
		},
		defaultFileList: modal.files.length && modal.files.map((el, index) => {
			return {
				uid: el.id,
				name: el.fileName,
				status: 'done',
				url: el.url
			}
		})
	};

    return (
        <div className={t.userAbout}>
            <div className={t.name}>{user.name} {user.surname}</div>
			<div className={t.eMail} onClick={() => setChangeEmailModal(true)}><span>{user.email}</span><IconEdit/></div>
			<Modal className='modalAnket' visible={changeEmailModal} onCancel={() => setChangeEmailModal(false)}>
				<div className='modal-edit'>
					<div className='title-anket'>Изменение почты</div>
					<div className="change-phone-input">
						<Input placeholder="e-mail" value={user.email}/>
					</div>
					<div className="actions-wrap">
						<Button className={s.btnColor} onClick={tryCHangePhone} type="primary" loading={changePhoneIsLoading}>Сохранить</Button>
						<Button className={s.btnDark} onClick={() => setChangeEmailModal(false)}>Отмена</Button>
					</div>
				</div>
			</Modal>
            <div className="phone-row">
                {user.phone ?
                    <div className="phone-input-wrap">
                        <div onClick={() => setChangePhoneModal(true)}>{user.phone}</div>
                        <span className="phone-btn show" onClick={() => setChangePhoneModal(true)}><IconEdit/></span>
                    </div>
                :
                    <div className="phone-link-wrap">
                        <span className="phone-link" onClick={() => setChangePhoneModal(true)}>
                            <img src="img/plus.svg" alt="" />
                            <span className="phone">Добавить телефон</span>
                        </span>
                    </div>
                }
            </div>
			<Modal className='modalAnket' visible={changePhoneModal} onCancel={() => setChangePhoneModal(false)}>
				<div className='modal-edit'>
					<div className='title-anket'>Изменение телефона</div>
					<div className="change-phone-input">
						<PhoneInput value={phoneTMP} placeholder='+7 (999) 999 99 99' onChange={(e) => {
							setPhoneTMP(e.target.value)
						}}/>
					</div>
					<div className="actions-wrap">
						<Button className={s.btnColor} onClick={tryCHangePhone} type="primary" loading={changePhoneIsLoading}>Сохранить</Button>
						<Button className={s.btnDark} onClick={() => setChangePhoneModal(false)}>Отмена</Button>
					</div>
				</div>
			</Modal>
			<div className="payment-link qs">
				<div onClick={() => setChangePassModal(true)}>
					<IconPass/>
					<span>Изменить пароль</span>
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
												setServerErrorModal('')
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
												setServerErrorModal('')
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
												setServerErrorModal('')
											}}
											className='m-input' placeholder="Подтвердите пароль" />
						</Form.Item>
							<div className='val-errors'>{serverErrorModal}</div>
							<div className="actions-wrap">
								<Button className={s.btnColor} type="primary" htmlType="submit" loading={changePassIsLoading}>Сохранить</Button>
								<Button className={s.btnDark} onClick={() => setChangePassModal(false)}>Отмена</Button>
							</div>
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
			{!noOrder &&
				<div className={t.bottomInfo}>
				{modal &&
				<>
					<div className="payment-link qs">
						<div onClick={() => setIsModalVisible(true)}>
							<IconProfile/>
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
							<div className={s.aboutQuize}>
								<div className={s.aboutquizeTitle}>Комнаты</div>
								<div className={s.aboutquizeSubtitle}>
									Добавьте комнаты, которые вы хотели бы иметь в вашей будущей квартире
								</div>
							</div>
							<FormRooms form={modal} setForm={setModal}/>
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
										<img src="img/upLoad.svg" alt="" />
										Загрузить файл с компьютера</p>
								</Dragger>
							</div>
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
			}
        </div>
    );
};

export default UserAbout;
