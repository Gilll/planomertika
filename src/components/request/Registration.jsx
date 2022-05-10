import React from 'react';
import {Button} from "antd";
import {RequestSteps} from "./RequestSteps";

const Registration = ({nextStep}) => {
    return (
        <div>
            <h1>Registration</h1>
            <Button type="primary" onClick={() => nextStep(RequestSteps.QUESTIONNAIRE)}>next step</Button>
        </div>
    );
};

export default Registration;