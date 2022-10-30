import React from 'react';

const DigitButton = (props) => {
    return (
        <button
            onClick={() =>
                props.dispatch({
                    type: 'APPEND_NUMBER',
                    digit: props.digit,
                })
            }
            className={props.className}
        >
            {props.digit}
        </button>
    );
};

export default DigitButton;
