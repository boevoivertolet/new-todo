import axios from 'axios'
import { instance } from './instance'

export const taskAPI = {
	updateTask(taskId: string, title: string) {
		const promise = instance.put(`tasks/${taskId}`, {
			title: title
		})
		return promise
	},
	getTasks() {
		const promise = instance.get('tasks')
		return promise
	},
	createTasks(title: string) {
		const promise = instance.post('tasks', {
			title
		})
		return promise
	},
	deleteTasks(taskId: string) {
		const promise = instance.delete(`tasks/${taskId}`)
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
