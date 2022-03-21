import React, {ChangeEvent, useCallback} from "react";
import {AddItemForm} from "./components/AddItemForm";
import {EditSpan} from "./components/EditSpan";
import {Button, ButtonGroup, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {filterType} from "./AppWhithReducer";
import {Task} from "./components/Task";


export type TaskType = {
    id: string //для идентификации конкретной таски, когда их много
    title: string
    isDone: boolean
}
export type TasksType = {
    [key: string]: Array<TaskType>
}

type TodoListPropsType = {
    todolistID: string
    title: string
    tasks: Array<TaskType> //таски меняются из за того что их фильтр постоянно песочит
    removeTask: (mID: string, todolistID: string) => void//функция удаления
    setFilter: (id: string, value: filterType) => void //void-потому что функция ничего не возращает,без return
    addTask: (title: string, todolistID: string) => void //функция добавления в инпут
    changeTaskStatus: (id: string, newIsDoneValue: boolean, todolistID: string) => void
    filter: filterType;
    filteredTasks: (id: string, value: filterType,) => void
    removeTodolist: (todolistID: string) => void
    apdateTaskTitle: (todolistsID: string, taskID: string, title: string) => void
    titleTodolist: (todolistsID: string, title: string) => void
}

export const TodoList = React.memo((props: TodoListPropsType) => {
    console.log('Todolist');

    const topSet = useCallback((value: filterType) => { //app.tsx:type filterType = 'All' | 'Active' | 'Completed' //типизация фильтра для кнопок
        props.filteredTasks(props.todolistID, value);
    }, [props.filteredTasks, props.todolistID]);


    const removeTodolist = useCallback(() => {
        props.removeTodolist(props.todolistID)
    }, [props.removeTodolist, props.todolistID])

    const addTask = useCallback((newTaskTitle: string) => {
        props.addTask(newTaskTitle, props.todolistID)
    }, [props])


    const callbackTitleTodolist = useCallback((title: string) => {
        props.titleTodolist(props.todolistID, title)
    }, [props.titleTodolist, props.todolistID])
    //filters
    let todolistTask = props.tasks; //чтоб убрать лишние перерисовки у нас фильтр в каждой компоненте
    if (props.filter === 'Active') {
        todolistTask = todolistTask.filter(f => f.isDone);
    }
    if (props.filter === 'Completed') {
        todolistTask = todolistTask.filter(f => f.isDone);
    }
    //
    return (
        <div>
            {/*<h3>{props.title}</h3>*/}
            <h3><EditSpan title={props.title} apdateTask={(title: string) => callbackTitleTodolist(title)}/></h3>
            <IconButton aria-label="delete">
                <Delete color="action" style={{cursor: 'Pointer'}} onClick={removeTodolist}/>
            </IconButton>


            {/*    <Button  name={'X'} callback={removeTodolists} }/>*/}

            <div>
                {/*//компонента с инпут и кнопкой:*/}
                <AddItemForm addItem={addTask}/>

            </div>
            <ul>
                {todolistTask.map((m => {
                    return (
                        <Task key={m.id}
                            changeTaskStatus={props.changeTaskStatus} //это чекбок,название таски и кнопка удаления таски
                            todolistID={props.todolistID}
                            apdateTaskTitle={props.apdateTaskTitle}
                            removeTask={props.removeTask}
                            task={m}/>

                    )
                }))}
            </ul>
            <div>
                <ButtonGroup variant="contained"
                             size={"small"}>

                    <Button color={props.filter === 'All' ? 'secondary' : 'success'}
                        // className={props.filter === 'All' ? s.activeFilter : ''}
                            onClick={() => topSet('All')}>All</Button>
                    <Button
                        color={props.filter === 'Active' ? 'secondary' : 'success'}
                        // className={props.filter === 'Active' ? s.activeFilter : ''}
                        onClick={() => topSet('Active')}> Active
                    </Button>
                    <Button
                        color={props.filter === 'Completed' ? 'secondary' : 'success'}
                        // className={props.filter === 'Completed' ? s.activeFilter : ''}
                        onClick={() => topSet('Completed')}>Completed
                    </Button>
                </ButtonGroup>
            </div>
        </div>

    )
},);

