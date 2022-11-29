import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { legacy_createStore as createStore} from 'redux'
import {Provider} from "react-redux";

const deafaultState = {
    isAuth: false,
    user: {
        name: '',
        email: '',
        phone: '',
        id: ''
    }
}

const reducer = (state = deafaultState, action) => {
    switch (action.type) {
        case "SET_IS_AUTH":
            return {...state, isAuth: action.payload}
        case "SET_USER":
            return {...state, user: action.payload}
        default:
            return state;
    }
}

const store = createStore(reducer)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);




