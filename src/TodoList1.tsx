import React, {ChangeEvent, useCallback} from "react";
import {AddItemForm} from "./components/AddItemForm";
import {EditSpan} from "./components/EditSpan";
import {Button, ButtonGroup, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {filterType, TodolistsType} from "./AppWhithReducer";
import {Task} from "./components/Task";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {AddTaskAC, RemoveTaskAC} from "./reducer/TasksReducer";
import {ChangeTodolistAC, ChangeTodolistFilterAC, RemoveTodolistAC} from "./state/todolists-reducer";


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
}

export const TodoList1 = React.memo((props: TodoListPropsType) => {
    console.log('Todolist');

   let todolist=useSelector<AppRootStateType,TodolistsType>(state=> state.todolists.filter(f=>f.id ==props.todolistID)[0])
    let tasks=useSelector<AppRootStateType,Array<TaskType>>(state=> state.tasks[props.todolistID])

    const dispatch=useDispatch();

    const topSet = useCallback((value: filterType) => { //app.tsx:type filterType = 'All' | 'Active' | 'Completed' //типизация фильтра для кнопок
        // props.filteredTasks(props.todolistID, value);
        dispatch(ChangeTodolistFilterAC(props.todolistID,value));
    }, [ props.todolistID]);


    const removeTodolist = useCallback(() => {
        // props.removeTodolist(props.todolistID)
        dispatch(RemoveTodolistAC(props.todolistID))
    }, [ props.todolistID])

    const addTask = useCallback((newTaskTitle: string) => {
        // props.addTask(newTaskTitle, props.todolistID)
        dispatch(AddTaskAC(newTaskTitle,props.todolistID));
    }, [props.todolistID])


    const callbackTitleTodolist = useCallback((title: string) => {
        // props.titleTodolist(props.todolistID, title)
        dispatch(ChangeTodolistAC(props.todolistID,title))
    }, [ props.todolistID])


//filters:

    if (todolist.filter === 'Active') {
        tasks = tasks.filter(f => f.isDone);
    }
    if (todolist.filter === 'Completed') {
        tasks = tasks.filter(f => !f.isDone);
    }

    //


    return (
        <div>
            {/*<h3>{props.title}</h3>*/}
            <h3><EditSpan title={todolist.title} apdateTask={(title: string) => callbackTitleTodolist(title)}/></h3>
            <IconButton aria-label="delete">
                <Delete color="action" style={{cursor: 'Pointer'}} onClick={removeTodolist}/>
            </IconButton>


            {/*    <Button  name={'X'} callback={removeTodolists} }/>*/}

            <div>
                {/*//компонента с инпут и кнопкой:*/}
                <AddItemForm addItem={addTask}/>

            </div>
            <ul>
                {tasks.map((m => {
                    return (
                        <Task key={m.id}
                              taskID={m.id}
                            // changeTaskStatus={props.changeTaskStatus} //это чекбок,название таски и кнопка удаления таски
                            todolistID={props.todolistID}
                            // apdateTaskTitle={props.apdateTaskTitle}
                            // removeTask={props.removeTask}
                            // task={m}
                     />

                    )
                }))}
            </ul>
            <div>
                <ButtonGroup variant="contained"
                             size={"small"}>

                    <Button color={todolist.filter === 'All' ? 'secondary' : 'success'}
                        // className={props.filter === 'All' ? s.activeFilter : ''}
                            onClick={() => topSet('All')}>All</Button>
                    <Button
                        color={todolist.filter === 'Active' ? 'secondary' : 'success'}
                        // className={props.filter === 'Active' ? s.activeFilter : ''}
                        onClick={() => topSet('Active')}> Active
                    </Button>
                    <Button
                        color={todolist.filter === 'Completed' ? 'secondary' : 'success'}
                        // className={props.filter === 'Completed' ? s.activeFilter : ''}
                        onClick={() => topSet('Completed')}>Completed
                    </Button>
                </ButtonGroup>
            </div>
        </div>

    )
},);

