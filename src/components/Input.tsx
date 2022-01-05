import React, {ChangeEvent, KeyboardEvent} from 'react';

type InputPropsType={
    setTitle:(title:string)=>void
    title:string
}

export const Input = (props:InputPropsType) => {
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {  //функция для инпута
        props.setTitle(event.currentTarget.value)
    }
    const keyPress = (event: KeyboardEvent<HTMLInputElement>) => {
        // if (event.key === 'Enter') {
        //     addTitle()
        // }
    }
    return (
        <>
            <input
                value={props.title}
                onChange={onChangeHandler}  //!!!!!инпут сдесь
                onKeyPress={keyPress}
            />
            </>
    );
};

