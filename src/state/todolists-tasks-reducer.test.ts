import {TasksType} from "../TodoList";
import {TasksReducer} from "../reducer/TasksReducer";
import {AddTodolistAC, todolistsReducer} from "./todolists-reducer";
import {TodolistsType} from "../App";


//это тест на то что id нового тудулиста равна id новой таски
test('ids should be equals', () => {
    const startTasksState: TasksType = {};
    const startTodolistsState: Array<TodolistsType> = [];

    const action:any = AddTodolistAC("new todolist");

    const endTasksState = TasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.todolistId);
    expect(idFromTodolists).toBe(action.todolistId);
});
