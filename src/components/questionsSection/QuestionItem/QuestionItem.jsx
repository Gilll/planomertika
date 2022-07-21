import React from "react";
import { Typography } from 'antd';
import s from "./QuestionItem.module.scss";
import { Modal } from 'antd';



const { Text } = Typography;
const EllipsisMiddle = ({ suffixCount, children }) => {
    const partText = children.slice(0, children.length - suffixCount).trim();
    if (children.length <= 391) {
        return (
            <Text>
                {children}
            </Text>
        );
    }

    else {
        return (
            <Text>
                {partText}...
            </Text>
        );
    }
};

const QuestionItem = ({ title, text, more }) => {
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
            <EllipsisMiddle suffixCount={500} className={s.text}>
                {text}
            </EllipsisMiddle>
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