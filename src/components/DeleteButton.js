import React from 'react';

const DeleteButton = (props) => {
    return (
        <button
            onClick={() => {
                props.dispatch({
                    type: 'DELETE',
                });
            }}
            className={props.className}
        >
            <ion-icon name="backspace-outline"></ion-icon>
        </button>
    );
};

export default DeleteButton;
