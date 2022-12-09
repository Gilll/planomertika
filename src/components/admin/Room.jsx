import React, {useEffect, useRef, useState} from 'react';
import Mentions from "antd/es/mentions";
import {useOutletContext, useParams} from "react-router";
import CSSTransition from "react-transition-group/cjs/CSSTransition";
import UserMessage from "../request/requestComponents/UserMessage";
import TransitionGroup from "react-transition-group/cjs/TransitionGroup";
import {Scrollbars} from "react-custom-scrollbars";
import Empty from "antd/es/empty";

const Room = () => {
	const { Option } = Mentions;
	const [prefix, setPrefix] = useState('@');
	const chatScroll = useRef();
	const params = useParams();
	const [userText, setUserText] = useState('');
	const [roomName, setRoomName] = useState('');
	const [messages, setMessages] = useState([]);
	const [roomIsLoading, setRoomIsLoading] = useState(true);
	const userChatId = parseInt(localStorage.getItem('chatUserId'));
	const [stomp, newMess, setNewMess] = useOutletContext();
	const chatHostName = 'https://chatdev.mayabiorobotics.ru';

	useEffect(() => {
		const getRoom = async () => {
			let resp = '';
			try {
				const response = await fetch(chatHostName + '/api/dialog/' + params.id, {
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

		setRoomIsLoading(true)
		getRoom().then(roomData => {
			console.log(roomData);
			setRoomName(roomData.name);
			console.log('SET MESSAGES');
			console.log(roomData.messages);
			setMessages(roomData.messages);
		}).then(() => setRoomIsLoading(false));
		chatScroll.current.scrollToBottom();
	},[params.id])

	const MOCK_DATA = {
		'@': ['user1', 'user2', 'user3'],
		'#': ['11111111111', '22222222222', '3333333333']
	};

	let chatScrollInited = false;

	const chatScrollUpdate = () => {
		if (!chatScrollInited && chatScroll.current.getValues().top !== 1) {
			chatScrollInited = true;
			chatScroll.current.scrollToBottom();
		}
	}

	const onSearch = (_, query) => {
		setPrefix(query);
	}

	const AddNewMessage = (message) => {
		let rabbitMessage = {
			type: "MESSAGE",
			payload: message
		}
		stomp.send(
			"/queue/chat-application-messages",
			{"Authorization": "Bearer " + localStorage.getItem('jwtToken')},
			JSON.stringify(rabbitMessage)
		);
	}

	const selfNewMess = (text) => {
		AddNewMessage({ content: text, dialogId: params.id, uniqueCode: new Date().valueOf() });
	}

	const addNewMessage = () => {
		let str = userText.trim();
		if (str) {
			selfNewMess(str)
			setUserText('');
		}
	}

	return (
		<div className="chat-room">
			<div className="chat-room__container">
				<div className="chat-room__title">
					<div className="left-red-Line">
						{roomIsLoading
							?
							<div className="lh-less">Загрузка...</div>
							:
							<>
								<div className="lh-less">{roomName}</div>
								<div className="online-status">Сейчас онлайн</div>
							</>
						}
					</div>
				</div>
				<div className="mess-box">
					<Scrollbars autoHide ref={chatScroll} onUpdate={chatScrollUpdate}>
						<div className="day-wrapper">
							{roomIsLoading ?
								<div>Загрузка</div>
								:
								<>
									<div className="message-date">Date</div>
									{messages && messages.length > 0 ?
										<TransitionGroup className="messages-date-wrapper">
											{messages.map(mess => (
												<CSSTransition timeout={300} key={mess.messageId} className="user-message">
													<UserMessage message={mess} userId={userChatId}/>
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
					<div className="chat-room__input-file">
						<svg className="icon-clip" width="24" height="26" viewBox="0 0 24 26" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M15.7504 6.7502L7.62536 14.8752C7.12808 15.3725 6.84871 16.0469 6.84871 16.7502C6.84871 17.4535 7.12808 18.1279 7.62536 18.6252C8.12264 19.1225 8.7971 19.4019 9.50036 19.4019C10.2036 19.4019 10.8781 19.1225 11.3754 18.6252L19.5004 10.5002C20.4949 9.50564 21.0537 8.15672 21.0537 6.7502C21.0537 5.34368 20.4949 3.99476 19.5004 3.0002C18.5058 2.00564 17.1569 1.4469 15.7504 1.4469C14.3438 1.4469 12.9949 2.00564 12.0004 3.0002L3.87536 11.1252C2.38352 12.617 1.54541 14.6404 1.54541 16.7502C1.54541 18.86 2.38352 20.8834 3.87536 22.3752C5.3672 23.867 7.39058 24.7052 9.50036 24.7052C11.6101 24.7052 13.6335 23.867 15.1254 22.3752L23.2504 14.2502"/>
						</svg>
					</div>
					<div className="chat-room__input">
						<Mentions autoSize style={{ width: '100%' }}
								  placeholder="Написать сообщение..."
								  prefix={['@', '#']}
								  onSearch={onSearch}
								  value={userText}
								  onChange={value => setUserText(value)}
						>
							{(MOCK_DATA[prefix] || []).map(value => (
								<Option key={value} value={value}>
									{value}
								</Option>
							))}
						</Mentions>
					</div>
					<div className="chat-room__send" onClick={addNewMessage}>
						<svg className="icon-send" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M8.63297 7.37351L18.538 4.07185C22.983 2.59018 25.398 5.01685 23.928 9.46185L20.6263 19.3668C18.4096 26.0285 14.7696 26.0285 12.553 19.3668L11.573 16.4268L8.63297 15.4468C1.9713 13.2302 1.9713 9.60185 8.63297 7.37351Z" />
							<path d="M11.7944 15.9245L15.9711 11.7361" />
						</svg>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Room;
