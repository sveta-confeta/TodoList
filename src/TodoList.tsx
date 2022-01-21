import React, {ChangeEvent, useState} from "react";
import {filterType} from "./App";
import {Button} from "./components/Button";
import s from './TodoList.module.css'
import {AddItemForm} from "./components/AddItemForm";

export type TaskType = {
    id: string //для идентификации конкретной таски, когда их много
    title: string
    isDone: boolean
}
export type TasksType={
    [key:string]:Array<TaskType>

}

type TodoListPropsType = {
    todolistID:string
    title: string
    tasks:Array<TaskType>
    removeTask: (mID: string,todolistID:string) => void//функция удаления
    setFilter: (id:string,value: filterType) => void //void-потому что функция ничего не возращает,без return
    addTask: (title: string,todolistID:string) => void //функция добавления в инпут
    changeTaskStatus: (id: string,newIsDoneValue: boolean,todolistID:string) => void
    filter: filterType;
    filteredTasks:(id:string,value:filterType,)=>void
    removeTodolist:(todolistID:string)=>void
}

export function TodoList(props: TodoListPropsType) {

    const topSet = (value: filterType) => { //app.tsx:type filterType = 'All' | 'Active' | 'Completed' //типизация фильтра для кнопок
        props.filteredTasks(props.todolistID,value);
    }
    const removeTaskHandler = (tID: string) => props.removeTask(tID,props.todolistID);



    const changeStatus = (mId: string, value: boolean) => props.changeTaskStatus(mId, value,props.todolistID);
    const removeTodolists=()=>{
        removeTodolist();
    }

    const removeTodolist=()=>{
        props.removeTodolist(props.todolistID)
    }

    const addTask=(newTaskTitle:string)=>{
         props.addTask(newTaskTitle,props.todolistID)
    }


    return (
        <div>
            <h3>{props.title}</h3>
            <Button name={'X'} callback={removeTodolists}/>
            <div>
                {/*//компонента с инпут и кнопкой:*/}
              <AddItemForm addItem={addTask} />
                {/*<input*/}
                {/*    value={title}*/}
                {/*    onChange={onChangeHandler}  //!!!!!инпут сдесь*/}
                {/*    onKeyPress={keyPress}*/}
                {/*/>*/}
                {/*/!*передаем функцию-коллбэк:*!/*/}
                {/*/!*<button onClick={addTitle}>+</button>*!/*/}


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

