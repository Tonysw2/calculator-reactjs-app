import React from 'react';

const EqualButton = (props) => {
    return (
        <button
            onClick={() => {
                props.dispatch({
                    type: 'EQUAL',
                });
            }}
            className={props.className}
        >
            {props.digit}
        </button>
    );
};

export default EqualButton;
