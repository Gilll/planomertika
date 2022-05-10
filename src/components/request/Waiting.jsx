import React from 'react';
import {RequestSteps} from "./RequestSteps";
import {Button} from "antd";

const Waiting = ({nextStep}) => {
    return (
        <div>
            <h1>Waiting</h1>
            <Button type="primary" onClick={() => nextStep(RequestSteps.RESULT)}>next step</Button>
        </div>
    );
};

export default Waiting;