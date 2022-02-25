

//это тренировочный редьюссер:

type StateType = {    //Создадим там внутри просто редьюсер, который меняет возраст и кол-во детей у объекта:
    age: number
    childrenCount: number
    name: string
}
type ActionType = {
    type: string
    [key: string]: any
}
export const userReducer = (state: StateType, action: ActionType) => {
    switch (action.type) {
        case 'INCREMENT-AGE':{
            let newState={...state};
            newState.age = state.age + 1;
            return newState;
        }


        case 'INCREMENT-CHILDREN-COUNT':
            state.childrenCount = state.childrenCount + 1;
            return state;

        case 'RENAME':{
            let newState={...state};
            newState.name= 'Victor';
            return newState;
        }
        default:
            throw new Error("I don't understand this type")
    }
}

//////////////
export const incrementChildrenAC=()=>{
    return{
        type: 'INCREMENT-CHILDREN-COUNT'
    }
}


