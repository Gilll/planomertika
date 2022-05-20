import React, { useState } from 'react';
import MyBtn from '../components/myBtn/MyBtn';







const About = () => {
    const [any,setAny] = useState(-1);

    return (
        <div>
            <h1>about</h1>
            {(any>0) ?'gkfdkjfg': 'lfklfdkjgdlfkdddd55555'}
            <MyBtn  title="Заполнить анкету" onClick={() => console.log(1)}/>
            {/* <div className="" onClick={() => console.log(1)}>Заполнить анкету</div> */}
        </div>
    );
};

export default About;