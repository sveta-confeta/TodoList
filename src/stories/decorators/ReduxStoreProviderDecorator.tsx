import {Provider} from "react-redux";
import {AppRootStateType, store} from "../../state/store";
import React from "react";
import {TasksReducer} from "../../reducer/TasksReducer";
import {todolistsReducer} from "../../state/todolists-reducer";
import {combineReducers, createStore} from "redux";
import {v1} from "uuid"; //мы будем провайдером оборачивать много компонет поэтому мы создает отдельно и создадим свой собственный хок
//который оборачивает компоненту и возращает ее с новым функционалом


//Глядите, выше мы заюзали наш рабочий store для примера в Storybook-e. Пустой state у нас.. так себе для демонстрации вариант.
//Давайте для сторибука при создании заполним стор какими-то данными.

const rootReducer = combineReducers({
    tasks: TasksReducer,
    todolists: todolistsReducer
})

const initialGlobalState = {
    todolists: [    //стартовый стейт для сторибук
        {id: "todolistId1", title: "What to learn", filter: "all"},
        {id: "todolistId2", title: "What to buy", filter: "all"}
    ] ,
    tasks: {
        ["todolistId1"]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true}
        ],
        ["todolistId2"]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType); //storyBookStore-отправляем в провайдер


export const ReduxStoreProviderDecorator=(storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}