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
		const promise = instance.put(`todo-lists/${todolistId}`, { title: title })
		return promise
	},
	getTodolists() {
		const promise = instance.get('todo-lists')
		return promise
	},
	createTodolists(title: string) {
		const promise = instance.post('todo-lists', { title })
		return promise
	},
	deleteTodolist(todolistId: string) {
		const promise = instance.delete(`todo-lists/${todolistId}`)
		return promise
	}
}
