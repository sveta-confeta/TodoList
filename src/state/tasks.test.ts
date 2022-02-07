import {
    addSalary,
    AddSalaryActionType,
    divSalary, DivSalaryActionType,
    fallSalary,
    FallSalaryActionType,
    multiplaySalary, MultiplaySalaryActionType,
    salaryReducer
} from "./tasks";

test('addSalary',()=>{
    //1.test data
    const salary:number=700;
     const bonus:number=250;
     //2.Выполнение тестируемого кода action
    const result=addSalary(salary,bonus);
    //3 проверка ожидаемого результата
    expect(result).toBe(950);
    //звпуск теста например yarn test
})
test('fallSalary',()=>{
    //1.test data
    const salary:number=700;
    const minus:number=250;
    //2.Выполнение тестируемого кода action
    const result=fallSalary(salary,minus);
    //3 проверка ожидаемого результата
    expect(result).toBe(450);
    //звпуск теста например yarn test
})
test('multiplaySalary',()=>{
    //1.test data
    const salary:number=700;
    const coefficient:number=2;
    //2.Выполнение тестируемого кода action
    const result=multiplaySalary(salary,coefficient);
    //3 проверка ожидаемого результата
    expect(result).toBe(1400);
    //звпуск теста например yarn test
})
test('divSalary',()=>{
    //1.test data
    const salary:number=700;
    const coefficient:number=2;
    //2.Выполнение тестируемого кода action
    const result=divSalary(salary,coefficient);
    //3 проверка ожидаемого результата
    expect(result).toBe(350);
    //звпуск теста например yarn test
})

//test-reducer:

test('case Add-SALARY of salaryReducer',()=>{
    //1.test data
    const salary:number=700;
    const xxx: AddSalaryActionType={ //можно вместо ххх-action
        type:'ADD-SALARY',
        payload:{
            bonus:300
        }

    }
    //3 проверка ожидаемого результата
    expect(salaryReducer(salary,xxx)).toBe(1000);
    //звпуск теста например yarn test
})

//2.
test('case FALL-SALARY of salaryReducer',()=>{
    //1.test data
    const salary:number=700;
    const xxx: FallSalaryActionType={ //можно вместо ххх-action
        type:'FALL-SALARY',
        payload:{
            minus:300
        }

    }
    //3 проверка ожидаемого результата
    expect(salaryReducer(salary,xxx)).toBe(400);
    //звпуск теста например yarn test
})

//3
test('case MULTIPLAY-SALARY of salaryReducer',()=>{
    //1.test data
    const salary:number=700;
    const xxx: MultiplaySalaryActionType={ //можно вместо ххх-action
        type:'MULTIPLAY-SALARY',
        payload:{
            coefficient:2
        }

    }
    //3 проверка ожидаемого результата
    expect(salaryReducer(salary,xxx)).toBe(1400);
    //звпуск теста например yarn test
})

//4
test('case Div-SALARY of salaryReducer',()=>{
    //1.test data
    const salary:number=800;
    const xxx: DivSalaryActionType={ //можно вместо ххх-action
        type:'DIV-SALARY',
        payload:{
            coefficient:2
        }

    }
    //3 проверка ожидаемого результата
    expect(salaryReducer(salary,xxx)).toBe(400);
    //звпуск теста например yarn test
})