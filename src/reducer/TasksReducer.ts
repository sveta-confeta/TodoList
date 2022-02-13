import {TasksType} from "../TodoList";
import {v1} from "uuid";


export const TasksReducer = (state: TasksType, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            let newState = {...state};
            return newState[action.payload.todolistID] = newState[action.payload.todolistID].filter(f => f.id !== action.payload.taskID)
        }
        case 'ADD-TASK': {
            let newState = {...state};
            return newState[action.payload.todolistID] = [{
                id: v1(),
                title: action.payload.title,
                isDone: true
            }, ...newState[action.payload.todolistID]]
        }
        case 'APDATE-TASK-TITLE': {
            let newState = {...state};
            return newState[action.payload.todolistID] = newState[action.payload.todolistID].filter(f => f.id !== action.payload.taskID)
        }
        default:
            return state;
    }
}

type ActionType = RemoveTaskACType | AddTaskACType|ApdateTaskTitleACType;

type RemoveTaskACType = ReturnType<typeof RemoveTaskAC>
type AddTaskACType = ReturnType<typeof AddTaskAC>
type ApdateTaskTitleACType = ReturnType<typeof ApdateTaskTitleTaskAC>

export const RemoveTaskAC = (taskID: string, todolistID: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            taskID,
            todolistID
        }
    } as const
};
export const AddTaskAC = (title: string, todolistID: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            title,
            todolistID
        }
    } as const
};
export const ApdateTaskTitleTaskAC = (todolistID: string, taskID: string, title: string) => {
    return {
        type: 'APDATE-TASK-TITLE',
        payload: {
            todolistID,
            taskID,
            title
        }
    } as const
};