import React, {ChangeEvent, ChangeEventHandler, useState,KeyboardEvent} from "react";
import s from './TodoList.module.css'
import {filterType} from "./App";

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
    addTask:(title:string)=>void //функция добавления в инпут
}

export function TodoList(props: TodoListPropsType) {
    const[title,setTitle]=useState<string>(' '); //локальный useState для предварительного пользовательского ввода в инпут.
    //по умолчанию пустая сторока

    const onChangeHandler=(event:ChangeEvent<HTMLInputElement>)=>{
       setTitle(event.currentTarget.value) }
       const addTitle=()=> {
           props.addTask(title)
           setTitle(' ')
    }
    const keyPress=(event:KeyboardEvent<HTMLInputElement>)=>{
        if(event.key==='Enter'){
            addTitle()
        }}
    const onClickSetAllFilter=() => props.setFilter('All');
    const onClickSetActiveFilter=() => props.setFilter('Active');
    const onClickSetCompletedFilter=() => props.setFilter('Completed')
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title}
                    onChange={onChangeHandler}
                    onKeyPress={keyPress}
                />
                {/*передаем функцию-коллбэк:*/}
                <button onClick={addTitle}>+</button>
            </div>
            <ul>{/* потому что в эту ul мы передаем array => tasks*/}
                {props.tasks.map((m => {
                    return (
                        <li key={m.id}><input type="checkbox" checked={m.isDone}/> <span>{m.title}</span>
                            <button onClick={() => props.removeTask(m.id)}
                                    className={s.btn}>x
                            </button>
                        </li>
                    )
                }))}
            </ul>
            <div>
                <button onClick={onClickSetAllFilter}>All</button>
                {/*через параметр мы передаем строку -идентификатор кнопки*/}
                <button onClick={onClickSetActiveFilter}>Active</button>
                <button onClick={onClickSetCompletedFilter}>Completed</button>
            </div>
        </div>

    )
}

