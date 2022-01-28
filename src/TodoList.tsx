import React, {ChangeEvent, useState} from "react";
import {filterType} from "./App";
import {ButtonOne} from "./components/Button";
import s from './TodoList.module.css'
import {AddItemForm} from "./components/AddItemForm";
import EditSpan from "./components/EditSpan";
import {Button, ButtonGroup, IconButton} from "@material-ui/core";
import { Delete } from "@material-ui/icons";




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
    apdateTaskTitle:(todolistsID:string,taskID:string,title:string)=>void
    titleTodolist:(todolistsID:string,title:string)=>void
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

    const callbackHandlerapdateTask=(mID:string,title:string)=>{
        props.apdateTaskTitle(props.todolistID,mID,title);
    }
    const callbackTitleTodolist=(title:string)=>{
        props.titleTodolist(props.todolistID,title)
    }



    return (
        <div>
            {/*<h3>{props.title}</h3>*/}
            <h3><EditSpan title={props.title} apdateTask={ (title:string)=>callbackTitleTodolist(title)}/></h3>
            {/*<IconButton aria-label="delete" >*/}
                <Delete  color="action" style={{cursor:'Pointer'}} onClick={removeTodolists}/>
        {/*</IconButton>*/}
            <ButtonOne name={'X'} callback={removeTodolists}/>
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
                            />
                            <EditSpan title={m.title}  apdateTask={ (title:string)=>callbackHandlerapdateTask(m.id,title)}/>
                            {/*<ButtonOne name={'x'} callback={() => removeTaskHandler(m.id)}/>*/}

                        </li>
                    )
                }))}
            </ul>
            <div>
                <ButtonGroup variant="contained"
                size={"small"}>

                <Button color = {props.filter==='All' ? 'secondary': 'success'}
                        // className={props.filter === 'All' ? s.activeFilter : ''}
                        onClick={() => topSet('All')}>All</Button>
                    <Button
                        color = {props.filter==='Active' ? 'secondary': 'success'}
                        // className={props.filter === 'Active' ? s.activeFilter : ''}
                            onClick={() => topSet('Active')}> Active
                        </Button>
                        <Button
                            color = {props.filter==='Completed' ? 'secondary': 'success'}
                            // className={props.filter === 'Completed' ? s.activeFilter : ''}
                                onClick={() => topSet('Completed')}>Completed
                            </Button>
                </ButtonGroup>
            </div>
        </div>

)
}

