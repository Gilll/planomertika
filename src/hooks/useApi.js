import {useState} from 'react';
import {hostName} from "../API/config";
import {useNavigate} from "react-router";
import {RouteNames} from "../router/routeNames";
import {redActions} from "../reducer/actions";
import {useDispatch} from "react-redux";

export const useApi = (settings) => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
	const dispatch = useDispatch();

    const fetching = async () => {
        let resp = '';
        let headers = {
            'Content-Type': 'application/json'
        }
        if (localStorage.getItem('token')) headers.Authorization = localStorage.getItem('token')
        if (!isLoading) setIsLoading(true);
        try {
            const response = await fetch(hostName + settings.url, {
                crossDomain: true,
                method: settings.method || 'POST',
                body: settings.data && JSON.stringify(settings.data),
                headers: settings.headers ? Object.assign(headers, settings.headers) : headers
            });
            resp = await response.json();
            if (!response.ok) {
                setIsLoading(false);
				console.log(resp);
				if (resp.error === "Unauthorized") {
					console.log("Unauthorized");
					localStorage.removeItem('token')
					localStorage.removeItem('name')
					localStorage.removeItem('surname')
					localStorage.removeItem('email')
					localStorage.removeItem('userId')
					localStorage.removeItem('phoneNumber')
					localStorage.removeItem('uuid')
					localStorage.removeItem('jwtToken')
					localStorage.removeItem('chatUserId')
					localStorage.removeItem('exchangeName')
					localStorage.removeItem('isAdmin')
					dispatch({ type: redActions.setIsAuth, payload: false });
					dispatch({ type: redActions.setIsAdmin, payload: false });
					dispatch({ type: redActions.setUser, payload: {
							name: '',
							email: '',
							phone: '',
							id: ''
						} });
					navigate(RouteNames.LOGIN)
				} else {
					if (resp.error.message) {
						throw new Error(resp.error.message);
					} else {
						throw new Error(resp.error.description);
					}
				}
            }
        } catch (e) {
            setIsLoading(false);
            if (e.message === 'Failed to fetch') {
                throw new Error('Нет соединения с сервером')
            } else {
                throw new Error(e.message)
            }
        }
        setIsLoading(false);
        return resp;
    }

    return [fetching, isLoading];
}
