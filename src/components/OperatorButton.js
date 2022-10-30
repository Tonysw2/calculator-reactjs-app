import React from 'react';

const OperatorButton = (props) => {
    return (
        <button
            onClick={() => {
                props.dispatch({
                    type: 'CHOOSE_OPERATOR',
                    digit: props.digit,
                });
            }}
            className={props.className}
        >
            {props.digit}
        </button>
    );
};

export default OperatorButton;
