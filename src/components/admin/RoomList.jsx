import React from 'react';
import {NavLink} from "react-router-dom";
import {RouteNames} from "../../router/routeNames";

const RoomList = ({rooms}) => {
	return (
		rooms.map((room, index) =>
				<NavLink to={RouteNames.CHAT + '/' + room.dialogId} className="room-list__item" key={index}>
					<div className="room-list__icon">
						<img src={room.image} alt=''/>
					</div>
					<div className="room-list__info">
						<div className="room-list__name">{room.name}</div>
						<div className="room-list__last-mess">{room.content}</div>
					</div>
					<div className="room-list__date">{new Date(room.timestamp).toLocaleTimeString()}</div>
				</NavLink>
			)
	);
};

export default RoomList;
