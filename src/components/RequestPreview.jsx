import React from 'react';
import conv from '../asetss/img/conv.png';
import download from '../asetss/img/dl.png';
import {NavLink} from "react-router-dom";

const RequestPreview = ({dt, openModal, openChat}) => {
	const translateState = (st) => {
		switch (st) {
			case 'LATE': return 'Просрочен';
			case 'READY': return 'Выполнен';
			case 'IN_WORK': return 'В работе';
			case 'DIALOG_CREATED': return 'Обсуждение';
			default: return 'Выполняется';
		}
	}

	return (
		<div className="preview-list__item">
			<div className="preview-list__dl" onClick={openModal}>
				<img src={download}/>
			</div>
			<div className="preview-list__id">№ {dt.id}</div>
			<div className="preview-list__status">{translateState(dt.state.state)}</div>
			{dt.state.state !== 'READY' && <div className="preview-list__time-left">{dt.state.state !== 'LATE' ? 'Осталось' : 'На' } {dt.timeLeft.h.toString().padStart(2, '0')} : {dt.timeLeft.m.toString().padStart(2, '0')} : {dt.timeLeft.s.toString().padStart(2, '0')}</div>}
			<div className="preview-list__user">{dt.shortClientInfo.name} {dt.shortClientInfo.surname}</div>
			<div className="preview-list__email">{dt.shortClientInfo.email}</div>
			{dt.shortClientInfo.phone && <div className="preview-list__phone">{dt.shortClientInfo.phone}</div>}
			<div onClick={() => openChat(dt.chatDialogId)} className="preview-list__btn"><img src={conv}/>Перейти к чату</div>
		</div>
	);
};

export default RequestPreview;
