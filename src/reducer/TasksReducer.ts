import {TasksType} from "../TodoList";


export const TasksReducer=(state:TasksType,action:SwitchType)=>{
    switch (action.type){
        case 'REMOVE-TASK':{
            let newState={...state};
             newState[action.payload.todolistID]=newState[action.payload.todolistID].filter(f=>f.id!==action.payload.taskID)
            return newState[action.payload.todolistID];
        }
        default:return state;
    }
}

type SwitchType=RemoveTaskACTYpe;

type RemoveTaskACTYpe=ReturnType<typeof RemoveTaskAC>

const RemoveTaskAC=(taskID: string, todolistID: string)=>{
    return{
        type:'REMOVE-TASK',
        payload:{
            taskID,
            todolistID
        }
    } as const
}