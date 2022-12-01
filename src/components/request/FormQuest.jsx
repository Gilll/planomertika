import React from 'react';
import s from "./RequestSteps.module.scss";
import {Select} from "antd";

const FormQuest = ({form, setForm}) => {
    const { Option } = Select;

    const getAgesArr = (cout) => {
    	let arr = [];
    	for (let i = 0; i < cout; i++) {
    		arr.push(0)
		}
    	return arr;
	}

    return (
        <div className={s.itemsQuize}>
            <div className={s.item}>
                <div className={s.selectTitle}>1. Сколько человек будет жить в вашей квартире?</div>
                <div className={s.selectItem}>
                    <div className={s.selectSubtitle}>Кол-во</div>
                    <Select value={form.questionnaire.tenantsCount} onChange={(val) =>
                        setForm({...form, questionnaire: {...form.questionnaire, tenantsCount: val}})
                    }
                            className={s.select}>
                        <Option value="1">1</Option>
                        <Option value="2">2</Option>
                        <Option value="3">3</Option>
                        <Option value="4">4</Option>
                        <Option value="5">5</Option>
                        <Option value="6">5+</Option>
                    </Select>
                </div>
            </div>
            <div className={s.item}>
                <div className={s.selectTitle}>2. Есть ли у вас домашний питомец?</div>
                <div className={s.selectesWrap}>
                    <div className={s.selectItem}>
                        <div className={s.selectSubtitle}>Питомец</div>
                        <Select value={form.questionnaire.pet} onChange={(val) => setForm({...form, questionnaire:
                                {...form.questionnaire, pet: val}})} className={s.select}>
                            <Option value="Нет">Нет</Option>
                            <Option value="Да">Да</Option>
                            <Option value="Другое">Другое</Option>
                        </Select>
                    </div>
                    <div className={'hidden-col ' + (form.questionnaire.pet === 'Другое' ? 'show' : '')}>
                        <div className={s.selectSubtitle}>Питомец</div>
                        <input value={form.questionnaire.petAdvanced}
                               onChange={(e) => setForm({...form, questionnaire:
                                       {...form.questionnaire, petAdvanced: e.target.value}})}
                               className={s.input} type="text" />
                    </div>
                </div>
            </div>
            <div className={s.item}>
                <div className={s.selectTitle}>3. Какой ваш примерный возраст?</div>
                <div className={s.selectItem}>
                    <div className={s.selectSubtitle}>Возраст</div>
                    <Select value={form.questionnaire.age}
                            onChange={(val) => setForm({...form, questionnaire:
                                    {...form.questionnaire, age: val}})} className={s.select}>
                        <Option value="18-25">18-25</Option>
                        <Option value="26-40">26-40</Option>
                        <Option value="41-60">41-60</Option>
                        <Option value="61-65">61-65</Option>
                        <Option value="65+">65+</Option>
                    </Select>
                </div>
            </div>
            <div className={s.item}>
                <div className={s.selectTitle}>4. Есть ли у вас дети, или планируете в ближайшем будущем?</div>
                <div className={s.selectesWrap}>
                    <div className={s.selectItem}>
                        <div className={s.selectSubtitle}>Дети</div>
                        <Select value={form.questionnaire.childrens}
                                onChange={(val) => {
                                	let tmp = {...form.questionnaire, childrens: val, childrensAge: [], childrensCount: '' };
									setForm({...form, questionnaire: tmp });
								}} className={s.select}>
                            <Option value="Есть">Есть</Option>
                            <Option value="Нет, но планируется">Нет, но планируется</Option>
                            <Option value="Нет">Нет</Option>
                        </Select>
                    </div>
                    <div className={'hidden-col ' + (form.questionnaire.childrens && form.questionnaire.childrens !== 'Нет' ? 'show' : '')}>
                        <div className={s.selectSubtitle}>Кол-во</div>
                        <Select value={form.questionnaire.childrensCount}
                                onChange={(val) => setForm({...form, questionnaire:
                                        {...form.questionnaire, childrensCount: val, childrensAge: getAgesArr(val)}})} className={s.select}>
                            <Option value={1}>1</Option>
                            <Option value={2}>2</Option>
                            <Option value={3}>3</Option>
                            <Option value={4}>4</Option>
                            <Option value={5}>5</Option>
                            <Option value={6}>5+</Option>
                        </Select>
                    </div>
                </div>
				<div className={s.selectesWrap} style={{ height: form.questionnaire.childrensCount > 0 && form.questionnaire.childrens === 'Есть' ? '9.5rem' : 0 }}>
					<div className={'hidden-col ' + (form.questionnaire.childrensCount > 0 && form.questionnaire.childrens === 'Есть' ? 'show' : '')}>
						{form.questionnaire.childrensCount > 0 && <>
						<div className={s.selectSubtitle} style={{ marginTop: '1.5rem' }}>Возраст детей</div>
						<Select value={form.questionnaire.childrensAge[0]}
								onChange={(val) => setForm({...form, questionnaire:
										{...form.questionnaire, childrensAge: form.questionnaire.childrensAge.map((el, ind) => ind === 0 ? val : el)}})} className={s.select}>
							<Option value={0}>0</Option>
							<Option value={1}>1</Option>
							<Option value={2}>2</Option>
							<Option value={3}>3</Option>
							<Option value={4}>4</Option>
							<Option value={5}>5</Option>
							<Option value={6}>6</Option>
							<Option value={7}>7</Option>
							<Option value={8}>8</Option>
							<Option value={9}>9</Option>
							<Option value={10}>10</Option>
							<Option value={11}>11</Option>
							<Option value={12}>12</Option>
							<Option value={13}>13</Option>
							<Option value={14}>14</Option>
							<Option value={15}>15</Option>
							<Option value={16}>16</Option>
							<Option value={17}>17</Option>
							<Option value={18}>18</Option>
						</Select>
						</>
						}
					</div>
					<div className={'hidden-col ' + (form.questionnaire.childrensCount > 1 && form.questionnaire.childrens === 'Есть' ? 'show' : '')}>
						{form.questionnaire.childrensCount > 1 && <>
						<div className={s.selectSubtitle} style={{ marginTop: '1.5rem' }}>Возраст детей</div>
						<Select value={form.questionnaire.childrensAge[1]}
								onChange={(val) => setForm({...form, questionnaire:
										{...form.questionnaire, childrensAge: form.questionnaire.childrensAge.map((el, ind) => ind === 1 ? val : el)}})} className={s.select}>
							<Option value={0}>0</Option>
							<Option value={1}>1</Option>
							<Option value={2}>2</Option>
							<Option value={3}>3</Option>
							<Option value={4}>4</Option>
							<Option value={5}>5</Option>
							<Option value={6}>6</Option>
							<Option value={7}>7</Option>
							<Option value={8}>8</Option>
							<Option value={9}>9</Option>
							<Option value={10}>10</Option>
							<Option value={11}>11</Option>
							<Option value={12}>12</Option>
							<Option value={13}>13</Option>
							<Option value={14}>14</Option>
							<Option value={15}>15</Option>
							<Option value={16}>16</Option>
							<Option value={17}>17</Option>
							<Option value={18}>18</Option>
						</Select>
						</>
						}
					</div>
				</div>
				<div className={s.selectesWrap} style={{ height: form.questionnaire.childrensCount > 2 && form.questionnaire.childrens === 'Есть'  ? '9.5rem' : 0 }}>
					<div className={'hidden-col ' + (form.questionnaire.childrensCount > 2 && form.questionnaire.childrens === 'Есть' ? 'show' : '')}>
						{form.questionnaire.childrensCount > 2 && <>
						<div className={s.selectSubtitle} style={{ marginTop: '1.5rem' }}>Возраст детей</div>
						<Select value={form.questionnaire.childrensAge[2]}
								onChange={(val) => setForm({...form, questionnaire:
										{...form.questionnaire, childrensAge: form.questionnaire.childrensAge.map((el, ind) => ind === 2 ? val : el)}})} className={s.select}>
							<Option value={0}>0</Option>
							<Option value={1}>1</Option>
							<Option value={2}>2</Option>
							<Option value={3}>3</Option>
							<Option value={4}>4</Option>
							<Option value={5}>5</Option>
							<Option value={6}>6</Option>
							<Option value={7}>7</Option>
							<Option value={8}>8</Option>
							<Option value={9}>9</Option>
							<Option value={10}>10</Option>
							<Option value={11}>11</Option>
							<Option value={12}>12</Option>
							<Option value={13}>13</Option>
							<Option value={14}>14</Option>
							<Option value={15}>15</Option>
							<Option value={16}>16</Option>
							<Option value={17}>17</Option>
							<Option value={18}>18</Option>
						</Select>
						</>
						}
					</div>
					<div className={'hidden-col ' + (form.questionnaire.childrensCount > 3 && form.questionnaire.childrens === 'Есть' ? 'show' : '')}>
						{form.questionnaire.childrensCount > 3 && <>
						<div className={s.selectSubtitle} style={{ marginTop: '1.5rem' }}>Возраст детей</div>
						<Select value={form.questionnaire.childrensAge[3]}
								onChange={(val) => setForm({...form, questionnaire:
										{...form.questionnaire, childrensAge: form.questionnaire.childrensAge.map((el, ind) => ind === 3 ? val : el)}})} className={s.select}>
							<Option value={0}>0</Option>
							<Option value={1}>1</Option>
							<Option value={2}>2</Option>
							<Option value={3}>3</Option>
							<Option value={4}>4</Option>
							<Option value={5}>5</Option>
							<Option value={6}>6</Option>
							<Option value={7}>7</Option>
							<Option value={8}>8</Option>
							<Option value={9}>9</Option>
							<Option value={10}>10</Option>
							<Option value={11}>11</Option>
							<Option value={12}>12</Option>
							<Option value={13}>13</Option>
							<Option value={14}>14</Option>
							<Option value={15}>15</Option>
							<Option value={16}>16</Option>
							<Option value={17}>17</Option>
							<Option value={18}>18</Option>
						</Select>
						</>
						}
					</div>
				</div>
				<div className={s.selectesWrap} style={{ height: form.questionnaire.childrensCount > 4 && form.questionnaire.childrens === 'Есть'  ? '9.5rem' : 0 }}>
					<div className={'hidden-col ' + (form.questionnaire.childrensCount > 4 && form.questionnaire.childrens === 'Есть' ? 'show' : '')}>
						{form.questionnaire.childrensCount > 4 && <>
						<div className={s.selectSubtitle} style={{ marginTop: '1.5rem' }}>Возраст детей</div>
						<Select value={form.questionnaire.childrensAge[2]}
								onChange={(val) => setForm({...form, questionnaire:
										{...form.questionnaire, childrensAge: form.questionnaire.childrensAge.map((el, ind) => ind === 2 ? val : el)}})} className={s.select}>
							<Option value={0}>0</Option>
							<Option value={1}>1</Option>
							<Option value={2}>2</Option>
							<Option value={3}>3</Option>
							<Option value={4}>4</Option>
							<Option value={5}>5</Option>
							<Option value={6}>6</Option>
							<Option value={7}>7</Option>
							<Option value={8}>8</Option>
							<Option value={9}>9</Option>
							<Option value={10}>10</Option>
							<Option value={11}>11</Option>
							<Option value={12}>12</Option>
							<Option value={13}>13</Option>
							<Option value={14}>14</Option>
							<Option value={15}>15</Option>
							<Option value={16}>16</Option>
							<Option value={17}>17</Option>
							<Option value={18}>18</Option>
						</Select>
						</>
						}
					</div>
					<div className={'hidden-col ' + (form.questionnaire.childrensCount > 5 && form.questionnaire.childrens === 'Есть' ? 'show' : '')}>
						{form.questionnaire.childrensCount > 5 && <>
						<div className={s.selectSubtitle} style={{ marginTop: '1.5rem' }}>Возраст детей</div>
						<Select value={form.questionnaire.childrensAge[3]}
								onChange={(val) => setForm({...form, questionnaire:
										{...form.questionnaire, childrensAge: form.questionnaire.childrensAge.map((el, ind) => ind === 3 ? val : el)}})} className={s.select}>
							<Option value={0}>0</Option>
							<Option value={1}>1</Option>
							<Option value={2}>2</Option>
							<Option value={3}>3</Option>
							<Option value={4}>4</Option>
							<Option value={5}>5</Option>
							<Option value={6}>6</Option>
							<Option value={7}>7</Option>
							<Option value={8}>8</Option>
							<Option value={9}>9</Option>
							<Option value={10}>10</Option>
							<Option value={11}>11</Option>
							<Option value={12}>12</Option>
							<Option value={13}>13</Option>
							<Option value={14}>14</Option>
							<Option value={15}>15</Option>
							<Option value={16}>16</Option>
							<Option value={17}>17</Option>
							<Option value={18}>18</Option>
						</Select>
						</>
						}
					</div>
				</div>
            </div>
            <div className={s.item}>
                <div className={s.selectTitle}>5. Как часто к вам приходят гости  и сколько человек вы готовы принять к застолью?</div>
                <div className={s.selectesWrap}>
                    <div className={s.selectItem}>
                        <div className={s.selectSubtitle}>Гости</div>
                        <Select value={form.questionnaire.guests}
                                onChange={(val) => setForm({...form, questionnaire:
                                        {...form.questionnaire, guests: val}})} className={s.select}>
                            <Option value="Раз в неделю">Раз в неделю</Option>
                            <Option value="Раз в месяц">Раз в месяц</Option>
                            <Option value="Раз в пол года">Раз в пол года</Option>
                        </Select>
                    </div>
                    <div className={s.selectItem}>
                        <div className={s.selectSubtitle}>Кол-во</div>
                        <Select value={form.questionnaire.guestsCount}
                                onChange={(val) => setForm({...form, questionnaire:
                                        {...form.questionnaire, guestsCount: val}})} className={s.select}>
                            <Option value="1-2">1-2</Option>
                            <Option value="3-7">3-7</Option>
                            <Option value="7+">7+</Option>
                        </Select>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormQuest;
