import React from "react";
// import s from "./Modal.module.scss";





const Modal = ({active, setActive, children}) => {
    return (
        <div className={active ? "modal active" : "modal"}>
            <div className="modal__body">
                <div className="modal__content">
                    <button className="modal__clouse" onClick = {() => setActive(false)}>
                        <img src="" alt="" />
                    </button>
                    <div className="modal__content-wrap">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Modal;