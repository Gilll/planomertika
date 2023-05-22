import React, {useEffect, useState} from 'react';
import s from "./RequestSteps.module.scss";
import { Checkbox} from "antd";

const FormRooms = ({form, setForm}) => {

	useEffect(() => {
		console.log(form)
	},[])

	return (
			<>
				<div className="room-list">
					<div className="room-list__col">
						<div className='checkboxWrap'>
							<div className={s.checkboxItem}>
								<Checkbox checked={form.rooms.hallway}
										  onChange={(e) => setForm({...form, rooms: {...form.rooms, hallway: e.target.checked}})}>
									Прихожая
								</Checkbox>
							</div>
						</div>
						<div className='checkboxWrap'>
							<div className={s.checkboxItem}>
								<Checkbox checked={form.rooms.wardrobe}
										  onChange={(e) => setForm({...form, rooms: {...form.rooms, wardrobe: e.target.checked}})}>
									Гардероб при входе
								</Checkbox>
							</div>
						</div>
						<div className='checkboxWrap'>
							<div className={s.checkboxItem}>
								<Checkbox checked={form.rooms.kitchen}
										  onChange={(e) => {
										  	setForm({...form, rooms: {...form.rooms, kitchen: e.target.checked, kitchenDinningRoom: false, kitchenLivingRoom: false }})
										  }}>
									Кухня
								</Checkbox>
							</div>
						</div>
						<div className={form.rooms.kitchen ? 'checkboxWrap sub' : 'checkboxWrap sub hid'}>
							<div className={s.checkboxItem}>
								<Checkbox checked={form.rooms.kitchenDinningRoom}
										  onChange={(e) => {
											  if (e.target.checked) {
												  setForm({...form, rooms: {...form.rooms, kitchenDinningRoom: e.target.checked, kitchenLivingRoom: false}})
											  } else {
												  setForm({...form, rooms: {...form.rooms, kitchenDinningRoom: e.target.checked}})
											  }
										  }}
								>
									Кухня-столовая
								</Checkbox>
							</div>
						</div>
						<div className={form.rooms.kitchen ? 'checkboxWrap sub' : 'checkboxWrap sub hid'}>
							<div className={s.checkboxItem}>
								<Checkbox checked={form.rooms.kitchenLivingRoom}
												 onChange={(e) => {
													 if (e.target.checked) {
														 setForm({...form, rooms: {...form.rooms, kitchenLivingRoom: e.target.checked, kitchenDinningRoom: false}})
													 } else {
														 setForm({...form, rooms: {...form.rooms, kitchenLivingRoom: e.target.checked}})
													 }
												 }}>
									Кухня-гостиная
								</Checkbox>
							</div>
						</div>
						<div className='checkboxWrap'>
							<div className={s.checkboxItem}>
								<Checkbox checked={form.rooms.livingroom}
										  onChange={(e) => setForm({...form, rooms: {...form.rooms, livingroom: e.target.checked}})}>
									Гостиная
								</Checkbox>
							</div>
						</div>
						<div className='checkboxWrap'>
							<div className={s.checkboxItem}>
								<Checkbox checked={form.rooms.dinningRoom}
										  onChange={(e) => setForm({...form, rooms: {...form.rooms, dinningRoom: e.target.checked}})}>
									Cтоловая
								</Checkbox>
							</div>
						</div>
						<div className='checkboxWrap'>
							<div className={s.checkboxItem}>
								<Checkbox checked={form.rooms.guestBedroom}
										  onChange={(e) => {
											  setForm({...form, rooms: {...form.rooms, guestBedroom: e.target.checked, guestBedroomWithDressingRoom: false }})
										  }}>
									Cпальня гостевая
								</Checkbox>
							</div>
						</div>
						<div className={form.rooms.guestBedroom ? 'checkboxWrap sub' : 'checkboxWrap sub hid'}>
							<div className={s.checkboxItem}>
								<Checkbox checked={form.rooms.guestBedroomWithDressingRoom}
										  onChange={(e) => setForm({...form, rooms: {...form.rooms, guestBedroomWithDressingRoom: e.target.checked}})}
								>
									C гардеробной комнатой
								</Checkbox>
							</div>
						</div>
					</div>
					<div className="room-list__col">
						<div className='checkboxWrap'>
							<div className={s.checkboxItem}>
								<Checkbox checked={form.rooms.cabinet}
										  onChange={(e) => setForm({...form, rooms: {...form.rooms, cabinet: e.target.checked, сabinetWithBed: false}})}>
									Кабинет
								</Checkbox>
							</div>
						</div>
						<div className={form.rooms.cabinet ? 'checkboxWrap sub' : 'checkboxWrap sub hid'}>
							<div className={s.checkboxItem}>
								<Checkbox checked={form.rooms.сabinetWithBed}
										  onChange={(e) => setForm({...form, rooms: {...form.rooms, сabinetWithBed: e.target.checked}})}
								>
									Со спальным местом
								</Checkbox>
							</div>
						</div>
						<div className='checkboxWrap'>
							<div className={s.checkboxItem}>
								<Checkbox checked={form.rooms.bedroom}
										  onChange={(e) => setForm({...form, rooms: {...form.rooms, bedroom: e.target.checked, bedroomWithDressingRoom: false }})}>
									Основная спальня
								</Checkbox>
							</div>
						</div>
						<div className={form.rooms.bedroom ? 'checkboxWrap sub' : 'checkboxWrap sub hid'}>
							<div className={s.checkboxItem}>
								<Checkbox checked={form.rooms.bedroomWithDressingRoom}
												 onChange={(e) => setForm({...form, rooms: {...form.rooms, bedroomWithDressingRoom: e.target.checked}})}>
									С гардеробной комнатой
								</Checkbox>
							</div>
						</div>
						<div className='checkboxWrap'>
							<div className={s.checkboxItem}>
								<Checkbox checked={form.rooms.bathroom}
										  onChange={(e) => setForm({...form, rooms: {...form.rooms, bathroom: e.target.checked, bathroomWithShower: false, bathroomWithBath: false}})}>
									Санузел основной
								</Checkbox>
							</div>
						</div>
						<div className={form.rooms.bathroom ? 'checkboxWrap sub' : 'checkboxWrap sub hid'}>
							<div className={s.checkboxItem}>
								<Checkbox checked={form.rooms.bathroomWithShower}
										  onChange={(e) => setForm({...form, rooms: {...form.rooms, bathroomWithShower: e.target.checked}})}>
									C душем
								</Checkbox>
							</div>
						</div>
						<div className={form.rooms.bathroom ? 'checkboxWrap sub' : 'checkboxWrap sub hid'}>
							<div className={s.checkboxItem}>
								<Checkbox checked={form.rooms.bathroomWithBath}
										  onChange={(e) => setForm({...form, rooms: {...form.rooms, bathroomWithBath: e.target.checked}})}>
									C ванной
								</Checkbox>
							</div>
						</div>
						<div className='checkboxWrap'>
							<div className={s.checkboxItem}>
								<Checkbox checked={form.rooms.guestWc}
										  onChange={(e) => setForm({...form, rooms: {...form.rooms, guestWc: e.target.checked, guestWcWithShower: false}})}>
									Санузел гостевой
								</Checkbox>
							</div>
						</div>
						<div className={form.rooms.guestWc ? 'checkboxWrap sub' : 'checkboxWrap sub hid'}>
							<div className={s.checkboxItem}>
								<Checkbox checked={form.rooms.guestWcWithShower}
										  onChange={(e) => setForm({...form, rooms: {...form.rooms, guestWcWithShower: e.target.checked}})}>
									С душем
								</Checkbox>
							</div>
						</div>
						<div className='checkboxWrap'>
							<div className={s.checkboxItem}>
								<Checkbox checked={form.rooms.pantry}
										  onChange={(e) => setForm({...form, rooms: {...form.rooms, pantry: e.target.checked}})}>
									Кладовая
								</Checkbox>
							</div>
						</div>
						<div className='checkboxWrap'>
							<div className={s.checkboxItem}>
								<Checkbox checked={form.rooms.childrensroom}
										  onChange={(e) => setForm({...form, rooms: {...form.rooms, childrensroom: e.target.checked, childrensWithDressingRoom: false}})}>
									Детская
								</Checkbox>
							</div>
						</div>
						<div className={form.rooms.childrensroom ? 'checkboxWrap sub' : 'checkboxWrap sub hid'}>
							<div className={s.checkboxItem}>
								<Checkbox checked={form.rooms.childrensWithDressingRoom}
										  onChange={(e) => setForm({...form, rooms: {...form.rooms, childrensWithDressingRoom: e.target.checked}})}>
									С гардеробной комнатой
								</Checkbox>
							</div>
						</div>
					</div>
				</div>

				<div className={s.userText}>
					<div className={s.title}>Произвольное пожелание</div>
					<textarea value={form.rooms.advanced}
							  onChange={(e) => setForm({...form, rooms: {...form.rooms, advanced: e.target.value}})}
							  placeholder='Ваше пожелание...' cols="30" rows="10"/>
				</div>
			</>
	);
};

export default FormRooms;
