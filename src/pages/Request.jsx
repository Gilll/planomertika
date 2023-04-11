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
import Loading from "./Loading";
import WaitingForRoom from "../components/request/WaitingForRoom";
import {useParams} from "react-router";

const Request = ({isHistoryPage, newOrder}) => {
    const [serverError, setServerError] = useState('');
    const [currentStep, setCurrentStep] = useState(RequestSteps.QUESTIONNAIRE);
    const [pagesIsLoading, setPageIsLoading] = useState(true);
    const [orders, setOrdets] = useState()
	const pageParams = useParams();
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
		discount: false,
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
		archived: false,
		timeOfChangeState: '',
		architectFiles: '',
        files: [],
		chatId: 0,
        user: {
            name: localStorage.getItem('name'),
			surname: localStorage.getItem('surname'),
            email: localStorage.getItem('email'),
            phone: localStorage.getItem('phone')
        }
    })

    const renderSteps = (params) => {
    	console.log('orders')
    	console.log(orders)
        switch (params) {
            case RequestSteps.QUESTIONNAIRE: return <Questionnaire nextStep={setCurrentStep} form={requestForm} setForm={setRequestForm}/>;
            case RequestSteps.CHARACTERISTICS: return <Characteristics nextStep={setCurrentStep} form={requestForm} setForm={setRequestForm}/>;
            case RequestSteps.RATE: return <Rate nextStep={setCurrentStep} form={requestForm} setForm={setRequestForm}/>;
            case RequestSteps.PLAN: return <Plan oldOrderId={orders.length > 0 ? orders[orders.length - 1].id : null} nextStep={setCurrentStep} form={requestForm} setForm={setRequestForm}/>;
            case RequestSteps.CHAT: return <Chat nextStep={setCurrentStep} form={requestForm} setForm={setRequestForm}/>;
            case RequestSteps.WAITING: return <Waiting nextStep={setCurrentStep} form={requestForm} setForm={setRequestForm}/>;
            case RequestSteps.RESULT: return <Results nextStep={setCurrentStep} form={requestForm} setForm={setRequestForm}/>;
            case RequestSteps.HISTORY: return <Results archived={true} nextStep={setCurrentStep} form={requestForm} setForm={setRequestForm} orders={orders}/>;
            case RequestSteps.WAITING_ROOM: return <WaitingForRoom nextStep={setCurrentStep} form={requestForm} setForm={setRequestForm}/>;
            default: return <Registration nextStep={setCurrentStep}/>;
        }
    }
    const topBlock = useRef(null)
    const executeScroll = () => topBlock.current.scrollIntoView({ behavior: "smooth" })

    const [curRequestId, setCurRequestId] = useState();

    const [getRuquest, getRuquestIsLoading] = useApi({
        url: '/clientOrders/getOrdersFilter',
		data: {
			countElementOnPage: 100,
			numPage: 0
		}
    });
	const [checkDiscount, checkDiscountIsLoading] = useApi({
		url: '/clientOrders/checkDiscount',
		method: 'GET'
	});

    useEffect(() => {
			getRuquest().then((resp) => {
				if (resp.orderResponseList.length) {
					if (pageParams.id) {
						setCurRequestId(pageParams.id)
					} else {
						setCurRequestId(resp.orderResponseList[0].id)
					}
				} else {
					setPageIsLoading(false)
				}
				if (newOrder) {
					checkDiscount().then((resp) => setRequestForm({...requestForm, discount: resp}))
				}
				setOrdets(resp.orderResponseList);
				if (resp.orderResponseList.length && !newOrder)
				{
					let currentRequest;
					if (pageParams.id) {
						console.log(pageParams.id);
						console.log(resp.orderResponseList);
						let arr = resp.orderResponseList.filter((el) => el.id === parseInt(pageParams.id));
						if (arr.length) {
							currentRequest = arr[0]
						} else {
							setServerError('Заказа по данному id не найдено')
						}
					} else {
						currentRequest = resp.orderResponseList[0];
					}
					console.log(resp);
					console.log('currentRequest');
					console.log(currentRequest);
					setRequestForm({
						...requestForm, questionnaire: {
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
						}, files: currentRequest.clientFiles || [],
						timeOfChangeState: currentRequest.timeOfChangeState || '',
						architectFiles: currentRequest.architectFiles || '',
						order: {id: currentRequest.id},
						amount: currentRequest.amount,
						archived: !!currentRequest.archived,
						orderState: currentRequest.state.state,
						chatId: currentRequest.chatDialogId || 0,
					})
					setPageIsLoading(false)
					if (isHistoryPage) {
						setCurrentStep(RequestSteps.HISTORY);
					} else {
						switch (currentRequest.state.state) {
							case "CREATED":
								return setCurrentStep(RequestSteps.RATE);
							case "CREATE_DIALOG":
								return setCurrentStep(RequestSteps.WAITING_ROOM);
							case "DIALOG_CREATED":
								return setCurrentStep(RequestSteps.CHAT);
							case "IN_WORK":
								return setCurrentStep(RequestSteps.WAITING);
							case "READY":
								return setCurrentStep(RequestSteps.RESULT);
							case "LATE":
								return setCurrentStep(RequestSteps.WAITING);
							default:
								setCurrentStep(RequestSteps.QUESTIONNAIRE);
						}}
				} else {
					setPageIsLoading(false)
				}
			}).catch((e) => setServerError(e.message))
    },[pageParams])

    useEffect(() => {
    	console.log(currentStep);
        currentStep !== RequestSteps.QUESTIONNAIRE && executeScroll();
    },[currentStep])

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
