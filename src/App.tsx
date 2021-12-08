import React from 'react';
import './App.css';
import {TodoList} from "./TodoList";

export type TaskType = {
    id: number //для идентификации конкретной таски, когда их много
    title: string
    isDone: boolean
}


function App() {
    //BLL
    const todoListTitle_1: string = 'What to Learn';
    const todoListTitle_2: string = 'Songs';

    const tasks_1: Array<TaskType> = [  //для первого листа
        {id: 1, title: 'НTML', isDone: true},
        {id: 2, title: 'CSS', isDone: true},
        {id: 3, title: 'JS/TS', isDone: true},
    ];
    const tasks_2: Array<TaskType> = [  //для второго листа
        {id: 4, title: 'Metallica', isDone: true},
        {id: 5, title: 'Nirvana', isDone: true},
        {id: 6, title: 'Green Day', isDone: true},
    ];
    return (
        <div className="App">
            <TodoList
                title={todoListTitle_1}
                tasks={tasks_1}
            />
            <TodoList
                title={todoListTitle_2}
                tasks={tasks_2}
            />


        </div>
    );
}


export default App;
