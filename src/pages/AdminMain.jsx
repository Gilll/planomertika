import React, {useEffect, useState} from 'react';
import {useApi} from "../hooks/useApi";
import RoomList from "../components/admin/RoomList";
import {Outlet} from "react-router";

let stomp;

const AdminMain = () => {
	const [rooms, setRooms] = useState([])
	const [roomsIsLoading, setRoomsIsLoading] = useState(true)
	const [newMess, setNewMess] = useState(null);
	const [getChatAuth, getChatAuthIsLoading] = useApi({
		url: '/api/chat/signIn',
	});

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

	useEffect(() => {
		getChatAuth().then((resp) => {
			console.log(resp)
			localStorage.setItem('jwtToken', resp.jwtToken)
			localStorage.setItem('exchangeName', resp.exchangeName)
			localStorage.setItem('chatUserId', resp)
			getRooms().then((roomsresp) => {
				setRooms(roomsresp);
				setRoomsIsLoading(false)
				console.log(roomsresp);
				getRoom(roomsresp[0].dialogId).then(roomData => {
					console.log(roomData);
					console.log('SET MESSAGES');
					console.log(roomData.messages);
				}).then(() => console.log('ok'));
			})
		}).catch(() => console.log('ok'))
	},[])

	return (
		<div className="admin-container">
			<div className="admin-title">Активные чаты</div>
			<div className="admin-text">Выберите пользователя, чтобы начать переписку</div>
			<div className="admin-chat">
				<div className="admin-chat-rooms">
					{roomsIsLoading ?
						<div>loading...</div>
						:
						<RoomList rooms={rooms}/>
					}
				</div>
				<div className="admin-chat-room">
					<Outlet  context={[stomp, newMess, setNewMess]}/>
				</div>
			</div>
		</div>
	);
};

export default AdminMain;
