import { v1 } from 'uuid'
import {
	addTodolistAC,
	removeTodolistAC,
	setTodolistAC
} from './todolistsReducer'

import { Dispatch } from 'redux'
import {
	TaskPriorities,
	TaskStatuses,
	TaskType,
	taskAPI
} from '../api/task-api'

const InitialState: TasksStateType = {}

export const tasksReducer = (
	state: TasksStateType = InitialState,
	action: TasksActionType
): TasksStateType => {
	switch (action.type) {
		case 'todolists/set_todolists': {
			const stateCopy = { ...state }
			action.payload.todolists.forEach((tl) => {
				stateCopy[tl.id] = []
			})
			return stateCopy
		}
		case 'todolists/set_tasks': {
			const stateCopy = { ...state }
			stateCopy[action.payload.todolistId] = action.payload.tasks
			return stateCopy
		}
		case 'tasks/remove': {
			return {
				...state,
				[action.payload.todolistId]: state[
					action.payload.todolistId
				].filter((t) => t.id !== action.payload.id)
			}
		}
		case 'todolists/remove_todolist': {
			let copyState = { ...state }
			delete copyState[action.payload.todolistId]
			return copyState
		}
		case 'tasks/add': {
			const stateCopy = { ...state }
			const newTask: TaskType = {
				id: v1(),
				title: action.payload.title,
				status: TaskStatuses.New,
				todoListId: action.payload.todolistId,
				description: '',
				startDate: '',
				deadline: '',
				addedDate: '',
				order: 0,
				priority: TaskPriorities.Low,
				completed: false
			}
			const tasks = stateCopy[action.payload.todolistId]
			const newTasks = [newTask, ...tasks]
			stateCopy[action.payload.todolistId] = newTasks
			return stateCopy
		}
		// case 'tasks/change_status': {
		// 	return {
		// 		...state,
		// 		[action.payload.todolistId]: state[action.payload.todolistId].map(
		// 			(el) =>
		// 				el.id === action.payload.id
		// 					? {
		// 							...el,
		// 							isDone: action.payload.isDone
		// 					  }
		// 					: el
		// 		)
		// 	}
		// }
		case 'todolists/add_todolist': {
			return { ...state, [action.payload.todolistId]: [] }
		}
		case 'tasks/change_title': {
			return {
				...state,
				[action.payload.todolistId]: state[action.payload.todolistId].map(
					(el) =>
						el.id === action.payload.id
							? {
									...el,
									title: action.payload.title
							  }
							: el
				)
			}
		}
		default:
			return state
	}
}
// AC
export const setTasksAC = (todolistId: string, tasks: TaskType[]) => {
	return {
		type: 'todolists/set_tasks',
		payload: {
			todolistId,
			tasks
		}
	} as const
}

export const removeAC = (todolistId: string, id: string) => {
	return {
		type: 'tasks/remove',
		payload: {
			todolistId,
			id
		}
	} as const
}
export const addAC = (todolistId: string, title: string) => {
	return {
		type: 'tasks/add',
		payload: {
			todolistId,
			title
		}
	} as const
}
export const changeStatusAC = (
	todolistId: string,
	id: string,
	isDone: boolean
) => {
	return {
		type: 'tasks/change_status',
		payload: {
			todolistId,
			id,
			isDone
		}
	} as const
}
export const changeTaskTitleAC = (
	todolistId: string,
	id: string,
	title: string
) => {
	return {
		type: 'tasks/change_title',
		payload: {
			todolistId,
			id,
			title
		}
	} as const
}

//Thunk

export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
	taskAPI.getTasks(todolistId).then((res) => {
		const tasks = res.data.items
		dispatch(setTasksAC(todolistId, tasks))
	})
}
export const addTasksTC =
	(todolistId: string, title: string) => (dispatch: Dispatch) => {
		taskAPI.createTask(todolistId, title).then((res) => {
			const task = res.data.data.item
			dispatch(addAC(todolistId, task.title))
		})
	}
export const removeTasksTC =
	(todolistId: string, taskId: string) => (dispatch: Dispatch) => {
		taskAPI.deleteTasks(todolistId, taskId).then((res) => {
			dispatch(removeAC(todolistId, taskId))
		})
	}

export type TasksActionType =
	| ReturnType<typeof removeAC>
	| ReturnType<typeof addAC>
	| ReturnType<typeof changeStatusAC>
	| ReturnType<typeof addTodolistAC>
	| ReturnType<typeof changeTaskTitleAC>
	| ReturnType<typeof removeTodolistAC>
	| ReturnType<typeof setTodolistAC>
	| ReturnType<typeof setTasksAC>

export type TasksStateType = {
	[key: string]: Array<TaskType>
}
