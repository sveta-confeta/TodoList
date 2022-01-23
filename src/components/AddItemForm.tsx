import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Input} from "./Input";
import {Button} from "./Button";
import s from "../TodoList.module.css";

type AddItemFormPropsType = {
    addItem:(itemTitle:string)=>void
}

export const AddItemForm: React.FC<AddItemFormPropsType> = (props) => {

    const [title, setTitle] = useState<string>(' '); //локальный useState для предварительного пользовательского ввода в инпут.
    //по умолчанию пустая сторока
    let [error, setError] = useState(false); //хук для бордера инпута красный-не красный

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {  //функция для инпута
        setError(false);
        setTitle(event.currentTarget.value)
    }

    const keyPress = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTaskButton();
        }
    }

    const addTaskButton = () => {
        const trimmedTitle = title.trim();
        if (trimmedTitle) {
            props.addItem(trimmedTitle)
            setTitle('')
        } else {
            setError(true);
        }
    }

    const blockButton = () => {
        addTaskButton()
    }

    return (
        <div>
            <Input onChangeHandler={onChangeHandler} title={title}  error={error}
                   keyPress={keyPress}/>
            <Button name={'+'} callback={blockButton}/>
            {error ? <div className={s.errorMessage}>Title is requires</div> : ''}
        </div>
    );
};

