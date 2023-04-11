import React, {useEffect, useState} from 'react';
import {NavLink} from "react-router-dom";
import {RouteNames} from "../../router/routeNames";

const RoomList = ({rooms, setRooms}) => {
	const [hideUnread, setHideUnread] = useState(rooms.map(() => true))

	return (
		rooms.length && rooms.map((room, index) =>
				<NavLink to={RouteNames.CHAT + '/' + room.dialogId} onClick={() => {
					setRooms([...rooms].map((el) => {
						if (room.dialogId === el.dialogId) {
							return {...el, unreadMessages: 0 };
						} else {
							return el;
						}
					}))
					setHideUnread([...hideUnread].map((el, ind) => {
						if (index === ind) {
							return false;
						} else {
							return el;
						}
					}))
				}} className={hideUnread[index] ? "room-list__item" : "room-list__item hide-unread"} key={index}>
					<div className="room-list__info">
						{room.orderLoading ?
							<div className="room-list__status">Загрузка статуса заказа</div>
						:
							<div className="room-list__status">{{
								'READY': 'Готов',
								'LATE': 'Опаздывает',
								'IN_WORK': 'В работе',
								'DIALOG_CREATED': 'Обсуждение'
							}[room.orderStatus]} &nbsp;
								{room.orderStatus !== 'READY' &&
									<>
										{room.orderStatus !== 'LATE' ?
											<>
												| осталось &nbsp;
												<span>{`${room.timeLeft.h.toString().padStart(2, '0')}`}</span> : <span>{`${room.timeLeft.m.toString().padStart(2, '0')}`}</span> : <span>{`${room.timeLeft.s.toString().padStart(2, '0')}`}</span>
											</>
										:
											<>
												| на &nbsp;
												<span>{room.timeLeft.d ? `${(room.timeLeft.h + (room.timeLeft.d - 1)*24).toString().padStart(2, '0')}` : `${room.timeLeft.h.toString().padStart(2, '0')}`}</span> : <span>{`${room.timeLeft.m.toString().padStart(2, '0')}`}</span> : <span>{`${room.timeLeft.s.toString().padStart(2, '0')}`}</span>
											</>
										}

									</>
								}
							</div>
						}
						<div className="room-list__name">{room.name}</div>
						<div className="room-list__last-mess">{room.content}</div>
						<div className={room.unreadMessages ? "room-list__unread" : "room-list__unread hidden"}>{room.unreadMessages}</div>
					</div>
					<div className="room-list__date">{new Date(room.timestamp).getHours()}:{new Date(room.timestamp).getMinutes()}</div>
				</NavLink>
			)
	);
};

export default RoomList;
