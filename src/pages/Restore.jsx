import React, {useState} from 'react';
import s from "../components/request/RequestSteps.module.scss";
import {Button, Form, Input} from "antd";
import t from "../components/loginForm/LoginForm.module.scss";
import {useApi} from "../hooks/useApi";
import {useNavigate} from "react-router";
import {RouteNames} from "../router/routeNames";

const Restore = () => {
	const [resetSucces, setResetSucces] = useState(false)
	const [serverError, setServerError] = useState('');
	const [confirmCode, setConfirmCode] = useState('')
	const [resetPassReq, setResetPassReq] = useState(false)
	const [regForm, setRegForm] = useState({
		email: "",
		password: "",
	});
	const [resetPass, resetPassIsLoading] = useApi({
		url: '/users/resetPassword',
		data: {
			mail: regForm.email,
		}
	});
	const [resetPassFin, resetPassIsLoadingFin] = useApi({
		url: '/users/applyPassword',
		data: {
			code: confirmCode,
			password: regForm.password,
		}
	});

	const navigate = useNavigate();

	const tryResetPass = () => {
		resetPass().then(() => {
			setResetSucces(true);
			setServerError('');
			setConfirmCode('')
		}).catch((err) => {
			setServerError(err.message);
		})
	}

	const finishResetPass = () => {
		resetPassFin().then(() => {
			navigate(RouteNames.LOGIN)
		}).catch((err) => {
			setServerError(err.message);
		})
	}

	return (
		<div className={s.loginBlock}>
			<div className={s.title}>Восстановление пароля</div>
			{resetSucces ?
				<Form action="">
					<div className="conf-text">
						На вашу почту <span>{regForm.email}</span> был отправлен код. Введите его для смены пароля.
					</div>
					<div className="conf-input">
						<Input placeholder="Код подтверждения" autocomplete="off" defaultValue={''} value={confirmCode} onChange={(e) => setConfirmCode(e.target.value)}/>
					</div>
					<div className="conf-text">Новый пароль</div>
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
										className={t.input} placeholder="Новый пароль" />
					</Form.Item>
					<div className='val-errors'>{serverError}</div>
					<div className={t.buttonsWrap}>
						<Button className={s.btnColor} loading={resetPassIsLoadingFin} type="primary" onClick={finishResetPass}>Подтвердить</Button>
						<Button className={s.btnDark} onClick={() => {
							setResetPassReq(false)
							setResetSucces(false)
						}}>Войти</Button>
					</div>
				</Form>
				:
				<Form action="" onFinish={tryResetPass} autoComplete="off">
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
								   className={t.input} placeholder="E-mail" />
						</Form.Item>
					</div>
					<div className='val-errors'>{serverError}</div>
					<div className={t.buttonsWrap}>
						<Button className={s.btnColor} type="primary" htmlType="submit" loading={resetPassIsLoading}>Востановить</Button>
						<Button onClick={() => setResetPassReq(false)} className={s.btnDark} >Войти</Button>
					</div>
				</Form>
			}
		</div>
	);
};

export default Restore;
