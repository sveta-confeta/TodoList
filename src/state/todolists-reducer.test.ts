import {
    todolistsReducer
} from './todolists-reducer';
import {v1} from 'uuid';
import {filterType, TodolistsType} from '../App';

import {RemoveTodolistAC, ChangeTodolistFilterAC, AddTodolistAC, ChangeTodolistAC} from './todolists-reducer'

let todolistId1: string; //вынесем переменные глобально.чтоб их видели тесты
let todolistId2: string;
let startState: Array<TodolistsType>;
///////// вынесем наши стартовые данные  наверх.они одинаковые для каждого теста
beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();
    startState = [
        {id: todolistId1, title: "What to learn", filter: "All"},
        {id: todolistId2, title: "What to buy", filter: "All"}
    ]
});

test('correct todolist should be removed', () => {


    const endState = todolistsReducer(startState, RemoveTodolistAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

//2 test

test('correct todolist should be added', () => {

    let newTodolistTitle = "New Todolist";


    const endState = todolistsReducer(startState, AddTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3); //после добавления нового тудулиста всего их станет 3
    expect(endState[2].title).toBe(newTodolistTitle);// у последнего тудулиста будет имя которое сидит в переменной
});

//3
test('correct todolist should change its name', () => {

    let newTodolistTitle = "New Todolist";

    const endState = todolistsReducer(startState, ChangeTodolistAC(newTodolistTitle, todolistId2));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

//4 tests (для работы с фильтрами)
test('correct filter of todolist should be changed', () => {

    let newFilter: filterType = 'Completed';


    const endState = todolistsReducer(startState, ChangeTodolistFilterAC(todolistId2, newFilter));

    expect(endState[0].filter).toBe("All");
    expect(endState[1].filter).toBe(newFilter);
});



