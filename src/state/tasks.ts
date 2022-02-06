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


type ActionType = AddSalaryActionType


export const salaryReducer = (salary: number, action: ActionType) => {
    switch (action.type) {
        case 'ADD-SALARY':
            return salary + action.payload.bonus;
        default:
            return salary;
    }
}