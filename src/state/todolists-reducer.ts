import {TodolistsType} from "../App";
import {v1} from "uuid";


export type ActionType = RemoveTodolistAcType | AddTodolistAcType|ChangeTodolistAcType;

export type RemoveTodolistAcType = {
    type: "REMOVE-TODOLIST"
    id: string
}
export type AddTodolistAcType = {
    type: 'ADD-TODOLIST'
    title: string
}
export type ChangeTodolistAcType={
    type: 'CHANGE-TODOLIST-TITLE',
    id: string
    title: string
}



export const todolistsReducer = (todolists: Array<TodolistsType>, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return todolists.filter(tl => tl.id !== action.id); //переносим из функции в апп только логику удаления
        case 'ADD-TODOLIST':
            const newTodolistID=v1(); //NB
            return [...todolists, {id: newTodolistID, title: action.title, filter: 'All'}];
        case  'CHANGE-TODOLIST-TITLE':
            return todolists.map(m => action.id === m.id ? {...m, title: action.title} : m)

    }
}

export const RemoveTodolistAC=(id:string):RemoveTodolistAcType=>{
    return{
        type:"REMOVE-TODOLIST",
        id:id
    }as const
}

export const AddTodolistAC=(title:string):AddTodolistAcType=>{
    return{
        type:"ADD-TODOLIST",
        title:title
    }as const
}
export const ChangeTodolistAC=(title:string,id:string):ChangeTodolistAcType=>{
    return{
        type:'CHANGE-TODOLIST-TITLE',
       id,
       title,

    }as const
}

