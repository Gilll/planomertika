import React from "react";
import { Typography } from 'antd';
import s from "./QuestionItem.module.scss";
import { Modal } from 'antd';

const QuestionItem = ({ title, text, more }) => {
	const { Text } = Typography;
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

    return (
        <div className={s.questionItem}>
            <div className={s.subtitle}>Вопрос:</div>
            <div className={s.title}>{title}</div>
            <div className={s.subtitle}>Ответ:</div>
			<Text>{text}</Text>
            <button className={s.more} onClick={showModal}>{more}</button>

            <Modal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <div className={s.contentWrap}>
                    <div className={s.title}>{title}</div>
                    <div className={s.text}>{text}</div>
                </div>
            </Modal>
        </div>
    );
};


export default QuestionItem;
