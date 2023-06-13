import { AxiosResponse } from 'axios'
import { instance } from './instance'

export const taskAPI = {
	updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
		const promise = instance.put<
			ResponseType<{ item: TaskType }>,
			AxiosResponse<ResponseType<{ item: TaskType }>>,
			UpdateTaskModelType
		>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
		return promise
	},
	getTasks(todolistId: string) {
		const promise = instance.get<GetTasksResponseType>(
			`todo-lists/${todolistId}/tasks`
		)
		return promise
	},
	createTask(todolistId: string, title: string) {
		// const promise = instance.post<TasksResponseType<{ item: TaskType }>,AxiosResponse<{item: TaskType}>, {title: string}>(
		const promise = instance.post<ResponseType<{ item: TaskType }>>(
			`todo-lists/${todolistId}/tasks`,
			{
				title
			}
		)
		return promise
	},
	deleteTasks(todolistId: string, taskId: string) {
		const promise = instance.delete<ResponseType>(
			`/todo-lists/${todolistId}/tasks/${taskId}`
		)
		return promise
	}
}

export type TaskDomainType = TaskType & { isDone: boolean }

export type TaskType = {
	description: string
	title: string
	completed: boolean
	status: number
	priority: number
	startDate: string
	deadline: string
	id: string
	todoListId: string
	order: number
	addedDate: string
}

export type UpdateTaskModelType = {
	title: string
	description: string
	status: TaskStatuses
	priority: TaskPriorities
	startDate: string
	deadline: string
}
export enum TaskStatuses {
	New = 0,
	InProgress = 1,
	Completed = 2,
	Draft = 3
}

export enum TaskPriorities {
	Low = 0,
	Middle = 1,
	Hi = 2,
	Urgently = 3,
	Later = 4
}
type GetTasksResponseType = {
	items: Array<TaskType>
	totalCount: number
	error: string
}
type TasksResponseType<D = {}> = {
	resultCode: number
	messages: Array<string>
	data: D
}

export type ResponseType<D={}> = {
	resultCode: number
	messages: Array<string>
	fieldsErrors: Array<string>
	data: D
}
