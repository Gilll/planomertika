import React from "react";
import { Collapse } from 'antd';




const Accordion = () => {
const { Panel } = Collapse;


    return (
        <Collapse bordered={false} defaultActiveKey={['1']}>
            <Panel header="Что такое план перепланировки и для чего он нужен?" key="1">
                Если Вы собираетесь сделать ремонт в квартире, сначала нужно согласовать
                работы по перепланировке в Мосжилинспекции.
                Для этого Вам потребуется проект перепланировки и техничесвкое заключение.
                Если Вы собираетесь сделать ремонт в квартире, сначала нужно согласовать работы по
                перепланировке в Мосжилинспекции.Если Вы собираетесь сделать ремонт в квартире,
                сначала нужно согласовать работы по перепланировке
            </Panel>
            <Panel header="Что такое план перепланировки и для чего он нужен?" key="2">
                Если Вы собираетесь сделать ремонт в квартире, сначала нужно согласовать
                работы по перепланировке в Мосжилинспекции.
            </Panel>
            <Panel header="Что такое план перепланировки и для чего он нужен?" key="3">
                Если Вы собираетесь сделать ремонт в квартире, сначала нужно согласовать
                работы по перепланировке в Мосжилинспекции.
            </Panel>
        </Collapse>

    );

};


export default Accordion;

