import React, { useReducer, useEffect } from 'react';

// JS IMPORTS
import DigitButton from './components/DigitButton';
import OperatorButton from './components/OperatorButton';
import ClearButton from './components/ClearButton';
import DeleteButton from './components/DeleteButton';
import EqualButton from './components/EqualButton';

// CSS IMPORTS
import classes from './style.module.css';

const compute = (currentNumber, prevNumber, operator) => {
    if (operator === '+') {
        return `${Number(prevNumber) + Number(currentNumber)}`;
    }

    if (operator === '-') {
        return `${Number(prevNumber) - Number(currentNumber)}`;
    }

    if (operator === 'x') {
        return `${Number(prevNumber) * Number(currentNumber)}`;
    }

    if (operator === '/') {
        return `${Number(prevNumber) / Number(currentNumber)}`;
    }

    if (operator === '%') {
        return `${(Number(prevNumber) / 100) * currentNumber}`;
    }
};

const reducer = (state, action) => {
    if (action.type === 'APPEND_NUMBER') {
        console.log(action.digit);
        // avoid number higher then 10
        if (state.currentNum.length === 10) {
            return {
                currentNum: state.currentNum,
                operator: state.operator,
                prevNum: state.prevNum,
            };
        }

        // avoid bug when user already click on dot
        if (state.currentNum.includes('.') && action.digit === '.') {
            return { ...state };
        }

        const currentNumber = state.currentNum + action.digit;
        return { ...state, currentNum: currentNumber };
    }

    if (action.type === 'CHOOSE_OPERATOR') {
        // prevent a bug bug when user click on operator multiple times

        if (
            (state.operator === '' || state.operator !== '') &&
            state.currentNum === ''
        ) {
            return {
                currentNum: state.currentNum,
                operator: state.operator,
                prevNum: state.prevNum,
            };
        }

        if (state.operator !== '') {
            return {
                currentNum: '',
                operator: action.digit,
                prevNum: compute(
                    state.currentNum,
                    state.prevNum,
                    state.operator
                ),
            };
        } else {
            return {
                currentNum: '',
                operator: action.digit,
                prevNum: state.currentNum,
            };
        }
    }

    if (action.type === 'CLEAR_CALC') {
        return { currentNum: '', operator: '', prevNum: '' };
    }

    if (action.type === 'DELETE') {
        return {
            ...state,
            currentNum:
                state.currentNum.length > 1
                    ? state.currentNum.slice(0, -1)
                    : '',
        };
    }

    if (action.type === 'EQUAL') {
        if (state.prevNum === '' && state.operator === '') {
            return {
                currentNum: state.currentNum,
                operator: state.operator,
                prevNum: state.prevNum,
            };
        }

        return {
            currentNum: compute(
                state.currentNum,
                state.prevNum,
                state.operator
            ),
            operator: '',
            prevNum: '',
        };
    }
};

function App() {
    const [state, dispatch] = useReducer(reducer, {
        currentNum: '',
        operator: '',
        prevNum: '',
    });

    return (
        <div className={classes.calculator}>
            {/* DISPLAY */}
            <div className={classes['display-wrap']}>
                <div
                    className={classes['prev-display']}
                >{`${state.prevNum} ${state.operator}`}</div>
                <div className={classes.display}>
                    {state.currentNum === '' ? 0 : state.currentNum}
                </div>
            </div>

            {/* KEYBOARD */}
            <div className={classes['btn-wrap']}>
                <ClearButton
                    dispatch={dispatch}
                    digit="c"
                    className={classes['btn-operator']}
                />

                <DeleteButton
                    dispatch={dispatch}
                    className={`${classes['btn-operator']} ${classes['btn-delete']}`}
                >
                    <ion-icon name="backspace-outline"></ion-icon>
                </DeleteButton>

                <OperatorButton
                    dispatch={dispatch}
                    digit="%"
                    className={classes['btn-operator']}
                />
                <OperatorButton
                    dispatch={dispatch}
                    digit="/"
                    className={classes['btn-operator']}
                />
                <DigitButton dispatch={dispatch} digit="1" />
                <DigitButton dispatch={dispatch} digit="2" />
                <DigitButton dispatch={dispatch} digit="3" />
                <OperatorButton
                    dispatch={dispatch}
                    digit="x"
                    className={classes['btn-operator']}
                />
                <DigitButton dispatch={dispatch} digit="4" />
                <DigitButton dispatch={dispatch} digit="5" />
                <DigitButton dispatch={dispatch} digit="6" />
                <OperatorButton
                    dispatch={dispatch}
                    digit="-"
                    className={classes['btn-operator']}
                />
                <DigitButton dispatch={dispatch} digit="7" />
                <DigitButton dispatch={dispatch} digit="8" />
                <DigitButton dispatch={dispatch} digit="9" />
                <OperatorButton
                    dispatch={dispatch}
                    digit="+"
                    className={classes['btn-operator']}
                />
                <DigitButton dispatch={dispatch} digit="." />
                <DigitButton dispatch={dispatch} digit="0" />

                <EqualButton
                    dispatch={dispatch}
                    digit="="
                    className={`${classes['btn-operator']} ${classes.equal}`}
                />
            </div>
        </div>
    );
}

export default App;
