import {AddTaskAC, ApdateTaskTitleTaskAC, ChangeTaskStatusAC, RemoveTaskAC, TasksReducer} from "./TasksReducer";
import {TasksType, } from "../TodoList";
import {AddTodolistAC} from "../state/todolists-reducer";

test('correct task should be deleted from correct array', () => {

    const startState: TasksType = {
        "todolistId1": [
            {id: "1", title: "CSS", isDone: false},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false}
        ],
        "todolistId2": [
            {id: "1", title: "bread", isDone: false},
            {id: "2", title: "milk", isDone: true},
            {id: "3", title: "tea", isDone: false}
        ]
    };
    const action = RemoveTaskAC("2", "todolistId2");

    const endState = TasksReducer(startState, action)

    expect(endState).toEqual([
            {id: "1", title: "bread", isDone: false},
            {id: "3", title: "tea", isDone: false}
        ]
    );
});


test('correct task should be added to correct array', () => {
    const startState: TasksType = {
        "todolistId1": [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false }
        ],
        "todolistId2": [
            { id: "1", title: "bread", isDone: false },
            { id: "2", title: "milk", isDone: true },
            { id: "3", title: "tea", isDone: false }
        ]
    };

    const action = AddTaskAC("juce", "todolistId2");

    const endState: any = TasksReducer(startState, action)

    console.log(endState)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined(); //v1()
    expect(endState["todolistId2"][0].title).toBe("juce");
    expect(endState["todolistId2"][0].isDone).toBe(true);
})
test('status of specified task should be changed', () => {
    const startState: TasksType = {
        "todolistId1": [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false }
        ],
        "todolistId2": [
            { id: "1", title: "bread", isDone: false },
            { id: "2", title: "milk", isDone: true },
            { id: "3", title: "tea", isDone: false }
        ]
    };

    const action = ApdateTaskTitleTaskAC ("todolistId2", '1','dodosia');

    const endState:any = TasksReducer(startState, action)

    expect(endState["todolistId2"][1].title).toBe('milk');
    expect(endState["todolistId2"][0].title).toBe('dodosia');

});



test('status of specified task should be changed', () => {
    const startState: TasksType = {
        "todolistId1": [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false }
        ],
        "todolistId2": [
            { id: "1", title: "bread", isDone: false },
            { id: "2", title: "milk", isDone: true },
            { id: "3", title: "tea", isDone: false }
        ]
    };

    const action = ChangeTaskStatusAC("2", false, "todolistId2");

    const endState:any = TasksReducer(startState, action)

    expect(endState["todolistId2"][1].title).toBe('milk');
    expect(endState["todolistId2"][1].isDone).toBe(false);

});

//тест на добавление нового тудулиста:

test('new array should be added when new todolist is added', () => {
    const startState: TasksType = {
        "todolistId1": [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false }
        ],
        "todolistId2": [
            { id: "1", title: "bread", isDone: false },
            { id: "2", title: "milk", isDone: true },
            { id: "3", title: "tea", isDone: false }
        ]
    };

    const action = AddTodolistAC("new todolist");

    const endState:any = TasksReducer(startState, action)
    //при добавлении нового тудулиста  у нас в таксках должени появится новое свойство: ключ с айди и пустой массив для будущих тасок

    const keys = Object.keys(endState); //записываем v keys обьект с ключами (должно быть 3)
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2"); //записываем в массив перебор этих ключей
    //  в newKey попадет тот ключ, который не является ни  "todolistId1" ,ни "todolistId2"
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);//в новом ключе есть свойство пустой массив для тасок
});












