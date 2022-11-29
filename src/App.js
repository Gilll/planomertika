import React, {useEffect} from 'react';
import "./styles/styles.scss";
import 'antd/dist/antd.min.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./router/AppRouter";
import {useDispatch} from "react-redux";
import {redActions} from "./reducer/actions";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        localStorage.getItem('token') && dispatch({ type: redActions.setIsAuth, payload: true });
    },[])

    return (
        <div className="App">
            <BrowserRouter>
                <Header/>
                <AppRouter/>
                <Footer/>
            </BrowserRouter>
        </div>
    );
}

export default App;
