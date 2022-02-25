
import {incrementChildrenAC, userReducer} from './user-reducer';

test('user reducer should increment only age', () => {
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
    const endState = userReducer(startState, incrementChildrenAC())

    expect(endState.age).toBe(20);
    expect(endState.childrenCount).toBe(3);
});

test('rename', () => {
    const startState = { age: 20, childrenCount: 2, name: 'Dimych' };
    // your code here
    const endState = userReducer(startState, {type:'RENAME'})

    expect(endState.name).toBe('Victor');
    expect(endState.childrenCount).toBe(2);
});

