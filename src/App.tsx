import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";

export type filterType = 'All' | 'Active' | 'Completed' //типизация фильтра для кнопок


function App() {
    //BLL
    const todoListTitle: string = 'What to Learn';

    //hook
    const [tasks, setTasks] = useState([ //чтоб происходила перерисовка видоизмененных данных
        {id: 1, title: 'НTML', isDone: true},//use state принимает данные и возращает массив
        {id: 2, title: 'CSS', isDone: true},
        {id: 3, title: 'JS/TS', isDone: true},
        {id: 4, title: 'CSS', isDone: false},
        {id: 5, title: 'JS/TS', isDone: false},
        {id: 6, title: 'CSS', isDone: true},
        {id: 7, title: 'JS/TS', isDone: true},
    ]);

    // функция для кнопки удаления
    const removeTask = (mId: number) => {  //mId-мы назвали id специально чтоб не путаться где чье id
        setTasks(tasks.filter(f => f.id !== mId)) //функция удаления которая будет привязана к кнопке и ее надо через
        //пропс поместить в туду лист
    }
    //hook
    // const [filterValue, setFilterValue] = useState<filterType>('All') //all-по умолчанию
    // console.log(filterValue);
    //
    //
    // // фильтр для кнопок
    // let isDoneTrue = tasks
    // if (filterValue === 'Active') {
    //     isDoneTrue = tasks.filter(f => f.isDone);
    // }
    // if (filterValue === 'Completed') {
    //     isDoneTrue = tasks.filter(f => !f.isDone);
    // }
    // //принимает значение value от кнопок
    // const filteredTasks = (value: filterType) => {  //принимаем от кнопки value (например'all')
    //     setFilterValue(value);
    // }
    // const setFilter = (value:string) => {  //принимаем от кнопки value (например'all')
    //   setMyFilter(value)                    //если 'all'-то дай все
    //     console.log(filter);                  //если 'Active'-то дай не все
    // }                                         //если 'completed'-то дай не не все


    return (
        <div className="App">
            <TodoList
                title={todoListTitle}
                tasks={tasks}
                removeTask={removeTask} //перебрасываем в тудулист функция удаления
                // setFilter={setFilterValue} //передаем функцию и не забываем типизаровать в тудулисте
            />

        </div>
    );
}


export default App;
