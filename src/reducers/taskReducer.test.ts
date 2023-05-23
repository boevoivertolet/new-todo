import { TasksType, TodolistsType } from '../App'
import { tasksReducer } from './taskReducer'
import { addTodolistAC, removeTodolistAC } from './todolistsReducer'

test('new array should be added when new todolist is added', () => {
	const startState: TasksType = {
		todolistId1: [
			{ id: '1', title: 'CSS', isDone: false },
			{ id: '2', title: 'JS', isDone: true },
			{ id: '3', title: 'React', isDone: false }
		],
		todolistId2: [
			{ id: '1', title: 'bread', isDone: false },
			{ id: '2', title: 'milk', isDone: true },
			{ id: '3', title: 'tea', isDone: false }
		]
	}

	const action = addTodolistAC('new todolist')

	const endState = tasksReducer(startState, action)

	const keys = Object.keys(endState)
	const newKey = keys.find((k) => k != 'todolistId1' && k != 'todolistId2')
	if (!newKey) {
		throw Error('new key should be added')
	}

	expect(keys.length).toBe(3)
	expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () => {
	const startState: TasksType = {
		todolistId1: [
			{ id: '1', title: 'CSS', isDone: false },
			{ id: '2', title: 'JS', isDone: true },
			{ id: '3', title: 'React', isDone: false }
		],
		todolistId2: [
			{ id: '1', title: 'bread', isDone: false },
			{ id: '2', title: 'milk', isDone: true },
			{ id: '3', title: 'tea', isDone: false }
		]
	}

	const action = removeTodolistAC('todolistId2')

	const endState = tasksReducer(startState, action)

	const keys = Object.keys(endState)

	expect(keys.length).toBe(1)
	expect(endState['todolistId2']).not.toBeDefined()
})
