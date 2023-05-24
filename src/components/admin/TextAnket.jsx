import React, {useState} from 'react';
import s from "../request/RequestSteps.module.scss";

const TextAnket = ({form}) => {
	useState(() => {
		console.log(form)
	})
	return (
		<div className={s.contentWrap}>
			<div className='title-anket'>Анкета клиента</div>
			<div className={s.aboutQuize}>
				<div className={s.aboutquizeTitle}>Индивидуальные особенности</div>
				<div className={s.aboutquizeSubtitle}>
					Информация о клиенте
				</div>
			</div>
			<div className={s.itemsQuize}>
				<div className={s.item}>
					<div className={s.selectTitle}>1. Сколько человек будет жить в вашей квартире?</div>
					<div className={s.selectItem}>
						<div className={s.selectSubtitle}>{form.orderPageOneResponse.peoples}</div>
					</div>
				</div>
				<div className={s.item}>
					<div className={s.selectTitle}>2. Есть ли у вас домашний питомец?</div>
					<div className={s.selectesWrap}>
						<div className={s.selectItem}>
							<div className={s.selectSubtitle}>{form.orderPageOneResponse.pets}</div>
						</div>
					</div>
				</div>
				<div className={s.item}>
					<div className={s.selectTitle}>3. Какой ваш примерный возраст?</div>
					<div className={s.selectItem}>
						<div className={s.selectSubtitle}>{form.orderPageOneResponse.age}</div>
					</div>
				</div>
				<div className={s.item}>
					<div className={s.selectTitle}>4. Есть ли у вас дети, или планируете в ближайшем будущем?</div>
					<div className={s.selectItem}>
						<div className={s.selectSubtitle}>{form.orderPageOneResponse.kids}</div>
					</div>
					<div className={'hidden-col ' + (form.orderPageOneResponse.kids && form.orderPageOneResponse.kids !== 'Нет' ? 'show' : '')}>
						<div className={s.selectSubtitle}>Кол-во {form.orderPageOneResponse.numberOfKids}</div>
					</div>
					<div className={'hidden-col ' + (form.orderPageOneResponse.numberOfKids > 0 && form.orderPageOneResponse.kids === 'Есть' ? 'show' : '')}>
						{form.orderPageOneResponse.numberOfKids > 0 && <>
							<div className={s.selectSubtitle} style={{ marginTop: '1.5rem' }}>Возраст детей</div>
							<div className={s.selectSubtitle}>{form.orderPageOneResponse.ageOfKids.map((el, index) =>
								<span key={index}>{el}{form.orderPageOneResponse.ageOfKids.length === (index - 1) ? '.' : ','} </span>
							)}</div>
						</>
						}
					</div>
				</div>
				<div className={s.item}>
					<div className={s.selectTitle}>5. Как часто к вам приходят гости  и сколько человек вы готовы принять к застолью?</div>
					<div className={s.selectItem}>
						<div className={s.selectSubtitle}>{form.orderPageOneResponse.guess}</div>
					</div>
					<div className={s.selectItem}>
						<div className={s.selectSubtitle}>Кол-во {form.orderPageOneResponse.numberOfGuess}</div>
					</div>
				</div>
			</div>
			<div className={s.aboutQuize}>
				<div className={s.aboutquizeTitle}>Комнаты</div>
				<div className={s.aboutquizeSubtitle}>
					Комнаты, которые клиент хотел бы иметь в будущей квартире
				</div>
					{{
						"wish": "string",
						advanced: ''
					}['advanced']}
				<div className={s.itemsQuize}>
					<div className={s.item}>
						{form.orderPageTwoResponse.isHallway &&
							<div className={s.selectItem}>
								<div className={s.selectSubtitle}>Прихожая</div>
							</div>
						}
						{form.orderPageTwoResponse.isBedroom &&
							<div className={s.selectItem}>
								<div className={s.selectSubtitle}>Основная спальня {form.orderPageTwoResponse.bedroomWithDressingRoom && <span>с гардеробной комнатой</span>}</div>
							</div>
						}
						{form.orderPageTwoResponse.isCabinet &&
							<div className={s.selectItem}>
								<div className={s.selectSubtitle}>Кабинет {form.orderPageTwoResponse.isCabinetWithBed && <span>со спальным местом</span>}</div>
							</div>
						}
						{form.orderPageTwoResponse.isChildrens &&
							<div className={s.selectItem}>
								<div className={s.selectSubtitle}>Детская {form.orderPageTwoResponse.isChildrensWithDressingRoom && <span>с гардеробной комнатой</span>}</div>
							</div>
						}
						{form.orderPageTwoResponse.isDinningRoom &&
							<div className={s.selectItem}>
								<div className={s.selectSubtitle}>Столовая </div>
							</div>
						}
						{form.orderPageTwoResponse.isGuestBedroom &&
						<div className={s.selectItem}>
							<div className={s.selectSubtitle}>Спальня гостевая  {form.orderPageTwoResponse.isGuestBedroomWithDressingRoom && <span>с гардеробной комнатой</span>}</div>
						</div>
						}
						{form.orderPageTwoResponse.isGuestWc &&
						<div className={s.selectItem}>
							<div className={s.selectSubtitle}>Санузел гостевой  {form.orderPageTwoResponse.isGuestWcWithShower && <span>с душем</span>}</div>
						</div>
						}
						{form.orderPageTwoResponse.isKitchen &&
						<div className={s.selectItem}>
							<div className={s.selectSubtitle}>Кухня{form.orderPageTwoResponse.isKitchenDinningRoom && <span>-столовая</span>}{form.orderPageTwoResponse.isKitchenLivingRoom && <span>-гостиная</span>}</div>
						</div>
						}
						{form.orderPageTwoResponse.isLivingRoom &&
						<div className={s.selectItem}>
							<div className={s.selectSubtitle}>Гостиная</div>
						</div>
						}
						{form.orderPageTwoResponse.isPantry &&
						<div className={s.selectItem}>
							<div className={s.selectSubtitle}>Кладовая</div>
						</div>
						}
						{form.orderPageTwoResponse.isWardrobe &&
						<div className={s.selectItem}>
							<div className={s.selectSubtitle}>Гардероб при входе</div>
						</div>
						}
						{form.orderPageTwoResponse.isWc &&
						<div className={s.selectItem}>
							<div className={s.selectSubtitle}>Cанузел основной{form.orderPageTwoResponse.isWcWithBath && <span> с ванной</span>}{form.orderPageTwoResponse.isWcWithShower && <span> с душем</span>}</div>
						</div>
						}
					</div>
					{form.orderPageTwoResponse.wish &&
						<div className={s.item}>
							<div className={s.selectTitle}>Комментарий клиента</div>
							<div className={s.selectItem}>
								<div className={s.selectSubtitle}>{form.orderPageOneResponse.wish}</div>
							</div>
						</div>
					}
				</div>
			</div>

			{form.clientFiles && (form.clientFiles.length > 0) && <>
				<div className={s.aboutQuize}>
					<div className={s.aboutquizeTitle}>План БТИ</div>
				</div>
				<div className="dl-links">
					{form.clientFiles.map((file, index) =>
						<div className="dl-link" key={file.id}>
							<div className={s.selectSubtitle}>
								<a href={file.url} className={s.download} download>
									<img src="/img/download-icon.svg" alt="" />
									<span>{file.fileName}</span>
								</a>
							</div>
						</div>
					)}
				</div>
			</>

			}
		</div>
	);
};

export default TextAnket;
