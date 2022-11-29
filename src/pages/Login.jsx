import React, {useState} from 'react';
import s from "../components/request/RequestSteps.module.scss";
import {Button, Form, Input} from "antd";
import {Link, useNavigate} from "react-router-dom";
import {useApi} from "../hooks/useApi";
import t from "../components/loginForm/LoginForm.module.scss";
import {RouteNames} from "../router/routeNames";
import {redActions} from "../reducer/actions";
import {useDispatch} from "react-redux";

const Login = () => {
    const [serverError, setServerError] = useState('');
    const [confirmForm, setConfirmForm] = useState(false)
    const [confirmCode, setConfirmCode] = useState('')
    const [regForm, setRegForm] = useState({
        email: "",
        password: "",
    });
    const [signup, signupIsLoading] = useApi({
        url: '/api/auth/signin',
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

    const tryConfirmMail = () => {
		confirmMail().then((resp) => {
			localStorage.setItem('token', 'Bearer ' + resp.jwtResponse.token)
			localStorage.setItem('name', resp.userResponse.name)
			localStorage.setItem('surname', resp.userResponse.surname)
			localStorage.setItem('email', resp.userResponse.email)
			localStorage.setItem('userId', resp.userResponse.id)
			if (resp.userResponse.phoneNumber)  { localStorage.setItem('phoneNumber', resp.userResponse.phoneNumber) }
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

    const trySignIn = () => {
        signup().then((response) => {
        	let resp = response.userResponse;
        	if (resp.state !== 'NOT_CONFIRMED') {
        		console.log(response);
				localStorage.setItem('token', 'Bearer ' + response.jwtResponse.token)
				localStorage.setItem('name', resp.name)
				localStorage.setItem('surname', resp.surname)
				localStorage.setItem('email', resp.email)
				localStorage.setItem('userId', resp.id)
				if (resp.phoneNumber)  { localStorage.setItem('phoneNumber', resp.phoneNumber) }
				dispatch({ type: redActions.setIsAuth, payload: true });
				dispatch({ type: redActions.setUser, payload: {
						name: resp.name,
						surname: resp.surname,
						email: resp.email,
						phone: resp.phoneNumber,
						id: resp.id
					} });
				navigate(RouteNames.REQUEST)
			} else {
				setConfirmForm(true);
			}
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
					<div className={s.title}>Вход</div>
					<Form action="" onFinish={trySignIn} autoComplete="off">
						<div className={t.inputsWrap}>
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
								<Input value={regForm.email}
									   onChange={(e) => {
										   setRegForm({...regForm, email: e.target.value})
										   setServerError('')
									   }}
									   className={t.input} placeholder="Ваше имя" />
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
								<Input.Password value={regForm.password}
												onChange={(e) => {
													setRegForm({...regForm, password: e.target.value})
													setServerError('')
												}}
												className={t.input} placeholder="Пароль" />
							</Form.Item>
						</div>
						<div className='val-errors'>{serverError}</div>
						<div className={t.buttonsWrap}>
							<Button className={s.btnColor} type="primary" htmlType="submit" loading={signupIsLoading}>Войти</Button>
							<Link to={RouteNames.REGISTRATION}><Button className={s.btnDark} >Зарегистрироваться</Button></Link>
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

export default Login;
