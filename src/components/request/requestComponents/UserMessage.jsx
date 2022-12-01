import React from 'react';

const UserMessage = ({message, userId}) => {
	return (
		<>
			{message.sender.userId === userId ?
				<div className="user-message user-message--self">
					<div className="user-message__text-wrapper">
						<div className="user-message__text">{message.content}</div>
					</div>
					<div className="user-message__status">
						<span className="user-message__date">{new Date(message.timestamp).toLocaleTimeString()}</span>
						<span className="user-message__user-name">Вы</span>
					</div>
				</div>
				:
				<div className="user-message user-message--companion">
					<div className="user-message__row">
						<div className="user-message__icon">
							<img src={message.sender.avatar} alt=""/>
						</div>
						<div className="user-message__text-wrapper">
							<div className="user-message__text">{message.content}</div>
						</div>
					</div>
					<div className="user-message__status">
						<span className="user-message__user-name">{ message.sender.firstName } { message.sender.lastName }</span>
						<span className="user-message__date">{new Date(message.timestamp).toLocaleTimeString()}</span>
					</div>
				</div>
			}
		</>
	);
};

export default UserMessage;
