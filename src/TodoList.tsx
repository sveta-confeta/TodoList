import React, {ChangeEvent, ChangeEventHandler, useState, KeyboardEvent} from "react";
import {filterType} from "./App";
import {Button} from "./components/Button";
import {Input} from "./components/Input";
import s from './TodoList.module.css'

type TaskType = {
    id: string //для идентификации конкретной таски, когда их много
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    todolistID:string
    title: string
    tasks: Array<TaskType>
    removeTask: (mId: string) => void//функция удаления
    setFilter: (id:string,value: filterType) => void //void-потому что функция ничего не возращает,без return
    addTask: (title: string) => void //функция добавления в инпут
    changeTaskStatus: (id: string,newIsDoneValue: boolean) => void
    filter: filterType;
    filteredTasks:(id:string,value:filterType,)=>void
}

export function TodoList(props: TodoListPropsType) {

    // const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {  //функция для инпута
    //     setTitle(event.currentTarget.value)
    // }

    // const addTask= () => {
    //     const trimmedTitle = title.trim();
    //     if (trimmedTitle) {
    //         props.addTask(trimmedTitle)
    //     }
    // }
    // const keyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    //     if (event.key === 'Enter') {
    //         addTitle()
    //     }
    // }
    const [title, setTitle] = useState<string>(' '); //локальный useState для предварительного пользовательского ввода в инпут.
    //по умолчанию пустая сторока
    let [error, setError] = useState(false); //хук для бордера инпута красный-не красный

    const topSet = (value: filterType) => { //app.tsx:type filterType = 'All' | 'Active' | 'Completed' //типизация фильтра для кнопок
        props.filteredTasks(props.todolistID,value);
    }
    const removeTaskHandler = (tID: string) => props.removeTask(tID);

    const blockButton = () => {
        addTaskButton()
    }
    const addTaskButton = () => {
        const trimmedTitle = title.trim();
        if (trimmedTitle) {
            props.addTask(trimmedTitle)
            setTitle('')
        } else {
            setError(true);
        }

    }
    const changeStatus = (mId: string, value: boolean) => props.changeTaskStatus(mId, value);


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <Input setTitle={setTitle} title={title} addTask={props.addTask} error={error} setError={setError}/>
                {/*<input*/}
                {/*    value={title}*/}
                {/*    onChange={onChangeHandler}  //!!!!!инпут сдесь*/}
                {/*    onKeyPress={keyPress}*/}
                {/*/>*/}
                {/*/!*передаем функцию-коллбэк:*!/*/}
                {/*/!*<button onClick={addTitle}>+</button>*!/*/}
                <Button name={'+'} callback={blockButton}/>
                {error ? <div className={s.errorMessages}>Title is requires</div> : ''}
            </div>
            <ul>{/* потому что в эту ul мы передаем array => tasks*/}
                {props.tasks.map((m => {

                    return (
                        <li key={m.id} className={m.isDone ? "is-done" : ''}>
                            <input type="checkbox"
                                   checked={m.isDone}
                                   onChange={(e: ChangeEvent<HTMLInputElement>) => changeStatus(m.id, e.currentTarget.checked)}
                            /> <span>{m.title}</span>
                            <Button name={'x'} callback={() => removeTaskHandler(m.id)}/>

                        </li>
                    )
                }))}
            </ul>
            <div>
                <button className={props.filter === 'All' ? s.activeFilter : ''}
                        onClick={() => topSet('All')}>All</button>
                    <button className={props.filter === 'Active' ? s.activeFilter : ''}
                            onClick={() => topSet('Active')}> Active
                        </button>
                        <button className={props.filter === 'Completed' ? s.activeFilter : ''}
                                onClick={() => topSet('Completed')}>Completed
                            </button>
            </div>
        </div>

)
}

