import React, {ChangeEvent, useCallback} from 'react';
import {EditSpan} from "./EditSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "../TodoList";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {TodolistsType} from "../AppWhithReducer";
import {ApdateTaskTitleTaskAC, ChangeTaskStatusAC, RemoveTaskAC} from "../reducer/TasksReducer";

type TaskPropsType={
    // changeTaskStatus: (id: string,newIsDoneValue: boolean,todolistID:string) => void
    todolistID:string
    // apdateTaskTitle:(todolistsID:string,taskID:string,title:string)=>void
    // removeTask: (mID: string,todolistID:string) => void//функция удаления
    // task:TaskType //то что мапится приходит из тасок, cдесь один обьект из тасок.т есть одна таска
    taskID:string
}

export const Task = React.memo((props:TaskPropsType) => {

    const todolist=useSelector<AppRootStateType,TodolistsType>(state=> state.todolists.filter(f=>f.id ==props.todolistID)[0])
    const tasks=useSelector<AppRootStateType,TaskType>(state=> state.tasks[props.todolistID].filter(f=> f.id==props.taskID)[0])

    const dispatch=useDispatch();


    const changeStatus =  useCallback((taskID: string, value: boolean) =>
        // props.changeTaskStatus(mId, value,props.todolistID)
            dispatch(ChangeTaskStatusAC(taskID,value,props.todolistID))
        ,[props.todolistID]);

    const callbackHandlerapdateTask= useCallback((taskID:string,title:string)=>{
        // props.apdateTaskTitle(props.todolistID,mID,title);
        dispatch(ApdateTaskTitleTaskAC(taskID,title,props.todolistID));
    },[props.todolistID])

    const removeTaskHandler = useCallback((taskID: string) =>
            // props.removeTask(tID,props.todolistID),
        dispatch(RemoveTaskAC(taskID,props.todolistID)),
        [props.todolistID]);
    return (
        <li  className={tasks.isDone ? "is-done" : ''}>
            <input type="checkbox"
                   checked={tasks.isDone}
                   onChange={(e: ChangeEvent<HTMLInputElement>) => changeStatus(tasks.id, e.currentTarget.checked)}
            />
            <EditSpan title={tasks.title}  apdateTask={ (title:string)=>callbackHandlerapdateTask(props. taskID,title)}/>
            {/*<Button name={'x'} callback={() => removeTaskHandler(m.id)}/>*/}
            {/*кнопка из материал:*/}
            <Delete color="action"  style={{cursor:'Pointer',width: '15px'}} onClick={() => removeTaskHandler(props. taskID)}/>


        </li>
    );
});
