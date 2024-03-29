import { v1 } from 'uuid';

import { todolistActions, TodolistDomainType, todolistsReducer } from 'features/todolistsReducer';
import { FilterType } from 'features/TodolistsList';

let todolistId1 = v1();
let todolistId2 = v1();
let startState: Array<TodolistDomainType>;

beforeEach(() => {
    startState = [
        {
            id: todolistId1,
            title: 'What to learn',
            filter: 'all',
            addedDate: '',
            order: 0,
            entityStatus: 'loading',
        },
        {
            id: todolistId2,
            title: 'What to  buy',
            filter: 'all',
            addedDate: '',
            order: 0,
            entityStatus: 'loading',
        },
    ];
});

test('correct todolist should be removed', () => {
    const endState = todolistsReducer(startState, todolistActions.removeTodolist({ todolistId: todolistId1 }));

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

// test('todolist should be added', () => {
// 	const endState = todolistsReducer(startState, addTodolistAC('title'))
//
// 	expect(endState.length).toBe(3)
// 	expect(endState[0].title).toBe('title')
// })

test('todolist title should be changed', () => {
    const endState = todolistsReducer(
        startState,
        todolistActions.changeTodolistTitle({ todolistId: todolistId1, title: 'new title' }),
    );

    expect(endState.length).toBe(2);
    expect(endState[0].title).toBe('new title');
});
test('todolist filter should be changed', () => {
    let action: ActionType = {
        type: 'todolists/change_filter',
        payload: { todolistId: todolistId1, filter: 'active' },
    };

    type ActionType = {
        type: 'todolists/change_filter';
        payload: {
            todolistId: string;
            filter: FilterType;
        };
    };

    const endState = todolistsReducer(startState, action);

    expect(startState[0].filter).toBe('all');
    expect(endState[0].filter).toBe('active');
});
