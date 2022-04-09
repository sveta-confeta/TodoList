// начнем создавать какую то апи -это обьект
import axios from "axios";

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': ' f3162e35-770f-487f-b065-e5df2b65ff7d'
    }
}

export const todolistAPI = {
    getTodolist() {
        let promise = axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', {withCredentials: true}
        )
        return promise //возращаем запрос на сервер
    },
    createTodolist() {
        let promise = axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists', {title: "newTodolist"}, settings)
        return promise
    },
    deleteTodolist(todolistId:string){
        let promise=axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, settings)
        return promise
    },
    updateTodolistTitle(todolistId:string,title:string){
        let pr=axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, {title}, settings)
        return pr
    },
}