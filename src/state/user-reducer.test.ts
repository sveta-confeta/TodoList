
import {userReducer} from './user-reducer';

test.skip('user reducer should increment only age', () => {
    //начальные данные:
    const startState = { age: 20, childrenCount: 2, name: 'Dimych' };

    //endState-что должны получить

    const endState = userReducer(startState, { type: 'INCREMENT-AGE' })

    expect(endState.age).toBe(21);
    expect(endState.childrenCount).toBe(2);
});

test('user reducer should increment only childrenCount', () => {
    const startState = { age: 20, childrenCount: 2, name: 'Dimych' };
    // your code here
    const endState = userReducer(startState, { type:'INCREMENT-CHILDREN-COUNT' })

    expect(endState.age).toBe(20);
    expect(endState.childrenCount).toBe(3);
});

