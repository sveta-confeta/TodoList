import {
    ActionType, ChangeTodolistAC,
    ChangeTodolistAcType,
    RemoveTodolistAC,
    todolistsReducer
} from './todolists-reducer';
import {v1} from 'uuid';
import {TodolistsType} from '../App';

test('correct todolist should be removed', () => {

    //данные для теста
    let todolistId1:string = v1();
    let todolistId2:string = v1();

    const startState: Array<TodolistsType> = [
        {id: todolistId1, title: "What to learn", filter: "All"},
        {id: todolistId2, title: "What to buy", filter: "All"}
    ]

    const endState = todolistsReducer(startState, { type: 'REMOVE-TODOLIST', id: todolistId1})

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

    const endState = todolistsReducer(startState, RemoveTodolistAC(todolistId1))

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
    const action:ChangeTodolistAcType = ChangeTodolistAC(todolistId2,newTodolistTitle);



    const endState = todolistsReducer(startState, ChangeTodolistAC(newTodolistTitle,todolistId2));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});


