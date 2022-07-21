import React, { useState } from "react";
import { Typography } from 'antd';
import s from "./PageReviewsItem.module.scss";
import { Modal } from 'antd';


const { Text } = Typography;
const EllipsisMiddle = ({ suffixCount, children }) => {
    const start = children.slice(0, children.length - suffixCount).trim();
    // const suffix = children.slice(-suffixCount).trim();
    return (
        <Text
        // ellipsis={{
        //     suffix,
        // }}
        >
            {start}...
        </Text>
    );
};


const PageReviewsItem = (props) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

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
        <div className={s.reviewsItem}>
            <div className={s.avatarBlock}>
                <img src={props.avatar} alt="" />
            </div>
            <div className={s.infoBlock}>
                <div className={s.author}>{props.author}</div>
                <div className={s.place}>{props.place}</div>
                <div className={s.description}>{props.description}</div>
                <div className={s.rangeDate}>
                    <div className={s.rangeWrap}>
                        <img src={props.star} alt="" />
                        <img src={props.star} alt="" />
                        <img src={props.star} alt="" />
                        <img src={props.star} alt="" />
                        <img src={props.star} alt="" />
                    </div>
                    <div className={s.date}>{props.date}</div>
                </div>
                <EllipsisMiddle suffixCount={20} className={s.textReview}>
                    {props.textReview}
                </EllipsisMiddle>
                {/* <div className={s.textReview}>{props.textReview}</div> */}
                <button className={s.more} onClick={showModal}>Читать полностью</button>
            </div>
            
            <Modal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <div className={s.modalReviewItem}>
                    <div className={s.avatarBlock}>
                        <img src={props.avatar} alt="" />
                    </div>
                    <div className={s.infoBlock}>
                        <div className={s.author}>{props.author}</div>
                        <div className={s.description}>{props.description}</div>
                        <div className={s.rangeDate}  style={{ marginTop: "2.5rem"}}>
                            <div className={s.rangeWrap}>
                                <img src={props.star} alt="" />
                                <img src={props.star} alt="" />
                                <img src={props.star} alt="" />
                                <img src={props.star} alt="" />
                                <img src={props.star} alt="" />
                            </div>
                            <div className={s.date}>{props.date}</div>
                        </div>
                        <div className={s.textReview}>{props.textReview}</div>
                    </div>
                </div>
            </Modal>
        </div>
    );
};


export default PageReviewsItem;