import React from 'react';



const Time = ({ hours = 0, minutes = 0, seconds = 0, children}) => {
    const [[h, m, sec], setTime] = React.useState([hours, minutes, seconds]);

    const tick = () => {

        if (h === 0 && m === 0 && sec === 0) {
            console.log('Время вышло')
        } else if (m === 0 && sec === 0) {
            setTime([h - 1, 59, 59]);
        } else if (sec === 0) {
            setTime([h, m - 1, 59]);
        } else {
            setTime([h, m, sec - 1]);
        }
    };

    React.useEffect(() => {
        const timerID = setInterval(() => tick(), 1000);
        return () => clearInterval(timerID);
    });

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