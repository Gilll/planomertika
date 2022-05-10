import React from 'react';
import {RequestSteps} from "./RequestSteps";
import {Button} from "antd";

const Questionnaire = ({nextStep}) => {
    return (
        <div>
            <h1>Questionnaire</h1>
            <Button type="primary" onClick={() => nextStep(RequestSteps.RATE)}>next step</Button>
        </div>
    );
};

export default Questionnaire;