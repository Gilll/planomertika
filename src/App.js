import React from 'react';
import "./styles/styles.scss";
import 'antd/dist/antd.min.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./router/AppRouter";

function App() {
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
