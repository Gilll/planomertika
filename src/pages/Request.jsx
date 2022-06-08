import React, {useState} from 'react';
import Registration from "../components/request/Registration";
import Questionnaire from "../components/request/Questionnaire";
import {RequestSteps} from "../components/request/RequestSteps";
import Rate from "../components/request/Rate";
import Chat from "../components/request/Chat";
import Waiting from "../components/request/Waiting";
import Results from "../components/request/Results";
import History from "../components/request/History";

const Request = () => {
    const [currentStep, setCurrentStep] = useState(RequestSteps.REGISTRATION);
    const renderSteps = (params) => {
        switch (params) {
            case RequestSteps.REGISTRATION: return <Registration nextStep={setCurrentStep}/>;
            case RequestSteps.QUESTIONNAIRE: return <Questionnaire nextStep={setCurrentStep}/>;
            case RequestSteps.RATE: return <Rate nextStep={setCurrentStep}/>;
            case RequestSteps.CHAT: return <Chat nextStep={setCurrentStep}/>;
            case RequestSteps.WAITING: return <Waiting nextStep={setCurrentStep}/>;
            case RequestSteps.RESULT: return <Results nextStep={setCurrentStep}/>;
            case RequestSteps.HISTORY: return <History nextStep={setCurrentStep}/>;
            default: return <Registration nextStep={setCurrentStep}/>;
        }
    }

    return (
        <div className='intro-page'>
            {renderSteps(currentStep)}
        </div>
    );
};

export default Request;