import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import s from '../TodoList.module.css'

type InputPropsType={
    setTitle:(title:string)=>void
    title:string
    addTask:(title:string)=>void
    error:boolean
    setError:(value:boolean)=>void
}

export const Input = (props:InputPropsType) => {




    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {  //функция для инпута
        props.setError(false);
        props.setTitle(event.currentTarget.value)
    }
    const keyPress = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            const trimmedTitle = props.title.trim();
            if (trimmedTitle) {
                props.addTask(trimmedTitle)
                props.setTitle( '')
            }else{
                props.setError(true);
            }

        }
    }
    return (
        <>
            <input
                value={props.title}
                onChange={onChangeHandler}
                onKeyPress={keyPress}
                className={props.error ? s.error :' '}
            />
            </>
    );
};

