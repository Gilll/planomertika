import React from 'react';
import {Button} from "antd";
import {RequestSteps} from "./RequestSteps";

const Chat = ({nextStep}) => {
    return (
        <div>
            <h1>Chat</h1>
            <Button type="primary" onClick={() => nextStep(RequestSteps.WAITING)}>next step</Button>
        </div>
    );
};

export default Chat;