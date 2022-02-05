import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
//import {Button} from "./Button";
import s from "../TodoList.module.css";
import {Button, TextField} from "@mui/material";


type AddItemFormPropsType = {
    addItem: (itemTitle: string) => void
}

export const AddItemForm: React.FC<AddItemFormPropsType> = (props) => {

    const [title, setTitle] = useState<string>(''); //локальный useState для предварительного пользовательского ввода в инпут.
    //по умолчанию пустая сторока
    const [error, setError] = useState<boolean>(false); //хук для бордера инпута красный-не красный

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

    // const blockButton = () => {
    //     addTaskButton()
    // }


    return (
        <div>
            {/*импут из материал -в него входят такие параметры как именно в input*/}
            <TextField
                variant="outlined"
                size="small"
                label={error ? 'Title is requires' : "write title"}
                value={title}
                error={error}
                onChange={onChangeHandler}
                onKeyPress={keyPress}
                className={error ? 'error' : ''}
            />
            {/*<Input onChangeHandler={onChangeHandler} title={title}  error={error}*/}
            {/*       keyPress={keyPress}/>*/}
            {/*кнопка из материал */}
            <Button onClick={addTaskButton} variant="contained" color="success"
                    style={{maxWidth: '35px', minHeight: '38px', minWidth: '35px', maxHeight: '38px'}}>+</Button>
            {/*<Button  name={'+'} callback={blockButton}/>*/}
            {/*{error ? <div className={s.errorMessage}>Title is requires</div> : ''}*/}
        </div>
    );
};

