import React, {useCallback, useEffect, useRef, useState} from 'react';
import { Button } from "antd";
import { RequestSteps } from "./RequestSteps";
import s from './RequestSteps.module.scss';
import UserAbout from './requestComponents/userAbout/UserAbout';
import InfoSteps from './requestComponents/infoSteps/InfoSteps';
import {useApi} from "../../hooks/useApi";
import Loading from "../../pages/Loading";
import Stomp from "../../utils/stomp";
import {v4 as uuidv4} from "uuid";
import {Scrollbars} from "react-custom-scrollbars";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import Empty from "antd/es/empty";
import Mentions from "antd/es/mentions";
import UserMessage from "./requestComponents/UserMessage";
import Upload from "antd/es/upload";

let stomp;

const Chat = ({ nextStep, form, setForm }) => {
	const [serverError, setServerError] = useState('');
	const [userText, setUserText] = useState('');
	const { Option } = Mentions;
	const [prefix, setPrefix] = useState('@');
	const [roomName, setRoomName] = useState('');
	const [messages, setMessages] = useState([]);
	const [roomIsLoading, setRoomIsLoading] = useState(true);
	const [roomId, setRoomId] = useState('')
	const chatScroll = useRef();
	const [getChatAuth, getChatAuthIsLoading] = useApi({
		url: '/api/chat/signIn',
	});
	const [getCurTime, getCurTimeIsLoading] = useApi({
		url: '/clientOrders/getTime',
		method: 'GET'
	});

	const [newState, newStateIsLoading] = useApi({
		url: '/clientOrders/changeStateOfOrderInWork/' + form.order.id,
	});

	const trySetNewState = () => {
		newState().then(() => {
			getCurTime().then((resp) => {
				let date = new Date(resp);
				nextStep(RequestSteps.WAITING);
				setForm({...form, orderState: 'IN_WORK', timeOfChangeState: date.setDate(date.getDate() + 1)})
			})
		}).catch((e) => console.log(e.message))
	}

	useEffect(() => {
		getChatAuth().then((resp) => {
			console.log(resp)
			localStorage.setItem('jwtToken', resp.jwtToken)
			localStorage.setItem('exchangeName', resp.exchangeName)
			getRooms().then((rooms) => {
				console.log(rooms);
				console.log(form);
				setRoomId(form.chatId)
				getRoom(form.chatId).then(roomData => {
					console.log(roomData);
					setRoomName(roomData.name);
					console.log('SET MESSAGES');
					console.log(roomData.messages);
					setMessages(roomData.messages);
				}).then(() => setRoomIsLoading(false));
			})
		}).catch(() => setServerError('Проблема с сервером'))
		getCurTime().then((resp) => {
			let date1 = new Date(form.timeOfChangeState);
			let date2 = new Date(resp);
			let timeDiff = Math.abs(date2.getTime() - date1.getTime());
			let h = parseInt((timeDiff/(1000*60*60))%24) + parseInt(timeDiff/(1000*60*60*24))*24;
			let m = parseInt((timeDiff/(1000*60))%60);
			let s = parseInt((timeDiff/1000)%60);
			setTime([h, m, s]);
			setInitTimer(true);
		})
	},[])

	const [[h, m, sec], setTime] = React.useState([0, 0, 0]);
	const [initTimes, setInitTimer] = useState(false)

	const tick = () => {
		if (h === 0 && m === 0 && sec === 0) {
			console.log('Время вышло')
		} else if (m === 0 && sec === 0) {
			setTime([h - 1, 59, 59]);
		} else if (sec === 0) {
			setTime([h, m - 1, 59]);
		} else {
			setTime([h, m, sec - 1]);
		}
	};

	React.useEffect(() => {
		const timerID = setInterval(() => tick(), 1000);
		return () => clearInterval(timerID);
	});

    const data = {
        numberStep: "3",
        title: "Чат с архитектором",
        par1: "Услуги архитектора как правило носят комплексный характер, и поэтому очень хорошо оплачиваются: долгие согласования, альбомы чертежей, визуализации, развертки и подборки материалов – иногда все это излишне. Это выгодно отличает наш сервис от обычных дизайнерских бюро: в десятки раз дешевле мы предлагаем вам идею планировки вашей квартиры и ничего лишнего – вы можете передавать чертеж строителям уже через сутки после заказа.",
        par2: "На тарифе «Базовый» вы загружаете исходные данные и через 24 часа после оплаты получаете готовую планировку в формате PDF: архитектурный чертеж вашей квартиры в масштабе с нанесением всех перегородок, напольных покрытий, расстановкой необходимой мебели и сантехники, а также экспликацией помещений и балансом площадей.",
    }


	const [sockConnected, setSockConnected] = useState(false);

	const notificationConnect = useCallback( async () => {
		let url = "wss://chatrabbit.mayabiorobotics.ru:15673/ws", sc;

		const onConnectedNotif = () => {
			setSockConnected(true);
		}

		const onErrorNotif = (error) => {
			console.log("fail")
			console.log('STOMP: ' + error);
			//stomp.disconnect();
			stomp = null;
			setSockConnected(false);
			setTimeout( () => {notificationConnect()}, 5000);
			console.log('STOMP: Reconecting in 5 seconds');
			console.log("try");
		}

		console.log("Go")
		sc = Stomp.client(url);
		stomp = sc;
		sc.heartbeat.outgoing = 10000; // client will send heartbeats every 20000ms
		sc.heartbeat.incoming = 10000;
		sc.connect('test', 'test', onConnectedNotif, onErrorNotif);
	}, [])

	const onMessageReceived = (payload) => {
		payload.ack();
		let message = JSON.parse(payload.body);
		console.log('NEW MESS')
		console.log(message)
		if (message.type === 'MESSAGE') {
			let tmp = {...message.payload};
			setMessages(st => [...st, tmp])
		}
	}

	useEffect(() => {
		notificationConnect();
		return () => stomp && stomp.disconnect();
	},[notificationConnect])

	useEffect(() => {
		console.log('sockConnected');
		console.log(sockConnected);
		console.log("stomp");
		console.log(stomp);
		if (sockConnected && stomp) {
			if (!localStorage.getItem('uuid')) {
				localStorage.setItem('uuid', uuidv4())
			}
			console.log("exchangeName");
			console.log(localStorage.getItem('exchangeName'));
			if (localStorage.getItem('exchangeName') && sockConnected) stomp.subscribe('/exchange/' + localStorage.getItem('exchangeName'), onMessageReceived,
				{
					"id": "sub", "auto-delete": false, "x-queue-name": localStorage.getItem('uuid'), "ack": "client"
				});
		}
	},[sockConnected, localStorage.getItem('exchangeName')])

	const hostname = 'https://chatdev.mayabiorobotics.ru'

	const getRooms = async () => {
		let resp = '';
		try {
			const response = await fetch(hostname + '/api/dialogs', {
				crossDomain: true,
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					"Authorization": "Bearer " + localStorage.getItem('jwtToken')
				}
			});
			resp = await response.json();
			if (!response.ok) {
				throw new Error(response.statusText);
			}
		} catch (e) {
			console.log(e);
		}
		return resp;
	}

	const getRoom = async (roomId) => {
		let resp = '';
		try {
			const response = await fetch(hostname + '/api/dialog/' + roomId, {
				crossDomain: true,
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					"Authorization": "Bearer " + localStorage.getItem('jwtToken')
				}
			});
			resp = await response.json();
			if (!response.ok) {
				throw new Error(response.statusText);
			}
		} catch (e) {
			console.log(e);
		}
		return resp;
	}

	const AddNewMessage = (message) => {
		let rabbitMessage = {
			type: "MESSAGE",
			payload: message
		}
		console.log(rabbitMessage);
		stomp.send(
			"/queue/chat-application-messages",
			{"Authorization": "Bearer " + localStorage.getItem('jwtToken')},
			JSON.stringify(rabbitMessage)
		);
	}

	const addNewMessage = () => {
		let str = userText.trim();
		if (str) {
			selfNewMess(str)
			setUserText('');
		}
	}

	const selfNewMess = (text) => {
		AddNewMessage({ content: text, dialogId: roomId, uniqueCode: uuidv4() });
	}

	const MOCK_DATA = {
		'@': ['user1', 'user2', 'user3'],
		'#': ['11111111111', '22222222222', '3333333333']
	};

	const onSearch = (_, query) => {
		setPrefix(query);
	}

	const chatScrollUpdate = () => {
		if (chatScroll.current) {
			if (chatScroll.current.getValues().top !== 1) {
				chatScroll.current.scrollToBottom();
			}
		}
	}

	useEffect(() => {
		chatScrollUpdate();
	},[messages])

	const getPrev = (index) => {
		if (index) {
			return {
				time: new Date(messages[index - 1].timestamp).getMinutes(),
				id: messages[index - 1].sender.userId
			}
		} else {
			return { id: 0, time: 0 };
		}
	}

	const propsUpl = {
		name: 'files',
		action: 'https://chatdev.mayabiorobotics.ru/api/files',
		headers: {
			"Authorization": "Bearer " + localStorage.getItem('jwtToken')
		},
		onChange(info) {
			if (info.file.status !== 'uploading') {
				console.log(info.file, info.fileList);
			}
			if (info.file.status === 'done') {
				console.log(`${info.file.name} file uploaded successfully`);
				let ft = ('' + info.file.type).split('/')
				console.log(info.file)
				AddNewMessage({
					content: '',
					dialogId: roomId,
					uniqueCode: new Date().valueOf(),
					files: [
						{
							contentType: info.file.response[0].contentType,
							filename: info.file.response[0].filename,
							originalName: info.file.response[0].originalName
						}
					]
				});
			} else if (info.file.status === 'error') {
				console.log(`${info.file.name} file upload failed.`);
			}
		},
	};

    return (
        <div className={s.chatBlock}>
            <div className="container">
                <div className={s.inner}>
                    <div className={s.quizeBlock}>
                        <div className={s.title}>Обсудите с архитектором необходимые детали</div>
                        <div className={s.chat}>
							{getChatAuthIsLoading ?
								<Loading />
								:
								serverError ? <div className="content-error">{serverError}</div>
									:
									<div className="chat-room user">
										<div className="chat-room__container">
											<div className="chat-room__title">
												{roomIsLoading
													?
													<div className="chat-room__title-loading"><Loading /></div>
													:
													<>
														<div className="chat-room__title-name">Максим Кашин</div>
														<div className="chat-room__title-email">Архитектор</div>
													</>
												}
												{initTimes &&
													<div className="chat-room__timer-wrapper">
														<div className="chat-room__timer-title">Время на планировку</div>
														<div className="chat-room__timer">{`${h.toString().padStart(2, '0')}`} : {`${m.toString().padStart(2, '0')}`} : {`${sec.toString().padStart(2, '0')}`}</div>
													</div>
												}
											</div>

											<div className="mess-box">
												<Scrollbars autoHide ref={chatScroll}>
													<div className="day-wrapper">
														{roomIsLoading ?
															<></>
															:
															<>
																<div className="message-date hidden">Date</div>
																{messages && messages.length > 0 ?
																	<TransitionGroup className="messages-date-wrapper">
																		{messages.map((mess, index) => (
																			<CSSTransition timeout={300} key={mess.messageId} className="user-message">
																				<UserMessage message={mess} prev={getPrev(index)} update={() => chatScrollUpdate()} userId={parseInt(localStorage.getItem('chatUserId'))} admin={false}/>
																			</CSSTransition>
																		))}
																	</TransitionGroup>
																	:
																	<div className="empty-wrap">
																		<Empty/>
																	</div>
																}
															</>
														}
													</div>
												</Scrollbars>
											</div>
											<div className="chat-room__input-wrapper">
												<div className="chat-room__input-file" onClick={() => console.log(messages)}>
													<Upload {...propsUpl}>
														<svg viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
															<path fillRule="evenodd" clipRule="evenodd" d="M12.8949 0.0283371C12.7769 0.0477537 12.5856 0.0880554 12.4699 0.117902C12.3542 0.147774 12.1916 0.19572 12.1085 0.224478C12.0254 0.253236 11.8504 0.324523 11.7195 0.3829C11.5886 0.441251 11.3914 0.544106 11.2812 0.611445C11.171 0.678783 10.9963 0.79589 10.893 0.871658C10.7688 0.962742 9.12839 2.60172 6.05167 5.70881C2.86171 8.93031 1.33641 10.4878 1.20161 10.6614C1.09348 10.8006 0.941168 11.0171 0.863171 11.1424C0.785174 11.2677 0.655204 11.5069 0.574352 11.674C0.4935 11.8411 0.386748 12.0889 0.33713 12.2248C0.287512 12.3607 0.214474 12.5999 0.174799 12.7564C0.135124 12.913 0.083327 13.1492 0.0596825 13.2815C0.0319302 13.4367 0.0122431 13.7156 0.00410273 14.0683C-0.00561557 14.4913 0.001047 14.69 0.0336334 14.9488C0.056777 15.1326 0.108099 15.4164 0.147673 15.5796C0.187248 15.7428 0.260461 15.9959 0.31038 16.1421C0.360324 16.2883 0.471834 16.556 0.558222 16.737C0.64461 16.918 0.775256 17.1629 0.848518 17.2813C0.921807 17.3996 1.06743 17.6104 1.17215 17.7496C1.27685 17.8888 1.4865 18.1286 1.63803 18.2825C1.78957 18.4364 2.00069 18.6335 2.10721 18.7205C2.21374 18.8075 2.41099 18.9533 2.54554 19.0446C2.68009 19.136 2.97054 19.2998 3.19096 19.4088C3.41137 19.5177 3.71006 19.6471 3.85471 19.6963C3.99935 19.7454 4.21351 19.8085 4.3306 19.8363C4.4477 19.8641 4.64495 19.9048 4.76893 19.9266C4.89291 19.9484 5.15588 19.9767 5.3533 19.9894C5.5751 20.0038 5.84716 20.0035 6.0653 19.9887C6.25946 19.9755 6.5206 19.9469 6.64561 19.9252C6.7706 19.9035 6.98085 19.8582 7.11279 19.8246C7.24474 19.791 7.47017 19.7227 7.61374 19.6728C7.75731 19.6229 8.03258 19.5038 8.22544 19.4081C8.4183 19.3124 8.69445 19.1545 8.8391 19.0572C8.98374 18.9599 9.19226 18.8067 9.30247 18.7167C9.41268 18.6266 11.1995 16.8344 13.2732 14.7338C15.3469 12.6332 17.4484 10.5015 17.9433 9.99676C18.4381 9.492 18.8629 9.04721 18.8873 9.00836C18.9116 8.9695 18.9496 8.86621 18.9718 8.77882C18.9969 8.67961 19.006 8.5802 18.996 8.51413C18.9872 8.45595 18.9459 8.33665 18.9043 8.24903C18.8507 8.1359 18.7924 8.06071 18.7034 7.98963C18.633 7.93338 18.5168 7.87151 18.4381 7.84837C18.3472 7.82169 18.2484 7.81176 18.1569 7.82014C18.0791 7.82728 17.9603 7.86151 17.8921 7.89647C17.7965 7.94545 16.9941 8.74455 14.362 11.4116C12.4885 13.3101 10.3751 15.4507 9.66565 16.1685C8.64526 17.201 8.326 17.509 8.13777 17.6424C8.0069 17.7352 7.76941 17.8795 7.60998 17.9631C7.45058 18.0467 7.20261 18.1546 7.05894 18.203C6.9153 18.2514 6.6794 18.317 6.53475 18.3488C6.305 18.3993 6.20053 18.4067 5.7082 18.4071C5.26083 18.4074 5.09815 18.398 4.91921 18.3614C4.79523 18.3361 4.57188 18.2755 4.42288 18.2268C4.27387 18.1782 4.08076 18.1061 3.99374 18.0666C3.9067 18.0272 3.74242 17.9406 3.62866 17.8743C3.51489 17.808 3.3329 17.6871 3.22424 17.6056C3.11559 17.5242 2.93708 17.3711 2.8276 17.2654C2.71812 17.1596 2.56768 16.9975 2.49334 16.9051C2.41898 16.8126 2.2995 16.6482 2.22782 16.5398C2.15611 16.4313 2.03691 16.2148 1.96289 16.0588C1.88888 15.9027 1.79465 15.6725 1.75347 15.5472C1.7123 15.4219 1.65303 15.1997 1.6218 15.0535C1.57296 14.825 1.56487 14.7115 1.56394 14.2435C1.56304 13.7745 1.57078 13.6598 1.6199 13.415C1.65126 13.2586 1.71703 13.0137 1.76607 12.8707C1.81511 12.7277 1.89987 12.514 1.9544 12.3958C2.00895 12.2777 2.13642 12.0556 2.23769 11.9022C2.33893 11.7488 2.53452 11.498 2.6723 11.3449C2.81009 11.1917 4.88234 9.08878 7.27733 6.67167C9.67232 4.25454 11.6995 2.22586 11.7821 2.16346C11.8648 2.10106 12.0113 2.00327 12.1078 1.94616C12.2042 1.88905 12.3723 1.8068 12.4812 1.76338C12.5902 1.71999 12.7706 1.66149 12.882 1.63336C13.0124 1.60048 13.2106 1.57721 13.4381 1.56808C13.7088 1.55719 13.8518 1.56405 14.049 1.59737C14.1906 1.62129 14.3922 1.66967 14.497 1.70488C14.6018 1.74007 14.7873 1.82054 14.9091 1.88368C15.0309 1.94684 15.2 2.04997 15.2848 2.11288C15.3696 2.17576 15.5162 2.30224 15.6105 2.3939C15.7048 2.48555 15.8429 2.64237 15.9174 2.74234C15.9919 2.84234 16.0979 3.00843 16.1529 3.11146C16.2079 3.21449 16.276 3.36623 16.3043 3.44863C16.3326 3.53103 16.3731 3.67821 16.3942 3.77568C16.4164 3.8779 16.4326 4.07607 16.4326 4.24401C16.4326 4.41063 16.4163 4.61148 16.3944 4.71365C16.3733 4.81182 16.3378 4.94853 16.3155 5.01743C16.2932 5.08632 16.2195 5.25661 16.1516 5.39584C16.0837 5.53508 15.97 5.72874 15.8989 5.8262C15.824 5.92885 14.2035 7.58555 12.0476 9.76358C8.59168 13.255 8.31283 13.5305 8.14664 13.6182C8.04818 13.6701 7.88014 13.7352 7.77319 13.7628C7.64467 13.7961 7.49724 13.813 7.33852 13.8127C7.20642 13.8125 7.02776 13.7955 6.94152 13.775C6.85528 13.7545 6.7154 13.7023 6.63066 13.659C6.54593 13.6158 6.41856 13.5217 6.3476 13.4499C6.27664 13.3782 6.18547 13.2511 6.145 13.1676C6.07524 13.0237 6.07143 12.9991 6.07238 12.6992C6.07324 12.4368 6.08313 12.3547 6.13044 12.2183C6.16183 12.1278 6.23324 11.974 6.28917 11.8765C6.37683 11.7238 6.82072 11.266 9.50508 8.56023C11.7426 6.30481 12.6354 5.38908 12.6764 5.30724C12.7234 5.2137 12.7336 5.15259 12.7335 4.96549C12.7335 4.76778 12.7247 4.72072 12.6668 4.60948C12.6301 4.53898 12.5532 4.4385 12.4959 4.3862C12.4386 4.33388 12.3391 4.26773 12.2748 4.23917C12.1953 4.20383 12.1018 4.18672 11.9825 4.18566C11.8518 4.18447 11.7721 4.19917 11.6694 4.24347C11.5468 4.29636 11.2733 4.56288 9.17723 6.67157C7.88229 7.97434 6.45648 9.41069 6.00874 9.86347C5.48265 10.3955 5.14464 10.7583 5.05321 10.8892C4.97542 11.0006 4.8718 11.1658 4.82296 11.2563C4.77411 11.3468 4.70012 11.5238 4.65852 11.6497C4.61692 11.7755 4.56439 11.9863 4.54175 12.118C4.51811 12.2557 4.50007 12.5027 4.49932 12.6992C4.49849 12.9184 4.5129 13.1188 4.53952 13.258C4.56234 13.3773 4.60757 13.5539 4.64006 13.6504C4.67252 13.7468 4.73046 13.8884 4.76878 13.965C4.80713 14.0416 4.88384 14.1726 4.9393 14.2561C4.99473 14.3397 5.12563 14.4937 5.23012 14.5984C5.33464 14.703 5.50361 14.8446 5.60563 14.913C5.70762 14.9814 5.89234 15.0814 6.0161 15.1354C6.13984 15.1893 6.3575 15.2618 6.49974 15.2964C6.64198 15.331 6.89218 15.3688 7.05574 15.3803C7.21929 15.3918 7.46994 15.3912 7.61276 15.379C7.75558 15.3668 7.96312 15.335 8.07398 15.3083C8.18484 15.2817 8.37272 15.2243 8.49149 15.1808C8.61026 15.1373 8.80954 15.0425 8.93435 14.9701C9.05914 14.8976 9.24937 14.7677 9.3571 14.6814C9.4648 14.595 11.2109 12.8463 13.2373 10.7955C16.0624 7.93624 16.9625 7.01056 17.097 6.82614C17.1935 6.69387 17.331 6.48677 17.4026 6.36589C17.4741 6.24504 17.576 6.04538 17.6288 5.92219C17.6817 5.79901 17.7605 5.58591 17.8041 5.44857C17.8476 5.31126 17.9053 5.06837 17.9323 4.90881C17.9653 4.71317 17.9813 4.5006 17.9813 4.25598C17.9813 4.05647 17.9692 3.80494 17.9543 3.697C17.9395 3.58905 17.9012 3.39689 17.8694 3.26998C17.8375 3.14308 17.7654 2.92015 17.7091 2.77459C17.6528 2.62903 17.5454 2.40173 17.4705 2.26951C17.3956 2.13729 17.2689 1.93958 17.1889 1.83014C17.1089 1.72073 16.95 1.53086 16.8358 1.40824C16.7216 1.28561 16.524 1.10015 16.3968 0.996082C16.2695 0.892037 16.0823 0.752905 15.9808 0.686909C15.8793 0.620938 15.6595 0.501172 15.4924 0.420797C15.3253 0.340421 15.0803 0.239895 14.948 0.197417C14.8156 0.154938 14.5958 0.0957004 14.4595 0.065778C14.2592 0.021831 14.106 0.00962929 13.6607 0.00221197C13.2696 -0.00429401 13.0473 0.00330046 12.8949 0.0283371Z" fill="#ACACAC"/>
														</svg>
													</Upload>
												</div>
												<div className="chat-room__input">
													<Mentions autoSize style={{ width: '100%' }}
															  placeholder="Написать сообщение..."
															  value={userText}
															  onChange={value => setUserText(value)}
															  onKeyPress={(e) => { if (e.charCode === 13) {
																  e.preventDefault();
																  addNewMessage()
															  }}}
													>
														{(MOCK_DATA[prefix] || []).map(value => (
															<Option key={value} value={value}>
																{value}
															</Option>
														))}
													</Mentions>
												</div>
												<div className="chat-room__send" onClick={addNewMessage}>
													<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path d="M19 1L9.1 10.9M19 1L12.7 19L9.1 10.9M19 1L1 7.3L9.1 10.9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
													</svg>
												</div>
											</div>
										</div>
									</div>
							}
                        </div>
                    </div>
                    <div className={s.infoBlock}>
                        <UserAbout user={form.user} setUser={(val) => setForm({...form, user: val})} modal={form} setModal={setForm}/>
                        <InfoSteps numberStep={data.numberStep} title={data.title} par1={data.par1} par2={data.par2} />
                        <Button className={s.btnColor} loading={newStateIsLoading} type="primary" onClick={trySetNewState}>Все согласовано – начинайте работу!</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chat;
