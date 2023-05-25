import axios from 'axios'

const settings = {
	withCredentials: true,
	headers: {
		'API-KEY': 'b9a47b16-0cbb-4fe2-8152-303706b5e3c1' as const
	}
}

export const todolistAPI = {
	updateTodolist(todolistId: string, title: string) {
		const promise = axios.put(
			`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`,
			{ title: title },
			settings
		)
		return promise
	},
	getTodolists() {
		const promise = axios.get(
			'https://social-network.samuraijs.com/api/1.1/todo-lists',
			settings
		)
		return promise
	},
	createTodolists(title: string) {
		const promise = axios.post(
			'https://social-network.samuraijs.com/api/1.1/todo-lists',
			{ title },
			settings
		)
		return promise
	},
	deleteTodolist(todolistId: string) {
		const promise = axios.delete(
			`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`,
			settings
		)
		return promise
	}
}
