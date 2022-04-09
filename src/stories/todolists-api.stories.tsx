import React, {useEffect, useState} from 'react'
import axios from "axios";
import {todolistAPI} from "../api/todolistAPI";

export default {
    title: 'API'
}

export const GetTodolists = () => {

    const [state, setState] = useState<any>(null)

    useEffect(() => {
       //withCredentials определяет, должны ли межсайтовые (кроссдоменные) запросы выполняться с использованием учетных данных (cookie)
       // axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists',{withCredentials: true})
        todolistAPI.getTodolist() //а сам гет запрс теперь в отдельном файле
       .then((res) => {

            setState(res.data);
        })


    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        // axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists', {title: "newTodolist"}, settings)
        todolistAPI.createTodolist()
            .then( (res) => {
            setState(res.data);
        } )


    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {

    const [state, setState] = useState<any>(null)

    useEffect(() => {
         const todolistId = "6042bd5a-703a-43f9-8642-65d702a1a959";
        // axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, settings)
        todolistAPI.deleteTodolist(todolistId)
        .then( (res) => {
            setState(res.data);
        })


    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {

    const [state, setState] = useState<any>(null)

    useEffect(() => {
         const todolistId =  "3b95ecc1-0011-41cd-ae9c-b12fbee108b0";
         let title = "ANGULAR"
        // let pr=axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, {title}, settings)
        todolistAPI.updateTodolistTitle(todolistId,title)
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}

