import React, {useCallback, useEffect, useState} from 'react';
import {useApi} from "../hooks/useApi";
import RoomList from "../components/admin/RoomList";
import {Outlet, useParams} from "react-router";
import {Scrollbars} from "react-custom-scrollbars";
import Stomp from "../utils/stomp";
import {v4 as uuidv4} from "uuid";
import {hostName} from "../API/config";
import LoadingIcon from "antd/es/button/LoadingIcon";
import Loading from "./Loading";

let stomp;

const AdminMain = () => {
	const [roomsIsLoading, setRoomsIsLoading] = useState(true)
	const [newMess, setNewMess] = useState(null);
	const [roomsPages, setRoomPages] = useState([])
	const [originalRooms, setOriginalRooms] = useState([])
	const [curPage, setCurPage] = useState(0)
	const [allRoomsRender, setAllRoomsRender] = useState(false)
	const [getChatAuth, getChatAuthIsLoading] = useApi({
		url: '/api/chat/signIn',
	});
	const [isMobRoomOpen, setIsMobRoomOpen] = useState(false)
	const [dId, setDialogId] = useState();

	const hostname = 'https://chatdev.mayabiorobotics.ru'

	const getRooms = async (page) => {
		let resp = '';
		try {
			const response = await fetch(hostname + '/api/dialogs?pageSize=25&page=' + page, {
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

	const getOrdersById = async (arr) => {
		let resp = '';
		let headers = {
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('token')
		}
		try {
			const response = await fetch(hostName + '/architectOrders/getOrdersFilter', {
				crossDomain: true,
				method: 'POST',
				body: JSON.stringify({
					countElementOnPage: arr.length,
					numPage: 0,
					orderId: arr
				}),
				headers: headers
			});
			resp = await response.json();
			if (!response.ok) {
				throw new Error(resp.error.description);
			}
		} catch (e) {
			if (e.message === 'Failed to fetch') {
				throw new Error('Нет соединения с сервером')
			} else {
				throw new Error(e.message)
			}
		}
		return resp;
	}

	const [getCurTime, getCurTimeIsLoading] = useApi({
		url: '/clientOrders/getTime',
		method: 'GET'
	});

	const getPageDialogs = (page) => {
		setRoomsIsLoading(true)
		getRooms(page).then((roomsresp) => {
			if (roomsresp.length < 25) {
				setAllRoomsRender(true);
			}
			let rss = roomsresp.map((elt) => {
				let el = {...elt };
				el.orderLoading = true;
				return el;
			})
			setOriginalRooms([...originalRooms, {
				arr: rss,
				page: page,
				timeCalculated: false
			}])
			setRoomPages([...roomsPages, rss])

			setRoomsIsLoading(false)
			console.log(roomsresp);
		})
	}

	useEffect(() => {
		if (originalRooms.length) {
			originalRooms.forEach((or, indd) => {
				if (!or.timeCalculated) {
					let curTime;
					getCurTime().then((resp) => {
						curTime = resp;
					})
					console.log(originalRooms[indd]);
					let ids = originalRooms[indd].arr.map((el) => { return JSON.parse(el.meta).orderId; })
					if (ids) { getOrdersById(ids).then((resp) => {
						let orderList = resp.orderResponseList;
						setRoomPages(roomsPages.map((curRM, curInd) => {
							if (indd === curInd) {
								return or.arr.map((elt, eltIndex) => {
									let el = {...elt };
									let curOrd = orderList.filter((re) => el.meta && (JSON.parse(el.meta).orderId === re.id))[0];
									el.timeLeft = {};
									el.orderLoading = false;
									let date1 = curOrd ? (curOrd.timeOfChangeState ? new Date(curOrd.timeOfChangeState) : new Date()) : new Date();
									let date2 = new Date(curTime);
									let timeDiff = Math.abs(date2.getTime() - date1.getTime());
									let days = parseInt(timeDiff/(1000*60*60*24));
									let minutes = parseInt((timeDiff/(1000*60))%60);
									let hours = parseInt((timeDiff/(1000*60*60))%24);
									let seconds = parseInt((timeDiff/1000)%60);
									el.timeLeft.d = days;
									el.timeLeft.h = hours;
									el.timeLeft.m = minutes;
									el.timeLeft.s = seconds;
									el.orderStatus = curOrd ? curOrd.state.state : 'READY';
									return el;
								})
							} else {
								return curRM;
							}
						}))
						setOriginalRooms(originalRooms.map((orEl, index) => {
							if (index === indd) {
								return {...orEl, timeCalculated: true}
							} else {
								return orEl;
							}
						}))
					})}
				}
			})
		}

	},[originalRooms])

	useEffect(() => {
		getChatAuth().then((resp) => {
			localStorage.setItem('jwtToken', resp.jwtToken)
			localStorage.setItem('exchangeName', resp.exchangeName)
			getPageDialogs(0)
		}).catch(() => console.log('ok'))
	},[])


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

	const params = useParams();
	let omfg = params.id;
	useEffect(() => {
		omfg = dId;
	},[dId])

	const onMessageReceived = (payload, idd) => {
		payload.ack();
		let message = JSON.parse(payload.body);
		if (message.type === 'MESSAGE') {
			let tmp = {...message.payload};
			setNewMess(tmp);
			//setMessages(st => [...st, tmp])
		}
	}

	useEffect(() => {
		notificationConnect();
		return () => stomp && stomp.disconnect();
	},[notificationConnect])

	useEffect(() => {
		if (sockConnected && stomp !== null) {
			if (!localStorage.getItem('uuid')) {
				localStorage.setItem('uuid', uuidv4())
			}
			if (localStorage.getItem('exchangeName') && sockConnected) stomp.subscribe('/exchange/' + localStorage.getItem('exchangeName'), onMessageReceived,
				{
					"id": "sub", "auto-delete": false, "x-queue-name": localStorage.getItem('uuid'), "ack": "client"
				});
		}
	},[sockConnected, localStorage.getItem('exchangeName')])

	const infiniteScroll = (val) => {
		if (!allRoomsRender) {
			if (val.top > 0.9) {
				if (!roomsIsLoading) {
					getPageDialogs(curPage +1);
					setCurPage(curPage + 1)
				}
			}
		}
	}

	const tick = () => {
		setRoomPages(roomsPages.map((rooms, index) => {
			if (!rooms[0].orderLoading) {
				return rooms.map((room) => {
					if (room.orderStatus !== 'READY') {
						let tm = {
							h: room.timeLeft.h,
							m: room.timeLeft.m,
							s: room.timeLeft.s
						}
						if (room.orderStatus !== 'LATE') {
							if (room.timeLeft.m === 0 && room.timeLeft.s === 0) {
								tm.h = room.timeLeft.h - 1;
								tm.m = 59;
								tm.s = 59;
							} else if (room.timeLeft.s === 0) {
								tm.m = room.timeLeft.m - 1;
								tm.s = 59;
							} else {
								tm.s = room.timeLeft.s - 1;
							}
							return {...room, timeLeft: tm }
						} else {
							if (room.timeLeft.m === 59 && room.timeLeft.s === 59) {
								tm.h = room.timeLeft.h + 1;
								tm.m = 0;
								tm.s = 0;
							} else if (room.timeLeft.s === 59) {
								tm.m = room.timeLeft.m + 1;
								tm.s = 0;
							} else {
								tm.s = room.timeLeft.s + 1;
							}
							return {...room, timeLeft: tm }
						}
					} else {
						return room;
					}
				})
			} else {
				return rooms;
			}
		}))
	};

	React.useEffect(() => {
		const timerID = setInterval(() => tick(), 1000);
		return () => clearInterval(timerID);
	});

	return (
		<div className="admin-container">
			<div className="admin-title">Активные чаты</div>
			<div className="admin-text">Выберите пользователя, чтобы начать переписку</div>
			<div className={ isMobRoomOpen ? "admin-chat mobIsOpen" : "admin-chat"}>
				<div className="admin-chat-rooms">
					{roomsPages.length > 0 ?
						<Scrollbars onScrollFrame={(val) => infiniteScroll(val)} autoHide>
							{roomsPages.map((rs, index) =>
								<RoomList key={index} rooms={roomsPages[index]} openRoom={() => setIsMobRoomOpen(true)} setRooms={(val) => {
									setRoomPages(roomsPages.map((rm,ind) => {
										if (index === ind) {
											return val;
										} else {
											return rm;
										}
									}))
								}}
								/>
							)}
							{roomsIsLoading &&
							<div><Loading /></div>
							}
						</Scrollbars>
						:
						<div><Loading /></div>
					}
				</div>
				<div className="admin-chat-room">
					<Outlet  context={[stomp, newMess, setNewMess, dId, setDialogId, setIsMobRoomOpen]}/>
				</div>
			</div>
		</div>
	);
};

export default AdminMain;
