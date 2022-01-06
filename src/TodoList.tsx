import React, {ChangeEvent, ChangeEventHandler, useState, KeyboardEvent } from "react";
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
    title: string
    tasks: Array<TaskType>
    removeTask: (mId: string) => void//функция удаления
    setFilter: (value: filterType) => void //void-потому что функция ничего не возращает,без return
    addTask: (title: string) => void //функция добавления в инпут
    changeTaskStatus: (id: string, newIsDoneValue: boolean) => void
    filter: filterType;
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

    const topSet=(filter:filterType)=>{ //app.tsx:type filterType = 'All' | 'Active' | 'Completed' //типизация фильтра для кнопок
        props.setFilter(filter);
    }
    const removeTaskHandler=(tID:string) => props.removeTask(tID);

    const blockButton=()=>{
       props.addTask(title );
        setTitle(' ');
    }


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <Input setTitle={setTitle} title={title} addTask={props.addTask}/>
                {/*<input*/}
                {/*    value={title}*/}
                {/*    onChange={onChangeHandler}  //!!!!!инпут сдесь*/}
                {/*    onKeyPress={keyPress}*/}
                {/*/>*/}
                {/*/!*передаем функцию-коллбэк:*!/*/}
                {/*/!*<button onClick={addTitle}>+</button>*!/*/}
                <Button name={'+'} callback={blockButton}/>
                <div className={s.errorMessages}>Title is requires</div>
            </div>
            <ul>{/* потому что в эту ul мы передаем array => tasks*/}
                {props.tasks.map((m => {
                     const changeStatus=(e:ChangeEvent<HTMLInputElement>)=>props.changeTaskStatus(m.id,e.currentTarget.checked);
                    return (
                        <li key={m.id} className={m.isDone ? "is-done" : ''}>
                            <input type="checkbox"
                                   checked={m.isDone}
                            onChange={changeStatus}
                            /> <span>{m.title}</span>
                            <Button name={'x'} callback={()=>removeTaskHandler(m.id)}/>

                        </li>
                    )
                }))}
            </ul>
            <div>
                <Button name={'All'} callback={()=>topSet('All')}/>
                <Button name={'Active'} callback={()=>topSet('Active')}/>
                <Button name={'Completed'} callback={()=>topSet('Completed')}/>

                {/*        2 вариант:*/}
                {/*<button onClick={()=>topSet('All')} className={props.filter==='All' ? 'active-filter': ''}>All</button>*/}
                {/*/!*через параметр мы передаем строку -идентификатор кнопки*!/*/}
                {/*<button onClick={()=>topSet('Active')} className={props.filter==='Active' ? 'active-filter': ''}>Active</button>*/}
                {/*<button onClick={()=>topSet('Completed')}  className={props.filter==='Completed' ? 'active-filter': ''}>Completed</button>*/}

            </div>
        </div>

    )
}

