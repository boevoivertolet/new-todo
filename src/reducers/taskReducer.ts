import { TasksType } from '../App'
import { v1 } from 'uuid'
import { addTodolistAC, removeTodolistAC } from './todolistsReducer'

const InitialState: TasksType = {}

export const tasksReducer = (
	state: TasksType = InitialState,
	action: TasksActionType
) => {
	switch (action.type) {
		case 'tasks/remove': {
			return {
				...state,
				[action.payload.todolistId]: state[
					action.payload.todolistId
				].filter((t) => t.id !== action.payload.id)
			}
		}
		case 'todolists/remove_todolist': {
			return {
				...state,
				[action.payload.todolistId]: []
			}
		}
		case 'tasks/add': {
			return {
				...state,
				[action.payload.todolistId]: [
					{
						id: v1(),
						title: action.payload.title,
						isDone: false
					},
					...state[action.payload.todolistId]
				]
			}
		}
		case 'tasks/change_status': {
			return {
				...state,
				[action.payload.todolistId]: state[action.payload.todolistId].map(
					(el) =>
						el.id === action.payload.id
							? {
									...el,
									isDone: action.payload.isDone
							  }
							: el
				)
			}
		}
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

export type TasksActionType =
	| ReturnType<typeof removeAC>
	| ReturnType<typeof addAC>
	| ReturnType<typeof changeStatusAC>
	| ReturnType<typeof addTodolistAC>
	| ReturnType<typeof changeTaskTitleAC>
	| ReturnType<typeof removeTodolistAC>
