import { tasksActions, tasksReducer, TasksStateType } from 'features/taskReducer';
import { todolistActions } from 'features/todolistsReducer';

let startState: TasksStateType;
beforeEach(() => {
    startState = {
        todolistId1: [
            {
                id: '1',
                title: 'CSS',
                addedDate: '',
                completed: false,
                deadline: '',
                description: '',
                order: 0,
                priority: 0,
                startDate: '',
                status: 0,
                todoListId: '',
            },
            {
                id: '2',
                title: 'JS',
                addedDate: '',
                completed: false,
                deadline: '',
                description: '',
                order: 0,
                priority: 0,
                startDate: '',
                status: 0,
                todoListId: '',
            },
            {
                id: '3',
                title: 'React',
                addedDate: '',
                completed: false,
                deadline: '',
                description: '',
                order: 0,
                priority: 0,
                startDate: '',
                status: 0,
                todoListId: '',
            },
        ],
        todolistId2: [
            {
                id: '1',
                title: 'bread',
                addedDate: '',
                completed: false,
                deadline: '',
                description: '',
                order: 0,
                priority: 0,
                startDate: '',
                status: 0,
                todoListId: '',
            },
            {
                id: '2',
                title: 'milk',
                addedDate: '',
                completed: false,
                deadline: '',
                description: '',
                order: 0,
                priority: 0,
                startDate: '',
                status: 0,
                todoListId: '',
            },
            {
                id: '3',
                title: 'tea',
                addedDate: '',
                completed: false,
                deadline: '',
                description: '',
                order: 0,
                priority: 0,
                startDate: '',
                status: 0,
                todoListId: '',
            },
        ],
    };
});

test('correct task should be deleted from correct array', () => {
    const action = tasksActions.removeTask({ todolistId: 'todolistId2', taskId: '2' });

    const endState = tasksReducer(startState, action);

    expect(endState).toEqual({
        todolistId1: [
            { id: '1', title: 'CSS', isDone: false },
            { id: '2', title: 'JS', isDone: true },
            { id: '3', title: 'React', isDone: false },
        ],
        todolistId2: [
            { id: '1', title: 'bread', isDone: false },
            { id: '3', title: 'tea', isDone: false },
        ],
    });
});
// test('correct task should be added to correct array', () => {
// 	const action = addAC('todolistId2', 'juce')

// 	const endState = tasksReducer(startState, action)

// 	expect(endState['todolistId1'].length).toBe(3)
// 	expect(endState['todolistId2'].length).toBe(4)
// 	expect(endState['todolistId2'][0].id).toBeDefined()
// 	expect(endState['todolistId2'][0].title).toBe('juce')
// 	expect(endState['todolistId2'][0].isDone).toBe(false)
// })
// test('status of specified task should be changed', () => {
// 	const action = changeStatusAC('todolistId2', '2', false)

// 	const endState = tasksReducer(startState, action)

// 	expect(endState['todolistId2'][1].isDone).toBe(false)
// 	expect(endState['todolistId1'][1].isDone).toBe(true)
// })
// test('title of specified task should be changed', () => {
// 	const action = changeTaskTitleAC('todolistId2', '2', 'new title')
//
// 	const endState = tasksReducer(startState, action)
//
// 	expect(endState['todolistId2'][1].title).toBe('new title')
// 	expect(endState['todolistId1'][1].title).toBe('JS')
// })
// test('new array should be added when new todolist is added', () => {
// 	const action = addTodolistAC('new todolist')
//
// 	const endState = tasksReducer(startState, action)
//
// 	const keys = Object.keys(endState)
// 	const newKey = keys.find((k) => k != 'todolistId1' && k != 'todolistId2')
// 	if (!newKey) {
// 		throw Error('new key should be added')
// 	}
//
// 	expect(keys.length).toBe(3)
// 	expect(endState[newKey]).toEqual([])
// })
test('property with todolistId should be deleted', () => {
    const action = todolistActions.removeTodolist({ todolistId: 'todolistId2' });

    const endState = tasksReducer(startState, action);

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState['todolistId2']).not.toBeDefined();
});
