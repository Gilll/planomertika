import React from 'react';
import s from "./RequestSteps.module.scss";
import { Checkbox} from "antd";

const FormRooms = ({form, setForm}) => {
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
									Гардеробная
								</Checkbox>
							</div>
						</div>
						<div className='checkboxWrap'>
							<div className={s.checkboxItem}>
								<Checkbox checked={form.rooms.kitchen}
										  onChange={(e) => setForm({...form, rooms: {...form.rooms, kitchen: e.target.checked}})}>
									Кухня
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
					</div>
					<div className="room-list__col">
						<div className='checkboxWrap'>
							<div className={s.checkboxItem}>
								<Checkbox checked={form.rooms.bedroom}
										  onChange={(e) => setForm({...form, rooms: {...form.rooms, bedroom: e.target.checked}})}>
									Спальня
								</Checkbox>
							</div>
						</div>
						<div className='checkboxWrap'>
							<div className={s.checkboxItem}>
								<Checkbox checked={form.rooms.childrensroom}
										  onChange={(e) => setForm({...form, rooms: {...form.rooms, childrensroom: e.target.checked}})}>
									Детская
								</Checkbox>
							</div>
						</div>
						<div className='checkboxWrap'>
							<div className={s.checkboxItem}>
								<Checkbox checked={form.rooms.bathroom}
										  onChange={(e) => setForm({...form, rooms: {...form.rooms, bathroom: e.target.checked}})}>
									Санузел
								</Checkbox>
							</div>
						</div>
						<div className='checkboxWrap'>
							<div className={s.checkboxItem}>
								<Checkbox checked={form.rooms.cabinet}
										  onChange={(e) => setForm({...form, rooms: {...form.rooms, cabinet: e.target.checked}})}>
									Кабинет
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
