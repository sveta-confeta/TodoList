import {addSalary} from "./tasks";

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