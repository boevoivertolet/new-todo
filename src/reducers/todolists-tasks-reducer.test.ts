import { TasksType, TodolistsType } from '../App'
import { tasksReducer } from './taskReducer'
import { addTodolistAC, todolistReducer } from './todolistsReducer'

test('ids should be equals', () => {
	const startTasksState: TasksType = {}
	const startTodolistsState: Array<TodolistsType> = []

	const action = addTodolistAC('new todolist')

	const endTasksState = tasksReducer(startTasksState, action)
	const endTodolistsState = todolistReducer(startTodolistsState, action)

	const keys = Object.keys(endTasksState)
	const idFromTasks = keys[0]
	const idFromTodolists = endTodolistsState[0].id

	expect(idFromTasks).toBe(action.payload.todolistId)
	expect(idFromTodolists).toBe(action.payload.todolistId)
})
