import { v1 } from 'uuid'
import { TodolistsType } from '../App'
import {
	addTodolistAC,
	removeTodolistAC,
	todolistReducer
} from './todolistsReducer'

test('correct todolist should be removed', () => {
	let todolistId1 = v1()
	let todolistId2 = v1()

	const startState: Array<TodolistsType> = [
		{ id: todolistId1, title: 'What to learn', filter: 'all' },
		{ id: todolistId2, title: 'What to  buy', filter: 'all' }
	]
	const endState = todolistReducer(startState, removeTodolistAC(todolistId1))

	expect(endState.length).toBe(1)
	expect(endState[0].id).toBe(todolistId2)
})

test('todolist should be added', () => {
	let todolistId1 = v1()
	let todolistId2 = v1()

	const startState: Array<TodolistsType> = [
		{ id: todolistId1, title: 'What to learn', filter: 'all' },
		{ id: todolistId2, title: 'What to  buy', filter: 'all' }
	]
	const endState = todolistReducer(startState, addTodolistAC('title'))

	expect(endState.length).toBe(3)
	expect(endState[0].title).toBe('title')
})
