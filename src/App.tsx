import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";

export type filterType = 'All' | 'Active' | 'Completed' //типизация фильтра для кнопок
type TodilistsType = {
    id: string,
    title: string,
    filter: filterType;
}

function App() {
    let [todolists, setTodolists] = useState<Array<TodilistsType>>([  //чтоб происходила перерисовка видоизмененных данных
        {id: v1(), title: 'What to Learn', filter: 'All'},//use state принимает данные и возращает массив
        {id: v1(), title: 'What to read', filter: 'All'},]);
    //BLL


    //hook
    let [tasks, setTasks] = useState([ //чтоб происходила перерисовка видоизмененных данных
        {id: v1(), title: 'НTML', isDone: true},//use state принимает данные и возращает массив
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'JS/TS', isDone: true},
        {id: v1(), title: 'CSS', isDone: false},
        {id: v1(), title: 'JS/TS', isDone: false},
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'JS/TS', isDone: true},
    ]);


    //функция-колбэк для кнопки добавления задач в инпут:
    const addTask = (title: string) => {
        setTasks([{id: v1(), title: title, isDone: true}, ...tasks])
    }

    // функция для кнопки удаления
    const removeTask = (mId: string) => {  //mId-мы назвали id специально чтоб не путаться где чье id
        setTasks(tasks.filter(f => f.id !== mId)) //функция удаления которая будет привязана к кнопке и ее надо через
        //пропс поместить в туду лист
    }


    //функция фильтрации кнопок: принимает значение value от кнопок
    const filteredTask = (todolistID:string,value: filterType) => {  //принимаем от кнопки value (например'all')
        setTodolists(todolists.map(m=> todolistID===m.id ? {...m,filter:value}: m));
        }


    const changeTaskStatus = (id: string, newIsDoneValue: boolean) => {
        setTasks(tasks.map(t => t.id === id ? {...t, isDone: newIsDoneValue} : t))
    };  //функция управления чекбоксом вкл и выкл


    return (
        <div className="App">
            {todolists.map(m => {
                if (m.filter === 'Active') {
                   tasks = tasks.filter(f => f.isDone);
                }

                if (m.filter === 'Completed') {
                   tasks = tasks.filter(f => !f.isDone);
                }
                return (
                    <TodoList
                        key={m.id}
                        todolistID={m.id} //если красная надо типизировать v todolist.tsx
                        title={m.title}
                        tasks={tasks}
                        removeTask={removeTask} //перебрасываем в тудулист функция удаления
                        setFilter={filteredTask} //передаем функцию и не забываем типизаровать в тудулисте
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        filter={m.filter} //для навешивания css классов кнопкам
                        filteredTasks={filteredTask}
                    />
                )
            })}

        </div>
    );
}


export default App;
