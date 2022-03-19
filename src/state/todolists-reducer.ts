
import {v1} from "uuid";
import {filterType, TodolistsType} from "../AppWhithReducer";



export type ActionType = RemoveTodolistAcType | AddTodolistAcType | ChangeTodolistAcType | ChangeFilterACType;

export type RemoveTodolistAcType = {
    type: "REMOVE-TODOLIST"
    id: string
}
export type AddTodolistAcType = {
    type: 'ADD-TODOLIST'
    title: string
    todolistID:string
}
export type ChangeTodolistAcType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string
    title: string
}
export type ChangeFilterACType = {
    type: 'CHANGE-TODOLIST-FILTER', id: string, filter: filterType
}
const initialState:Array<TodolistsType>=[] //чтоб стейт стал видимым , подготовленным принять данные с сервера
    //но можно в инициал стейт вставлять временные данные заглушки

export const todolistsReducer = (todolists: Array<TodolistsType> = initialState, action: ActionType): Array<TodolistsType> => { //state
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return todolists.filter(tl => tl.id !== action.id); //переносим из функции в апп только логику удаления
        case 'ADD-TODOLIST':
            // return [...todolists, {id: newTodolistID, title: action.title, filter: 'All'}];
            return [...todolists, {id: action.todolistID, title: action.title, filter: 'All'}];
        case  'CHANGE-TODOLIST-TITLE':
            return todolists.map(m => action.id === m.id ? {...m, title: action.title} : m);
        case  'CHANGE-TODOLIST-FILTER':
            return todolists.map(m => m.id === action.id ? {...m, filter: action.filter} : m)

        default:
            return todolists;
    }}

    export const RemoveTodolistAC = (id: string): RemoveTodolistAcType => {
        return {
            type: "REMOVE-TODOLIST",
            id: id
        } as const
    }

    export const AddTodolistAC = (title: string): AddTodolistAcType => {
        return {
            type: "ADD-TODOLIST",
            title: title,
            todolistID:v1() //создаем id для тасок и тудулистов новых
        } as const
    }
    export const ChangeTodolistAC = (title: string, id: string): ChangeTodolistAcType => {
        return {
            type: 'CHANGE-TODOLIST-TITLE',
            id,
            title,

        } as const
    }

    export const ChangeTodolistFilterAC = (id: string, filter: filterType) => {
        return {
            type: 'CHANGE-TODOLIST-FILTER',
            id,
            filter
        } as const
    }

