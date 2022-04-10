// начнем создавать какую то апи -это обьект
import axios, {Axios} from "axios";

export const instance=axios.create({   //все что у нас повторяется засовываем в спец обьект
    baseURL:'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': ' f3162e35-770f-487f-b065-e5df2b65ff7d'
    }

})

export const todolistAPI = {
    getTodolist() {
        let promise = instance.get<Array<TodoType>>('todo-lists')
        return promise //возращаем запрос на сервер
    },
    createTodolist() {
        let promise = instance.post<TodoPostType>('todo-lists', {title: "newTodolist"})
        return promise
    },
    deleteTodolist(todolistId:string){
        let promise=instance.delete(`todo-lists/${todolistId}`)
        return promise
    },
    updateTodolistTitle(todolistId:string,title:string){
        let pr=instance.put(`todo-lists/${todolistId}`, {title})
        return pr
    },
}

//нужно типизировать входящие гет параметры!!!
//для пост запросов типизируем то что в response приходит в самом низу,не забываем смотреть документацию массив чего приходи в  messages

type TodoType={
    "id": string
    "title": string
    "addedDate": string
    "order":number
}

type TodoPostType={
    resultCode: number
    messages: string[]
    data: {
        item:  TodoType
    }
}