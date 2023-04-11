import React from 'react';



const Time = ({ h, m, sec , children}) => {

    return (
        <div className="timeWrap">
            <div className="timeLine">
                <div className="timeItem">{`${h.toString().padStart(2, '0')}`}
                <span>часов</span>
                </div>
                :
                <div className="timeItem">{`${m.toString().padStart(2, '0')}`}
                <span>минут</span>
                </div>
                :
                <div className="timeSec">{`${sec.toString().padStart(2, '0')}`}</div>
            </div>
            {children}
        </div>
    );
};

export default Time;
