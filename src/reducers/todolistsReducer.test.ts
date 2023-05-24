import { FilterType } from './../App'
import { v1 } from 'uuid'
import { TodolistsType } from '../App'
import {
	addTodolistAC,
	changeTodolistTitleAC,
	removeTodolistAC,
	todolistReducer
} from './todolistsReducer'

let todolistId1 = v1()
let todolistId2 = v1()
let startState: Array<TodolistsType>

beforeEach(() => {
	startState = [
		{ id: todolistId1, title: 'What to learn', filter: 'all' },
		{ id: todolistId2, title: 'What to  buy', filter: 'all' }
	]
})

test('correct todolist should be removed', () => {
	const endState = todolistReducer(startState, removeTodolistAC(todolistId1))

	expect(endState.length).toBe(1)
	expect(endState[0].id).toBe(todolistId2)
})

test('todolist should be added', () => {
	const endState = todolistReducer(startState, addTodolistAC('title'))

	expect(endState.length).toBe(3)
	expect(endState[0].title).toBe('title')
})

test('todolist title should be changed', () => {
	const endState = todolistReducer(
		startState,
		changeTodolistTitleAC(todolistId1, 'new title')
	)

	expect(endState.length).toBe(2)
	expect(endState[0].title).toBe('new title')
})
test('todolist filter should be changed', () => {
	let action: ActionType = {
		type: 'todolists/change_filter',
		payload: { todolistId: todolistId1, filter: 'active' }
	}

	type ActionType = {
		type: 'todolists/change_filter'
		payload: {
			todolistId: string
			filter: FilterType
		}
	}

	const endState = todolistReducer(startState, action)

	expect(startState[0].filter).toBe('all')
	expect(endState[0].filter).toBe('active')
})
