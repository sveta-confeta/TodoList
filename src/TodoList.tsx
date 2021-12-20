import React, {useState} from "react";
import s from './TodoList.module.css'
import {filterType} from "./App";

type TaskType = {
    id: number //для идентификации конкретной таски, когда их много
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
     removeTask: (mId: number) => void//функция удаления
    // setFilter: (value: filterType) => void //void-потому что функция ничего не возращает,без return
}

export function TodoList(props: TodoListPropsType) {

    const [filterValue, setFilterValue] = useState<filterType>('All') //all-по умолчанию

    // фильтр для кнопок
    let isDoneTrue = props.tasks
    if (filterValue === 'Active') {
        isDoneTrue = isDoneTrue.filter(f => f.isDone);
    }
    if (filterValue === 'Completed') {
        isDoneTrue= isDoneTrue.filter(f => !f.isDone);
    }
    //принимает значение value от кнопок
    const filteredTasks = (value: filterType) => {  //принимаем от кнопки value (например'all')
        setFilterValue(value);
    }


    return (
        <div>
            <h3>{props.title}</h3>
            <div>setTasks
                <input/>
                <button>+</button>
            </div>
            <ul>{/* потому что в эту ul мы передаем array => tasks*/}
                {isDoneTrue.map((m => {
                    return (
                        <li key={m.id}><input type="checkbox" checked={m.isDone}/> <span>{m.title}</span>
                            <button onClick={() => props.removeTask(m.id)}
                                    className={s.btn}>x
                            </button>
                        </li>
                    )
                }))}
            </ul>
            <div>
                <button onClick={() => filteredTasks('All')}>All</button>
                {/*через параметр мы передаем строку -идентификатор кнопки*/}
                <button onClick={() => filteredTasks('Active')}>Active</button>
                <button onClick={() => filteredTasks('Completed')}>Completed</button>
            </div>
        </div>

    )
}

