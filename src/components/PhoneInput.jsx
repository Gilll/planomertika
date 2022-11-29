import React from 'react';
import InputMask from 'react-input-mask';

const PhoneInput = ({props, onChange, value}) => {
    return (
        <InputMask {...props} value={value} mask="+\7 (999) 999 99 99" maskChar=" " onChange={onChange}/>
    );
};

export default PhoneInput;