import React from 'react';
import { Button } from "antd";
import { RequestSteps } from "./RequestSteps";
import s from './RequestSteps.module.scss';
import UserAbout from './requestComponents/userAbout/UserAbout';
import InfoSteps from './requestComponents/infoSteps/InfoSteps';
import { Checkbox } from 'antd';
import { Modal } from 'antd';
import { Collapse, Select, message, Upload } from 'antd';
const { Option } = Select;
const { Panel } = Collapse;


const { Dragger } = Upload;

const props = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',

    onChange(info) {
        const { status } = info.file;

        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }

        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },

    onDrop(e) {
        console.log('Dropped files', e.dataTransfer.files);
    },
};


const Rate = ({ nextStep }) => {
    const [valuePet, setValuePet] = React.useState('');
    const [valueChildren, setValueChildren] = React.useState('');
    const [checked1, setChecked1] = React.useState(false);
    const [checked2, setChecked2] = React.useState(false);
    const [checked3, setChecked3] = React.useState(false);
    const [checked4, setChecked4] = React.useState(false);
    const [checked5, setChecked5] = React.useState(false);
    const [checked6, setChecked6] = React.useState(false);
    const [checked7, setChecked7] = React.useState(false);
    const [checked8, setChecked8] = React.useState(false);

    const [isModalVisible, setIsModalVisible] = React.useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };



    const data = {
        numberStep: "2",
        title: "Выбор тарифа",
        par1: "Услуги архитектора как правило носят комплексный характер, и поэтому очень хорошо оплачиваются: долгие согласования, альбомы чертежей, визуализации, развертки и подборки материалов – иногда все это излишне. Это выгодно отличает наш сервис от обычных дизайнерских бюро: в десятки раз дешевле мы предлагаем вам идею планировки вашей квартиры и ничего лишнего – вы можете передавать чертеж строителям уже через сутки после заказа.",
        par2: "На тарифе «Базовый» вы загружаете исходные данные и через 24 часа после оплаты получаете готовую планировку в формате PDF: архитектурный чертеж вашей квартиры в масштабе с нанесением всех перегородок, напольных покрытий, расстановкой необходимой мебели и сантехники, а также экспликацией помещений и балансом площадей.",
    }

    return (
        <div className={s.rate}>
            <div className="container">
                <div className={s.inner}>
                    <div className={s.quizeBlock}>
                        <div className={s.title}>Выберите подходящий для вас тариф</div>
                        <div className={s.selectRate}>
                            <div className={s.rateWrap}>
                                <Checkbox>С чатом с архитектором</Checkbox>
                                <div className={s.price}>4000 <sup>₽</sup></div>
                            </div>
                            <div className={s.aboutRate}>
                                Без проекта перепланировки нельзя приступать к ремонту квартир:
                                Непонятно, что можно изменять в ходе ремонта, а что запрещается законом.
                                Без проекта перепланировки нельзя приступать к ремонту квартир:
                                Непонятно, что можно изменять в ходе ремонта, а что запрещается законом
                            </div>
                            <div className={s.videoWrap}>
                                <div className={s.videoTitle}>Пример работы</div>
                                <div className={s.video}>
                                    <img src="img/video.png" alt="" />
                                    <button>
                                        <img src="img/play.png" alt="" />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className={s.bottomBlock}>
                            <Button className={s.btnColor} type="primary" onClick={() => nextStep(RequestSteps.CHAT)}>Перейти к оплате</Button>
                            <div className={s.logoBank}>
                                <img src="img/logoBank.png" alt="" />
                            </div>
                        </div>
                    </div>
                    <div className={s.infoBlock}>
                        <UserAbout name="Александр Решетников" eMail="aleksreshetnikov@gmail.com">
                            <div className={s.myAnket} onClick={showModal}>
                                <img src="img/user.svg" alt="" />
                                <span>
                                    Моя анкета
                                </span>
                                <img src="img/edit2.svg" alt="" />
                            </div>
                            <div className={s.infoMoney}>
                                <img src="img/money.svg" alt="" />
                                <span>Вы еще не внесли оплату</span>
                            </div>
                        </UserAbout>
                        <InfoSteps numberStep={data.numberStep} title={data.title} par1={data.par1} par2={data.par2} />
                    </div>
                </div>
            </div>


            <Modal className='modalAnket' visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <div className={s.contentWrap}>
                    <div className={s.title}>Моя анкета</div>
                    <div className={s.subtitle}>Просмотрите свою заполненную анкету</div>

                    <Collapse accordion>
                        <Panel header="Индивидуальные особенности" key="1">
                            <div className={s.itemsQuize}>
                                <div className={s.item}>
                                    <div className={s.selectTitle}>1. Сколько человек будет жить в вашей квартире?</div>
                                    <div className={s.selectItem}>
                                        <div className={s.selectSubtitle}>Кол-во</div>
                                        <Select className={s.select}>
                                            <Option value="" hidden></Option>
                                            <Option value="1">1</Option>
                                            <Option value="2">2</Option>
                                            <Option value="3">3</Option>
                                            <Option value="4">4</Option>
                                            <Option value="5+">5+</Option>
                                        </Select>
                                    </div>
                                </div>
                                <div className={s.item}>
                                    <div className={s.selectTitle}>2. Есть ли у вас домашний питомец?</div>
                                    <div className={s.selectesWrap}>
                                        <div className={s.selectItem}>
                                            <div className={s.selectSubtitle}>Питомец</div>
                                            <Select className={s.select}
                                                onChange={setValuePet}> value={valuePet}
                                                <Option value="" hidden></Option>
                                                <Option value="Нет">Нет</Option>
                                                <Option value="Да">Да</Option>
                                                <Option value="Другое">Другое</Option>
                                            </Select>
                                        </div>
                                        <div className={s.selectItem}>
                                            {valuePet === 'Другое' &&
                                                <div>
                                                    <div className={s.selectSubtitle}>Питомец</div>
                                                    <input className={s.input} type="text" />
                                                </div>}
                                        </div>
                                    </div>
                                </div>
                                <div className={s.item}>
                                    <div className={s.selectTitle}>3. Какой ваш примерный возраст?</div>
                                    <div className={s.selectItem}>
                                        <div className={s.selectSubtitle}>Возраст</div>
                                        <Select className={s.select}>
                                            <Option value="" hidden></Option>
                                            <Option value="18-25">18-25</Option>
                                            <Option value="25-40">25-40</Option>
                                            <Option value="40-60">40-60</Option>
                                            <Option value="60+">60+</Option>
                                        </Select>
                                    </div>
                                </div>
                                <div className={s.item}>
                                    <div className={s.selectTitle}>4. Есть ли у вас дети, или планируете в ближайшем будущем?</div>
                                    <div className={s.selectesWrap}>
                                        <div className={s.selectItem}>
                                            <div className={s.selectSubtitle}>Дети</div>
                                            <Select value={valueChildren} className={s.select}
                                                onChange={setValueChildren}>
                                                <Option value="" hidden></Option>
                                                <Option value="Есть">Есть</Option>
                                                <Option value="Нет, но планируется">Нет, но планируется</Option>
                                                <Option value="Нет">Нет</Option>
                                            </Select>
                                        </div>
                                        <div className={s.selectItem}>
                                            {valueChildren !== 'Нет' && valueChildren !== '' &&
                                                <div>
                                                    <div className={s.selectSubtitle}>Кол-во</div>
                                                    <Select className={s.select} name="" id="">
                                                        <Option value="" hidden></Option>
                                                        <Option value="1">1</Option>
                                                        <Option value="2">2</Option>
                                                        <Option value="3">3</Option>
                                                        <Option value="3+">3+</Option>
                                                    </Select>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className={s.item}>
                                    <div className={s.selectTitle}>5. Как часто к вам приходят гости  и сколько человек вы готовы принять к застолью?</div>
                                    <div className={s.selectesWrap}>
                                        <div className={s.selectItem}>
                                            <div className={s.selectSubtitle}>Гости</div>

                                            <Select className={s.select}>
                                                <Option value="" hidden></Option>
                                                <Option value="Раз в неделю">Раз в неделю</Option>
                                                <Option value="Раз в месяц">Раз в месяц</Option>
                                                <Option value="Раз в пол года">Раз в пол года</Option>
                                            </Select>
                                        </div>
                                        <div className={s.selectItem}>
                                            <div className={s.selectSubtitle}>Кол-во</div>

                                            <Select className={s.select}>
                                                <Option value="" hidden></Option>
                                                <Option value="1">1</Option>
                                                <Option value="2">2</Option>
                                                <Option value="3">3</Option>
                                                <Option value="4">5</Option>
                                                <Option value="5+">5+</Option>
                                            </Select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Panel>
                        <Panel header="Комнаты" key="2">
                            <div className={s.itemsQuize}>
                                <div className={s.checkboxes}>
                                    <div className={s.checkboxWrap}>
                                        <div className={s.checkboxItem}>
                                            <Checkbox value={checked1} onChange={() => setChecked1(!checked1)}>
                                                Прихожая
                                            </Checkbox>
                                        </div>
                                        <div className={checked1 ? 'description active' : 'description'}>
                                            <button>
                                                <img src="img/edit.svg" alt="" />
                                                <span>добавить описание</span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className={s.checkboxWrap}>
                                        <div className={s.checkboxItem}>
                                            <Checkbox value={checked2} onChange={() => setChecked2(!checked2)}>
                                                Гардеробная
                                            </Checkbox>
                                        </div>
                                        <div className={checked2 ? 'description active' : 'description'}>
                                            <button>
                                                <img src="img/edit.svg" alt="" />
                                                <span>добавить описание</span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className={s.checkboxWrap}>
                                        <div className={s.checkboxItem}>
                                            <Checkbox value={checked3} onChange={() => setChecked3(!checked3)}>
                                                Кухня
                                            </Checkbox>
                                        </div>
                                        <div className={checked3 ? 'description active' : 'description'}>
                                            <button>
                                                <img src="img/edit.svg" alt="" />
                                                <span>добавить описание</span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className={s.checkboxWrap}>
                                        <div className={s.checkboxItem}>
                                            <Checkbox value={checked4} onChange={() => setChecked4(!checked4)}>
                                                Гостиная
                                            </Checkbox>
                                        </div>
                                        <div className={checked4 ? 'description active' : 'description'}>
                                            <button>
                                                <img src="img/edit.svg" alt="" />
                                                <span>добавить описание</span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className={s.checkboxWrap}>
                                        <div className={s.checkboxItem}>
                                            <Checkbox value={checked5} onChange={() => setChecked5(!checked5)}>
                                                Спальня
                                            </Checkbox>
                                        </div>
                                        <div className={checked5 ? 'description active' : 'description'}>
                                            <button>
                                                <img src="img/edit.svg" alt="" />
                                                <span>добавить описание</span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className={s.checkboxWrap}>
                                        <div className={s.checkboxItem}>
                                            <Checkbox value={checked6} onChange={() => setChecked6(!checked6)}>
                                                Детская
                                            </Checkbox>
                                        </div>
                                        <div className={checked6 ? 'description active' : 'description'}>
                                            <button>
                                                <img src="img/edit.svg" alt="" />
                                                <span>добавить описание</span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className={s.checkboxWrap}>
                                        <div className={s.checkboxItem}>
                                            <Checkbox value={checked7} onChange={() => setChecked7(!checked7)}>
                                                Санузел
                                            </Checkbox>
                                        </div>
                                        <div className={checked7 ? 'description active' : 'description'}>
                                            <button>
                                                <img src="img/edit.svg" alt="" />
                                                <span>добавить описание</span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className={s.checkboxWrap}>
                                        <div className={s.checkboxItem}>
                                            <Checkbox value={checked8} onChange={() => setChecked8(!checked8)}>
                                                Кабинет
                                            </Checkbox>
                                        </div>
                                        <div className={checked8 ? 'description active' : 'description'}>
                                            <button>
                                                <img src="img/edit.svg" alt="" />
                                                <span>добавить описание</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className={s.userText}>
                                    <div className={s.title}>Произвольное пожелание</div>
                                    <textarea placeholder='Ваше пожелание...' name="" id="" cols="30" rows="10"></textarea>
                                </div>
                            </div>
                        </Panel>
                        <Panel header="План БТИ" key="3">
                            <div className={s.upLoadWrap}>
                                <Dragger {...props}>
                                    <p className="ant-upload-hint">
                                        Перетащите сюда файл в формате pdf или
                                    </p>
                                    <p className="ant-upload-text">
                                        <img src="img/upLoad.svg" alt="" />
                                        Загрузить файл с компьютера</p>
                                </Dragger>

                            </div>
                            <Checkbox style={{ marginBottom: '4rem' }}>
                                У меня есть собственный замер, который я выполнил ответственно
                            </Checkbox>
                        </Panel>
                    </Collapse>
                    <div className="buttons">
                        <button class="MyBtn_myBtn__nNQdk">Сохранить</button>
                        <button type="button" onClick={(handleCancel)} class="ant-btn ant-btn-primary RequestSteps_btnDark__3gAJB"><span>Закрыть</span></button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default Rate;