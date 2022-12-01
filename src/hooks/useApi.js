import {useState} from 'react';
import {hostName} from "../API/config";

export const useApi = (settings) => {
    const [isLoading, setIsLoading] = useState(false);

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
                throw new Error(resp.error.description);
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
