import React, {useState} from 'react';
import s from "../components/request/RequestSteps.module.scss";
import t from '../components/loginForm/LoginForm.module.scss';
import {Link, NavLink, useNavigate} from "react-router-dom";
import {Button, Form, Input} from "antd";
import {RouteNames} from "../router/routeNames";
import {useApi} from "../hooks/useApi";
import {redActions} from "../reducer/actions";
import {useDispatch} from "react-redux";

const Registration = () => {
    const [serverError, setServerError] = useState('');
	const [confirmForm, setConfirmForm] = useState(false)
	const [confirmCode, setConfirmCode] = useState('')
    const [regForm, setRegForm] = useState({
        email: "",
        name: "",
		surname: "",
        password: "",
        passwordConfirm: "",
        phoneNumber: ""
    });

    const [signup, signupIsLoading] = useApi({
        url: '/api/auth/signup',
        data: regForm
    });

	const [confirmMail, confirmMailIsLoading] = useApi({
		url: '/api/auth/confirmation',
		data: {
			email: regForm.email,
			uuid: confirmCode
		}
	});

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const trySignUp = () => {
        if (regForm.password !== regForm.passwordConfirm) {
            setServerError('Пароли не совпадают')
        } else {
            signup().then(() => {
				setConfirmForm(true);
            }).catch((e) => {
                setServerError(e.message);
            })
        }
    }

	const tryConfirmMail = () => {
		confirmMail().then((resp) => {
			console.log(resp);
			localStorage.setItem('token', 'Bearer ' + resp.jwtResponse.token)
			localStorage.setItem('name', resp.userResponse.name)
			localStorage.setItem('surname', resp.userResponse.surname)
			localStorage.setItem('email', resp.userResponse.email)
			localStorage.setItem('userId', resp.userResponse.id)
			dispatch({ type: redActions.setIsAuth, payload: true });
			dispatch({ type: redActions.setUser, payload: {
					name: resp.username,
					email: resp.email,
					phone: '',
					id: resp.id
				} });
			navigate(RouteNames.REQUEST)
		}).catch((err) => {
			setServerError(err.message);
		})
	}

    return (
        <div className={s.loginBlock}>
			{confirmForm ?
				<div className={t.loginForm}>
					<div className={s.title}>Подтвердите почту</div>
					<div className="conf-text">
						На вашу почту <span>{regForm.email}</span> был отправлен код. Введите его для подтверждения адреса электронной почты и завершения авторизации.
					</div>
					<div className="conf-input">
						<Input value={confirmCode} onChange={(e) => setConfirmCode(e.target.value)}/>
					</div>
					<div className={t.buttonsWrap}>
						<Button className={s.btnColor} onClick={tryConfirmMail} type="primary" htmlType="button" loading={confirmMailIsLoading}>Подтвердить</Button>
					</div>
				</div>
				:
				<div className={t.loginForm}>
					<div className={s.title}>Регистрация</div>
					<Form action="" onFinish={trySignUp} autoComplete="off">
						<div className={t.inputsWrap}>
							<Form.Item
								name="name"
								rules={[
									{
										required: true,
										message: 'Введите Имя',
									},
								]}
							>
								<Input type="text" value={regForm.name}
									   onChange={(e) => {
										   setRegForm({...regForm, name: e.target.value})
										   setServerError('')
									   }}
									   className={t.input} placeholder="Имя" />
							</Form.Item>
							<Form.Item
								name="surname"
								rules={[
									{
										required: true,
										message: 'Введите Фамилию',
									},
								]}
							>
								<Input type="text" value={regForm.surname}
									   onChange={(e) => {
										   setRegForm({...regForm, surname: e.target.value})
										   setServerError('')
									   }}
									   className={t.input} placeholder="Фамилия" />
							</Form.Item>
							<Form.Item
								name="phoneNumber"
							>
								<Input type="number" value={regForm.phoneNumber}
									   onChange={(e) => {
										   setRegForm({...regForm, phoneNumber: e.target.value})
										   setServerError('')
									   }}
									   className={t.input} placeholder="Номер телефона" />
							</Form.Item>
							<Form.Item
								name="email"
								rules={[
									{
										type: 'email',
										message: 'Неверный формат email',
									},
									{
										required: true,
										message: 'Введите email',
									},
								]}
							>
								<Input type="text" value={regForm.email}
									   onChange={(e) => {
										   setRegForm({...regForm, email: e.target.value})
										   setServerError('')
									   }}
									   className={t.input} placeholder="e-mail" />
							</Form.Item>
							<Form.Item
								name="password"
								rules={[
									{
										required: true,
										message: 'Введите пароль',
									},
								]}
							>
								<Input.Password type="text" value={regForm.password}
												onChange={(e) => {
													setRegForm({...regForm, password: e.target.value})
													setServerError('')
												}}
												className={t.input} placeholder="Пароль" />
							</Form.Item>
							<Form.Item
								name="passwordConfirm"
								rules={[
									{
										required: true,
										message: 'Подтвердите пароль',
									},
								]}
							>
								<Input.Password type="text" value={regForm.passwordConfirm}
												onChange={(e) => {
													setRegForm({...regForm, passwordConfirm: e.target.value})
													setServerError('')
												}}
												className={t.input} placeholder="Подтвердите пароль" />
							</Form.Item>
						</div>
						<div className='val-errors'>{serverError}</div>
						<div className={t.buttonsWrap}>
							<Button className={s.btnColor} type="primary" htmlType="submit" loading={signupIsLoading}>Зарегистрироваться</Button>
							<NavLink to={RouteNames.LOGIN}><Button className={s.btnDark} type="primary">Войти</Button></NavLink>
						</div>
					</Form>
				</div>
			}
            <div className={s.loginSocial}>
                <div className={s.socialName}>Войти через социальную сеть</div>
                <Link to="#" className={s.socialIcon}>
                    <img src="img/fbIcon.svg" alt="" />
                </Link>
                <Link to="#" className={s.socialIcon}>
                    <img src="img/vkIcon.svg" alt="" />
                </Link>
            </div>
        </div>
    );
};

export default Registration;
