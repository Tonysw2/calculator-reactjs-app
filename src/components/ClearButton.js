import React from 'react';

const ClearButton = (props) => {
    return (
        <button
            onClick={() => {
                props.dispatch({
                    type: 'CLEAR_CALC',
                });
            }}
            className={props.className}
        >
            {props.digit}
        </button>
    );
};

export default ClearButton;
