import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";

export type filterType = 'All' | 'Active' | 'Completed' //типизация фильтра для кнопок


function App() {
    //BLL
    const todoListTitle: string = 'What to Learn';

    //hook
    let [tasks, setTasks] = useState([ //чтоб происходила перерисовка видоизмененных данных
        {id: v1(), title: 'НTML', isDone: true},//use state принимает данные и возращает массив
        {id:  v1(), title: 'CSS', isDone: true},
        {id:  v1(), title: 'JS/TS', isDone: true},
        {id:  v1(), title: 'CSS', isDone: false},
        {id:  v1(), title: 'JS/TS', isDone: false},
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'JS/TS', isDone: true},
    ]);

    //функция-колбэк для кнопки добавления задач в инпут:
    const addTask=(title:string)=>{
        setTasks([ {id: v1(), title: title, isDone: true},...tasks])
    }

    // функция для кнопки удаления
    const removeTask = (mId: string) => {  //mId-мы назвали id специально чтоб не путаться где чье id
        setTasks(tasks.filter(f => f.id !== mId)) //функция удаления которая будет привязана к кнопке и ее надо через
        //пропс поместить в туду лист
    }


    //hook
    const [filterValue, setFilterValue] = useState<filterType>('All') //all-по умолчанию

    // фильтр для кнопок
    let isDoneTrue = tasks;
    if (filterValue === 'Active') {
        isDoneTrue = tasks.filter(f => f.isDone);
    }

    if (filterValue === 'Completed') {
        isDoneTrue = tasks.filter(f => !f.isDone);
    }
    // функция фильтрации кнопок: принимает значение value от кнопок
    const filteredTasks = (value: filterType) => {  //принимаем от кнопки value (например'all')
        setFilterValue(value);
    }




    const changeTaskStatus=(id:string, newIsDoneValue:boolean)=>{

      setTasks(tasks.map(t=> t.id===id ? {...t ,isDone: newIsDoneValue} : t))
    };  //функция управления чекбоксом вкл и выкл


    return (
        <div className="App">
            <TodoList
                title={todoListTitle}
                tasks={isDoneTrue}
                removeTask={removeTask} //перебрасываем в тудулист функция удаления
                setFilter={filteredTasks} //передаем функцию и не забываем типизаровать в тудулисте
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
                filter={filterValue} //для навешивания css классов кнопкам
                filteredTasks={filteredTasks}
            />

        </div>
    );
}


export default App;
