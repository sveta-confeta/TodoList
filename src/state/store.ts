
import {TasksReducer} from './../reducer/TasksReducer';
import {todolistsReducer} from './todolists-reducer';
import {combineReducers, createStore} from 'redux';

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния state in store
const rootReducer = combineReducers({
    tasks: TasksReducer,
    todolists: todolistsReducer
})
// непосредственно создаём store
export const store = createStore(rootReducer);
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>//тип нашего стейта в сторе
// используется для useSelector

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store; //позволяет в консоли обратится к стору,посмотреть....

// {
//     state:{
//         tasks:{},
//         todolist:{}
//     },                     такой обьект родится после вызова функции createStore
//      getState(),
//      dispatch(),
//      subscribe()
// }