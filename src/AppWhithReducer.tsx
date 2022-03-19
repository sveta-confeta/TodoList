import React, {useCallback, useReducer} from 'react';
import './App.css';
import {TasksType, TodoList} from "./TodoList";
import {v1} from "uuid";
import {TaskType} from "./TodoList";
import {AddItemForm} from "./components/AddItemForm";
import ButtonAppBar from "./components/ButtonAppBar";
import {Container, Grid, Paper} from "@mui/material";
import {AddTaskAC, ApdateTaskTitleTaskAC, ChangeTaskStatusAC, RemoveTaskAC, TasksReducer} from "./reducer/TasksReducer";
import {
    AddTodolistAC,
    ChangeTodolistAC,
    ChangeTodolistFilterAC,
    RemoveTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";

export type filterType = 'All' | 'Active' | 'Completed' //типизация фильтра для кнопок
export type TodolistsType = {
    id: string,
    title: string,
    filter: filterType;
}

export function AppWhithReducer() {

    const todolistID_1 = v1();
    const todolistID_2 = v1();
    let [todolists,dispatchTodolists] = useReducer(todolistsReducer, [
        {id: todolistID_1, title: 'What to Learn', filter: 'All'},
        {id: todolistID_2, title: 'What to read', filter: 'All'},]);


    let [tasks, dispatchTasks] = useReducer(TasksReducer,{   //чтоб происходила перерисовка видоизмененных данных
        [todolistID_1]: [{id: v1(), title: 'НTML', isDone: true},
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
    const addTask = useCallback((title: string, todolistID: string) => {
       // let todolistID=v1();
       // const copyTasks = {...tasks};
       // copyTasks[todolistID] = [{id: v1(), title: title, isDone: true}, ...tasks[todolistID]]
        dispatchTasks(AddTaskAC(title,todolistID));
    },[dispatchTasks,AddTaskAC])

    // функция для кнопки удаления
    const removeTask = useCallback ((taskID: string, todolistID: string) => { //вся логика в редьюсере
        // const copyTasks = {...tasks};
        // copyTasks[todolistID] = copyTasks[todolistID].filter(f => f.id !== taskID)
        // setTasks(copyTasks) //функция удаления которая будет привязана к кнопке и ее надо через
        // //пропс поместить в туду лист
        dispatchTasks(RemoveTaskAC(taskID,todolistID))},[])
    const changeTaskStatus =useCallback  ((taskID: string, newIsDoneValue: boolean, todolistID: string) => {
        // const copyTasks = {...tasks};
        // copyTasks[todolistID] = tasks[todolistID].map(t => t.id === taskID ? {...t, isDone: newIsDoneValue} : t);
        // setTasks(copyTasks);
        dispatchTasks(ChangeTaskStatusAC(taskID,newIsDoneValue,todolistID))},[])  // функция управления чекбоксом вкл и выкл


    //функция фильтрации кнопок: принимает значение value от кнопок
    const filteredTask = useCallback ((todolistID: string, value: filterType) => {  //принимаем от кнопки value (например'all')
       // setTodolists(todolists.map(m => todolistID === m.id ? {...m, filter: value} : m));
        dispatchTodolists(ChangeTodolistFilterAC(todolistID,value))},[])

    const apdateTaskTitle = useCallback ((todolistID: string, taskID: string, title: string) => {
        //const copyTasks = {...tasks};
       // copyTasks[todolistID] = tasks[todolistID].map(t => t.id === taskID ? {...t, title: title} : t);
        //setTasks(copyTasks);  //функция которая редактирует title в тасках
        dispatchTasks(ApdateTaskTitleTaskAC(todolistID,taskID,title))},[dispatchTasks,ApdateTaskTitleTaskAC])

    const titleTodolist =useCallback ((todolistID: string, title: string) => {
        //setTodolists(todolists.map(m => todolistID === m.id ? {...m, title: title} : m));
        dispatchTodolists(ChangeTodolistAC(todolistID,title))},[]) //функция которая редактирует  title в тодолистах

    //функция удаления тудулистов
    const removeTodolist =useCallback( (todolistID: string) => {
        dispatchTodolists(RemoveTodolistAC(todolistID))},[])
        // dispatchTasks(RemoveTodolistAC(todolistID))

        // setTodolists(todolists.filter(f => f.id !== todolistID))
        // const copyTask = {...tasks}
        // delete copyTask[todolistID]
        // setTasks(copyTask);

    const addTodolist =useCallback(  (titleTodolist: string) => {
       //  const newTodolistID = v1();
       // // setTodolists([...todolists, {id: newTodolistID, title: titleTodolist, filter: 'All'}]);
       //  dispatchTodolists(AddTodolistAC(titleTodolist,newTodolistID))
        //setTasks({...tasks, [newTodolistID]: []});//для нашего тудулиста должны создать массив для хранения тасок=
        // изменяем стейт с тасками =создадим новое свой ство:пустой массив где будем храниить таски нашего тудулиста.
        let action=AddTodolistAC(titleTodolist)
        dispatchTasks(action)
        dispatchTodolists( action);
    },[dispatchTodolists,AddTodolistAC]);




    const todolistsComp = todolists.map(m => {
        return <Grid item>
            <Paper elevation={3} style={{padding: "10px"}}>
                <TodoList
                    key={m.id}
                    todolistID={m.id} //если красная надо типизировать v todolist.tsx
                    title={m.title}
                    tasks={tasks[m.id]}
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
            </Paper>
        </Grid>
    })


    return (
        <>
            {/*это хэдер -создается новый компонент и туда копируется содержимое из документа AppBar из материал:*/}
            <ButtonAppBar/>
            {/*это фишка из материал юай:*/}
            <Container fixed>
                {/*это фишка из материал юай:*/}
                <Grid container style={{padding:"20px"}}>
                    {/*инпут и кнопка:*/}
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    <div className="App">

                        {todolistsComp}
                    </div>
                </Grid>

            </Container>
        </>
    );
}



