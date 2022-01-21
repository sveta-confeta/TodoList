import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import s from '../TodoList.module.css'

type InputPropsType = {

    title: string
    error: boolean
    onChangeHandler:(event: ChangeEvent<HTMLInputElement>)=>void
    keyPress:(event: KeyboardEvent<HTMLInputElement>)=>void
}

export const Input = (props: InputPropsType) => {

    return (
        <>
            <input
                value={props.title}
                onChange={props.onChangeHandler}
                onKeyPress={props.keyPress}
                className={props.error ? s.error : ' '}
            />
        </>
    );
};

