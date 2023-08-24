import { TasksStateType, tasksReducer } from 'features/taskReducer';
import { TodolistDomainType, addTodolistAC, todolistsReducer } from 'features/todolistsReducer';

test('ids should be equals', () => {
	const startTasksState: TasksStateType = {};
	const startTodolistsState: Array<TodolistDomainType> = [];

	const action = addTodolistAC({ id: '1', addedDate: '1', order: 1, title: 'new todolist' });

	const endTasksState = tasksReducer(startTasksState, action);
	const endTodolistsState = todolistsReducer(startTodolistsState, action);

	const keys = Object.keys(endTasksState);
	const idFromTasks = keys[0];
	const idFromTodolists = endTodolistsState[0].id;
});
