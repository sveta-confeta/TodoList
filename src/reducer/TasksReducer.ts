import {TasksType, TaskType} from "../TodoList";
import {v1} from "uuid";
import {AddTodolistAcType, } from "../state/todolists-reducer";

const initialState:TasksType={}


export const TasksReducer = (state: TasksType=initialState, action: ActionType):TasksType => {
    switch (action.type) {
        case 'REMOVE-TASK': {

            return {...state, [action.payload.todolistID]: state[action.payload.todolistID].filter(f => f.id !== action.payload.taskID)}
        }
        case 'ADD-TASK': {
            let copyState = {...state}
            let newTask :TaskType= {
                id: v1(),
                title: action.payload.title,
                isDone: true
            }
            return {...copyState,
                [action.payload.todolistID]: [newTask, ...state[action.payload.todolistID]]
            }
        }
        case 'APDATE-TASK-TITLE': {

            return {...state,[action.payload.todolistID]:state[action.payload.todolistID].map(m => m.id===action.payload.taskID ? {...m,title:action.payload.title}: m)
        }}
        case 'CHANGE-TASK-STATUS': {

            let copyState= {...state}
            return { ...copyState,
                [action.payload.todolistID]: state[action.payload.todolistID].map(m => m.id===action.payload.taskID ? {...m,isDone:action.payload.isDone}: m)
        }}

        case 'ADD-TODOLIST':{
            return {...state,[ v1()]:[]}; //с добавлением тудулиста добавляем в таски новый ключ с пустым массивом
        }

        default:
            return state;
    }
}

type ActionType = RemoveTaskACType | AddTaskACType|ApdateTaskTitleACType| ChangeTaskStatusType |  AddTodolistAcType;

export type RemoveTaskACType = ReturnType<typeof RemoveTaskAC>
export type AddTaskACType = ReturnType<typeof AddTaskAC>
export type ApdateTaskTitleACType = ReturnType<typeof ApdateTaskTitleTaskAC>
export type ChangeTaskStatusType= ReturnType<typeof ChangeTaskStatusAC>

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
export const ChangeTaskStatusAC = ( taskID: string, isDone: boolean,todolistID: string,) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {
            taskID,
            isDone,
            todolistID,
        }
    } as const
};