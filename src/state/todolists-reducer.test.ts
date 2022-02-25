import {
    todolistsReducer
} from './todolists-reducer';
import {v1} from 'uuid';
import {filterType, TodolistsType} from '../App';

import {RemoveTodolistAC,ChangeTodolistFilterAC,AddTodolistAC,ChangeTodolistAC} from './todolists-reducer'

test('correct todolist should be removed', () => {

    //данные для теста
    let todolistId1:string = v1();
    let todolistId2:string = v1();

    const startState: Array<TodolistsType> = [
        {id: todolistId1, title: "What to learn", filter: "All"},
        {id: todolistId2, title: "What to buy", filter: "All"}
    ]

    const endState = todolistsReducer(startState, RemoveTodolistAC( todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

//2 test

test('correct todolist should be added', () => {
    let todolistId1:string = v1();
    let todolistId2:string = v1();

    let newTodolistTitle = "New Todolist";

    const startState: Array<TodolistsType> = [
        {id: todolistId1, title: "What to learn", filter: "All"},
        {id: todolistId2, title: "What to buy", filter: "All"}
    ]

    const endState = todolistsReducer(startState, AddTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3); //после добавления нового тудулиста всего их станет 3
    expect(endState[2].title).toBe(newTodolistTitle);// у последнего тудулиста будет имя которое сидит в переменной
});

//3
test('correct todolist should change its name', () => {
    let todolistId1:string = v1();
    let todolistId2:string = v1();

    let newTodolistTitle = "New Todolist";

    const startState: Array<TodolistsType> = [
        {id: todolistId1, title: "What to learn", filter: "All"},
        {id: todolistId2, title: "What to buy", filter: "All"}
    ]


    const endState = todolistsReducer(startState, ChangeTodolistAC(newTodolistTitle,todolistId2));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

//4 tests (для работы с фильтрами)
test('correct filter of todolist should be changed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newFilter:filterType =  'Completed';

    const startState: Array<TodolistsType> = [
        {id: todolistId1, title: "What to learn", filter: "All"},
        {id: todolistId2, title: "What to buy", filter: "All"}
    ]


    const endState = todolistsReducer(startState, ChangeTodolistFilterAC(todolistId2,newFilter));

    expect(endState[0].filter).toBe("All");
    expect(endState[1].filter).toBe(newFilter);
});



