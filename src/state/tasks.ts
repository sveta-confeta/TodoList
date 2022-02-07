export const addSalary = (salary: number, bonus: number) => {
    return salary + bonus
}
export const fallSalary = (salary: number, minus: number) => {
    return salary - minus;
}
export const multiplaySalary = (salary: number, coefficient: number) => {
    return salary * coefficient;
}
export const divSalary = (salary: number, coefficient: number) => {
    return salary / coefficient;
}

//создадим одну функцию для всех функций решающих одну задачу
//1. в параметрах у них есть одна и та же сущность-salary. У нас это state.

export type AddSalaryActionType = {
    type: 'ADD-SALARY'
    payload: {
        bonus: number
    }
}
export type FallSalaryActionType = {
    type: 'FALL-SALARY'
    payload: {
        minus: number
    }
}
export type MultiplaySalaryActionType = {
    type: 'MULTIPLAY-SALARY'
    payload: {
        coefficient: number
    }
}
export type DivSalaryActionType = {
    type: 'DIV-SALARY'
    payload: {
        coefficient: number
    }
}


type ActionType = AddSalaryActionType | FallSalaryActionType | MultiplaySalaryActionType | DivSalaryActionType


export const salaryReducer = (salary: number, action: ActionType) => {
    switch (action.type) {
        case 'ADD-SALARY':
            return salary + action.payload.bonus;
        case 'FALL-SALARY':
            return salary - action.payload.minus;
        case  'MULTIPLAY-SALARY':
            return salary * action.payload.coefficient;
        case 'DIV-SALARY':
            return salary/action.payload.coefficient;
        default:
            return salary;
    }
}