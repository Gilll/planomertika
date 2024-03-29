import React, {useEffect} from 'react';
import ava from '../../../asetss/img/ava.png';
import {useApi} from "../../../hooks/useApi";

const UserMessage = ({message, userId, admin, prev, update}) => {
	const [getchatId, getChatIdIsLoading] = useApi({
		url: '/users/getClientInfo',
		method: 'GET'
	});

	useEffect(() => {
		if (!userId) {
			getchatId().then((resp) => {
				localStorage.setItem('chatUserId', resp.chatUserId)
			})
		}
	},[])

	return (
		<>
			{!getChatIdIsLoading && message.sender.userId === userId ?
				<>
					<div className={admin ? "user-message user-message--self" : "user-message user-message--self na"}>
						{(prev.time !== new Date(message.timestamp).getMinutes() || prev.id !== message.sender.userId) && <div className="user-message__status">
							<span className="user-message__date">{(new Date(message.timestamp).getHours()).toString().padStart(2, '0')} : {(new Date(message.timestamp).getMinutes()).toString().padStart(2, '0')}</span>
							<span className="user-message__user-name">Вы</span>
							{admin && <img src={ava}/>}
						</div>
						}
						{message.content !== '' &&
							<div className="user-message__text-wrapper">
								<div className="user-message__text">{message.content}</div>
							</div>
						}
						{message.files.length > 0 && message.files.map(file =>
							file.contentType.includes('image') ?
								<div className="user-message__img user-message__img--self">
									<img onLoad={() => {if (update) {update()}}} src={file.uri} alt=""/>
								</div>
								:
								<div className="user-message__text-wrapper">
									<div className="user-message__text">
										<a target="_blank" href={file.uri}>{file.originalName}</a>
									</div>
								</div>
						)}
					</div>
				</>
				:
				<>
					<div className="user-message user-message--companion">
						{(prev.time !== new Date(message.timestamp).getMinutes() || prev.id !== message.sender.userId) && <div className="user-message__status">
							<span className="user-message__user-name">{ message.sender.firstName } { message.sender.lastName }</span>
							<span className="user-message__date">{new Date(message.timestamp).getHours()} : {(new Date(message.timestamp).getMinutes()).toString().padStart(2, '0')}</span>
						</div>}
						{message.content !== '' &&
							<div className="user-message__row">
								<div className="user-message__text-wrapper">
									<div className="user-message__text">{message.content}</div>
								</div>
							</div>
						}
						{message.files.length > 0 && message.files.map(file =>
							file.contentType.includes('image') ?
								<div className="user-message__img">
									<img onLoad={() => {if (update) {update()}}} src={file.uri} alt=""/>
								</div>
								:
								<div className="user-message__text-wrapper">
									<div className="user-message__text">
										<a target="_blank" href={file.uri}>{file.originalName}</a>
									</div>
								</div>
						)}
					</div>
				</>
			}
		</>
	);
};

export default UserMessage;
