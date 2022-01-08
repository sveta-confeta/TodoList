import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import s from '../TodoList.module.css'

type InputPropsType={
    setTitle:(title:string)=>void
    title:string
    addTask:(title:string)=>void
}

export const Input = (props:InputPropsType) => {
    let[error,setError]=useState(true); //хук для бордера инпута красный-не красный



    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {  //функция для инпута
        props.setTitle(event.currentTarget.value)
    }
    const keyPress = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            const trimmedTitle = props.title.trim();
            if (trimmedTitle) {
                props.addTask(trimmedTitle)
            }
            props.setTitle( '')
        }
    }
    return (
        <>
            <input
                value={props.title}
                onChange={onChangeHandler}
                onKeyPress={keyPress}
                className={error ? s.error:' '}
            />
            </>
    );
};

