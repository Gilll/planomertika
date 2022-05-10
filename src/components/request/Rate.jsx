import React from 'react';
import {Button} from "antd";
import {RequestSteps} from "./RequestSteps";

const Rate = ({nextStep}) => {
    return (
        <div>
            <h1>Rate</h1>
            <Button type="primary" onClick={() => nextStep(RequestSteps.CHAT)}>next step</Button>
        </div>
    );
};

export default Rate;