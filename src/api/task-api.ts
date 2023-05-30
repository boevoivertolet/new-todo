import axios from 'axios'
import { instance } from './instance'

export const taskAPI = {
	updateTask(todolistId: string, taskId: string, title: string) {
		const promise = instance.put(
			`/todo-lists/${todolistId}/tasks/${taskId}`,
			{
				title: title
			}
		)
		return promise
	},
	getTasks(todolistId: string) {
		const promise = instance.get(`todo-lists/${todolistId}/tasks`)
		return promise
	},
	createTasks(todolistId: string, title: string) {
		const promise = instance.post(`todo-lists/${todolistId}/tasks`, {
			title
		})
		return promise
	},
	deleteTasks(todolistId: string, taskId: string) {
		const promise = instance.delete(
			`/todo-lists/${todolistId}/tasks/${taskId}`
		)
		return promise
	}
}
type TaskType = {}

export type ResponseType<D> = {
	resultCode: number
	messages: Array<string>
	fieldsErrors: Array<string>
	data: D
}
