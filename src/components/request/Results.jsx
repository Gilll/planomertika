import React from 'react';
import {RequestSteps} from "./RequestSteps";
import {Button} from "antd";

const Results = ({nextStep}) => {
    return (
        <div>
            <h1>Results</h1>
            <Button type="primary" onClick={() => nextStep(RequestSteps.HISTORY)}>next step</Button>
        </div>
    );
};

export default Results;