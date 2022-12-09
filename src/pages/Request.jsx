import React, {useEffect, useRef, useState} from 'react';
import Registration from "../components/request/Registration";
import Questionnaire from "../components/request/Questionnaire";
import {RequestSteps} from "../components/request/RequestSteps";
import Rate from "../components/request/Rate";
import Characteristics from "../components/request/Characteristics";
import Chat from "../components/request/Chat";
import Plan from "../components/request/Plan";
import Waiting from "../components/request/Waiting";
import Results from "../components/request/Results";
import History from "../components/request/History";
import {useApi} from "../hooks/useApi";
import {useSelector} from "react-redux";
import Loading from "./Loading";

const Request = () => {
    const [serverError, setServerError] = useState('');
    const [currentStep, setCurrentStep] = useState(RequestSteps.QUESTIONNAIRE);
    const [pagesIsLoading, setPageIsLoading] = useState(true);
    const [requestForm, setRequestForm] = useState({
        order: {
            id: ''
        },
		orderState: '',
        questionnaire: {
            tenantsCount: '',
            pet: '',
            petAdvanced: '',
            age: '',
            childrens: '',
            childrensCount: '',
            childrensAge: [],
            guests: '',
            guestsCount: ''
        },
        rooms: {
            hallway: false,
            bedroom: false,
            childrensroom: false,
            kitchen: false,
            bathroom: false,
            livingroom: false,
            wardrobe: false,
            cabinet: false,
            advanced: ''
        },
        files: [],
        user: {
            name: localStorage.getItem('name'),
			surname: localStorage.getItem('surname'),
            email: localStorage.getItem('email'),
            phone: localStorage.getItem('phone')
        }
    })

    const renderSteps = (params) => {
        switch (params) {
            case RequestSteps.QUESTIONNAIRE: return <Questionnaire nextStep={setCurrentStep} form={requestForm} setForm={setRequestForm}/>;
            case RequestSteps.CHARACTERISTICS: return <Characteristics nextStep={setCurrentStep} form={requestForm} setForm={setRequestForm}/>;
            case RequestSteps.RATE: return <Rate nextStep={setCurrentStep} form={requestForm} setForm={setRequestForm}/>;
            case RequestSteps.PLAN: return <Plan nextStep={setCurrentStep} form={requestForm} setForm={setRequestForm}/>;
            case RequestSteps.CHAT: return <Chat nextStep={setCurrentStep} form={requestForm} setForm={setRequestForm}/>;
            case RequestSteps.WAITING: return <Waiting nextStep={setCurrentStep} form={requestForm} setForm={setRequestForm}/>;
            case RequestSteps.RESULT: return <Results nextStep={setCurrentStep} form={requestForm} setForm={setRequestForm}/>;
            case RequestSteps.HISTORY: return <History nextStep={setCurrentStep} form={requestForm} setForm={setRequestForm}/>;
            default: return <Registration nextStep={setCurrentStep}/>;
        }
    }
    const topBlock = useRef(null)
    const executeScroll = () => topBlock.current.scrollIntoView({ behavior: "smooth" })

    const user = useSelector(state => state.user)

    const [curRequestId, setCurRequestId] = useState();

    const [getRuquest, getRuquestIsLoading] = useApi({
        url: '/orders/getAllByClient/' + localStorage.getItem('userId'),
        method: 'GET'
    });

    const [getOrder, getOrderIsLoading] = useApi({
        url: '/orders/' + curRequestId,
        method: 'GET'
    });

    useEffect(() => {
        getRuquest().then((resp) => {
            if (resp.length) {
                setCurRequestId(resp[0].id)
            } else {
            	setPageIsLoading(false)
			}
        }).catch((e) => setServerError(e.message))
    },[])

	useEffect(() => {
		console.log(requestForm);
	},[requestForm])

    useEffect(() => {
        currentStep !== RequestSteps.QUESTIONNAIRE && executeScroll();
    },[currentStep])

    useEffect(() => {
        if (curRequestId) {
			getOrder().then((resp) => {
				let currentRequest = resp
				console.log(resp);
				setRequestForm({...requestForm, questionnaire: {
						tenantsCount: currentRequest.orderPageOneResponse.peoples,
						pet: currentRequest.orderPageOneResponse.pets,
						petAdvanced: '',
						age: currentRequest.orderPageOneResponse.age,
						childrens: currentRequest.orderPageOneResponse.kids,
						childrensCount: currentRequest.orderPageOneResponse.numberOfKids || '',
						childrensAge: currentRequest.orderPageOneResponse.ageOfKids || '',
						guests: currentRequest.orderPageOneResponse.guess,
						guestsCount: currentRequest.orderPageOneResponse.numberOfGuess
					}, rooms: {
						hallway: currentRequest.orderPageTwoResponse.isHallway,
						bedroom: false,
						childrensroom: currentRequest.orderPageTwoResponse.isChildrens,
						kitchen: currentRequest.orderPageTwoResponse.isKitchen,
						bathroom: currentRequest.orderPageTwoResponse.isWc,
						livingroom: false,
						wardrobe: currentRequest.orderPageTwoResponse.isWardrobe,
						cabinet: currentRequest.orderPageTwoResponse.isCabinet,
						advanced: currentRequest.orderPageTwoResponse.wish
					}, files: currentRequest.files || [],
					order: { id: currentRequest.id },
					orderState: currentRequest.state.state
				})
				setPageIsLoading(false)
				switch (currentRequest.state.state) {
					case "CREATED": return setCurrentStep(RequestSteps.RATE);
					case "CREATE_DIALOG": return setCurrentStep(RequestSteps.CHAT);
					case "DIALOG_CREATED": return setCurrentStep(RequestSteps.CHAT);
					case "IN_WORK": return setCurrentStep(RequestSteps.WAITING);
					case "READY": return setCurrentStep(RequestSteps.RESULT);
					default: setCurrentStep(RequestSteps.QUESTIONNAIRE);
				}
			})
        }
    },[curRequestId])

    return (
        <div className='intro-page'>
            <div ref={topBlock}/>
            {serverError ?
                <div className="content-error">{serverError}</div>
                :
				pagesIsLoading ? <Loading /> : renderSteps(currentStep)}
        </div>
    );
};

export default Request;
