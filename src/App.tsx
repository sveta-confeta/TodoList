import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";
import {TaskType} from "./TodoList";
import {AddItemForm} from "./components/AddItemForm";

export type filterType = 'All' | 'Active' | 'Completed' //типизация фильтра для кнопок
type TodilistsType = {
    id: string,
    title: string,
    filter: filterType;
}

function App() {

    const todolistID_1 = v1();
    const todolistID_2 = v1();
    let [todolists, setTodolists] = useState<Array<TodilistsType>>([  //чтоб происходила перерисовка видоизмененных данных
        {id: todolistID_1, title: 'What to Learn', filter: 'All'},//use state принимает данные и возращает массив
        {id: todolistID_2, title: 'What to read', filter: 'All'},]);
    //BLL


    //hook
    let [tasks, setTasks] = useState({   //чтоб происходила перерисовка видоизмененных данных
        [todolistID_1]: [{id: v1(), title: 'НTML', isDone: true},//use state принимает данные и возращает массив
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'JS/TS', isDone: true},
            {id: v1(), title: 'CSS', isDone: false},
            {id: v1(), title: 'JS/TS', isDone: false},
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'JS/TS', isDone: true},
        ],
        [todolistID_2]: [
            {id: v1(), title: 'React', isDone: true},
            {id: v1(), title: 'Redux', isDone: true},
            {id: v1(), title: 'SASS', isDone: false},
            {id: v1(), title: 'OPP', isDone: false},

        ]
    });


    //функция-колбэк для кнопки добавления задач в инпут:
    const addTask = (title: string, todolistID: string) => {
        const copyTasks = {...tasks};
        copyTasks[todolistID] = [{id: v1(), title: title, isDone: true}, ...tasks[todolistID]]
        setTasks(copyTasks);
    }

    // функция для кнопки удаления
    const removeTask = (taskID: string, todolistID: string) => {
        const copyTasks = {...tasks};
        copyTasks[todolistID] = copyTasks[todolistID].filter(f => f.id !== taskID)
        setTasks(copyTasks) //функция удаления которая будет привязана к кнопке и ее надо через
        //пропс поместить в туду лист
    }
    const changeTaskStatus = (taskID: string, newIsDoneValue: boolean, todolistID: string) => {
        const copyTasks = {...tasks};
        copyTasks[todolistID] = tasks[todolistID].map(t => t.id === taskID ? {...t, isDone: newIsDoneValue} : t);
        setTasks(copyTasks);
    };  // функция управления чекбоксом вкл и выкл


    //функция фильтрации кнопок: принимает значение value от кнопок
    const filteredTask = (todolistID: string, value: filterType) => {  //принимаем от кнопки value (например'all')
        setTodolists(todolists.map(m => todolistID === m.id ? {...m, filter: value} : m));
    }

    const apdateTaskTitle=(todolistID:string,taskID:string,title:string)=>{
        const copyTasks = {...tasks};
        copyTasks[todolistID] = tasks[todolistID].map(t => t.id === taskID ? {...t, title:title} : t);
        setTasks(copyTasks);  //функция которая редактирует title в тасках

  }

  const titleTodolist=(todolistID:string,title:string)=>{
     setTodolists(todolists.map(m=> todolistID===m.id ? {...m,title:title} :m ));
  } //функция которая редактирует  title в тодолистах

    //функция удаления тудулистов
    const removeTodolist = (todolistID: string) => {

        setTodolists(todolists.filter(f => f.id !== todolistID))
        const copyTask = {...tasks}
        delete copyTask[todolistID]
        setTasks(copyTask);
    }
    const addTodolist = (titleTodolist:string) => {
      const newTodolistID = v1() ;
      setTodolists([...todolists,{id:newTodolistID,title:titleTodolist,filter:'All'}]);
      setTasks({...tasks,[newTodolistID]:[]});//для нашего тудулиста должны создать массив для хранения тасок=
        // изменяем стейт с тасками =создадим новое свой ство:пустой массив где будем храниить таски нашего тудулиста.
    }


    const getTasksForRender = (filter: filterType, tasks: Array<TaskType>) => {
        switch (filter) {
            case 'Completed':
                return tasks.filter(f => f.isDone)
            case  'Active':
                return tasks.filter(f => !f.isDone);
            default:
                return tasks;
        }
    }



    const todolistsComp = todolists.map(m => {
        // if (m.filter === 'Active') {
        //     tasks = tasks.filter(f => f.isDone);
        // }
        //
        // if (m.filter === 'Completed') {
        //     tasks = tasks.filter(f => !f.isDone);
        // }
        return (

            <TodoList
                key={m.id}
                todolistID={m.id} //если красная надо типизировать v todolist.tsx
                title={m.title}
                tasks={getTasksForRender(m.filter, tasks[m.id])}
                removeTask={removeTask} //перебрасываем в тудулист функция удаления
                setFilter={filteredTask} //передаем функцию и не забываем типизаровать в тудулисте
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
                filter={m.filter} //для навешивания css классов кнопкам
                filteredTasks={filteredTask}
                removeTodolist={removeTodolist}
                apdateTaskTitle={apdateTaskTitle}
                titleTodolist={titleTodolist}
            />

        )
    })


    return (
        <>
            {/*//компонента с инпут и кнопкой:*/}
            {/*инпут и кнопка:*/}
           <AddItemForm  addItem={addTodolist}/>

            <div className="App">

                {todolistsComp}

            </div>
        </>
    );
}


export default App;
