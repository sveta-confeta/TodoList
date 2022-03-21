import React, {ChangeEvent, useCallback} from 'react';
import {EditSpan} from "./EditSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "../TodoList";

type TaskPropsType={
    changeTaskStatus: (id: string,newIsDoneValue: boolean,todolistID:string) => void
    todolistID:string
    apdateTaskTitle:(todolistsID:string,taskID:string,title:string)=>void
    removeTask: (mID: string,todolistID:string) => void//функция удаления
    task:TaskType //то что мапится приходит из тасок, cдесь один обьект из тасок.т есть одна таска
}

export const Task = React.memo((props:TaskPropsType) => {
    const changeStatus =  useCallback((mId: string, value: boolean) => props.changeTaskStatus
    (mId, value,props.todolistID),[props.changeTaskStatus,props.todolistID]);
    const callbackHandlerapdateTask= useCallback((mID:string,title:string)=>{
        props.apdateTaskTitle(props.todolistID,mID,title);
    },[props.apdateTaskTitle,props.todolistID])

    const removeTaskHandler = useCallback((tID: string) => props.removeTask(tID,props.todolistID),
        [props.removeTask,props.todolistID]);
    return (
        <li  className={props.task.isDone ? "is-done" : ''}>
            <input type="checkbox"
                   checked={props.task.isDone}
                   onChange={(e: ChangeEvent<HTMLInputElement>) => changeStatus(props.task.id, e.currentTarget.checked)}
            />
            <EditSpan title={props.task.title}  apdateTask={ (title:string)=>callbackHandlerapdateTask(props.task.id,title)}/>
            {/*<Button name={'x'} callback={() => removeTaskHandler(m.id)}/>*/}
            {/*кнопка из материал:*/}
            <Delete color="action"  style={{cursor:'Pointer',width: '15px'}} onClick={() => removeTaskHandler(props.task.id)}/>


        </li>
    );
});
