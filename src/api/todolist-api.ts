import axios from 'axios'
import { instance } from './instance'

// const settings = {
// 	withCredentials: true,
// 	headers: {
// 		'API-KEY': 'b9a47b16-0cbb-4fe2-8152-303706b5e3c1' as const
// 	}
// }

export const todolistAPI = {
	updateTodolist(todolistId: string, title: string) {
		const promise = instance.put<UpdateTodolistResponseType>(
			`todo-lists/${todolistId}`,
			{ title: title }
		)
		return promise
	},
	getTodolists() {
		const promise = instance.get<Array<TodolistType>>('todo-lists')
		return promise
	},
	createTodolists(title: string) {
		const promise = instance.post<CreateTodolistResponseType>('todo-lists', {
			title
		})
		return promise
	},
	deleteTodolist(todolistId: string) {
		const promise = instance.delete<DeleteTodolistResponseType>(
			`todo-lists/${todolistId}`
		)
		return promise
	}
}
type TodolistType = {
	id: string
	addedDate: string
	order: number
	title: string
}
type CreateTodolistResponseType = {
	resultCode: number
	messages: Array<string>
	fieldsErrors: Array<string>
	data: {
		item: TodolistType
	}
}
type UpdateTodolistResponseType = {
	resultCode: number
	messages: Array<string>
	fieldsErrors: Array<string>
	data: {}
}
type DeleteTodolistResponseType = {
	resultCode: number
	messages: Array<string>
	fieldsErrors: Array<string>
	data: {}
}
