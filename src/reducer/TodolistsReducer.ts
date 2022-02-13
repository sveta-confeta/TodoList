import {filterType, TodolistsType} from "../App";

export const TodolistReducer = (state:Array<TodolistsType>, action: ActionType) => {
    switch (action.type) {
        case 'TITLE-TODOLIST': {
            let newState = {...state};
            return newState.map(m => action.payload.todolistID === m.id ? {...m, title: action.payload.title} : m)
        }
        case 'REMOVE-TODOLIST': {
            let newState = {...state};
            return newState.filter(f => f.id !== action.payload.todolistID)
        }
        case 'ADD-TODOLIST': {
            let newState = {...state};
            return newState.filter(f => f.id !== action.payload.titleTodolist)
        }
        case 'FILTERED-TASK': {
            let newState = {...state};
            return newState.map(m => action.payload.todolistID === m.id ? {...m, filter: action.payload.value} : m)
        }
        default:
            return state;
    }}

type ActionType = TitleTodolistACType |RemoveTodolistACType |AddTodolistACType|FilteredTaskACType ;

type TitleTodolistACType = ReturnType<typeof TitleTodolistAC>;
type RemoveTodolistACType = ReturnType<typeof RemoveTodolistAC>;
type AddTodolistACType = ReturnType<typeof AddTodolistAC>;
type FilteredTaskACType = ReturnType<typeof FilteredTaskAC>;

export const TitleTodolistAC=(todolistID: string, title: string)=>{
    return{
        type: 'TITLE-TODOLIST',
        payload:{
            todolistID,
            title
        }
    }as const
}
export const RemoveTodolistAC=(todolistID: string)=>{
    return{
        type:  'REMOVE-TODOLIST',
        payload:{
            todolistID

        }
    }as const
}
export const  AddTodolistAC=(titleTodolist: string)=>{
    return{
        type: 'ADD-TODOLIST',
        payload:{
            titleTodolist

        }
    }as const
}
export const  FilteredTaskAC=(todolistID: string, value: filterType)=>{
    return{
        type: 'FILTERED-TASK',
        payload:{
            todolistID,
            value

        }
    }as const
}