import { FilterType } from '../App'
import { v1 } from 'uuid'
import { TodolistType, todolistAPI } from '../api/todolist-api'
import { Dispatch } from 'redux'

export let todolistID1 = v1()
export let todolistID2 = v1()

const InitialState: TodolistDomainType[] = []

export const todolistsReducer = (
	state: TodolistDomainType[] = InitialState,
	action: TodolistsActionType
): TodolistDomainType[] => {
	switch (action.type) {
		case 'todolists/set_todolists': {
			return action.payload.todolists.map((tl) => ({ ...tl, filter: 'all' }))
		}
		case 'todolists/change_filter': {
			return state.map((tdl) =>
				tdl.id === action.payload.todolistId
					? {
							...tdl,
							filter: action.payload.filter
					  }
					: tdl
			)
		}
		case 'todolists/change_todolist_title': {
			return state.map((tdl) =>
				tdl.id === action.payload.todolistId
					? {
							...tdl,
							title: action.payload.title
					  }
					: tdl
			)
		}
		case 'todolists/remove_todolist': {
			return state.filter((tdl) => tdl.id !== action.payload.todolistId)
		}
		case 'todolists/add_todolist': {
			return [
				{
					id: action.payload.todolistId,
					title: action.payload.title,
					filter: 'all',
					addedDate: '',
					order: 0
				},
				...state
			]
		}

		default:
			return state
	}
}

export const setTodolistAC = (todolists: Array<TodolistType>) => {
	return {
		type: 'todolists/set_todolists',
		payload: {
			todolists
		}
	} as const
}
export const changeFilterAC = (todolistId: string, filter: FilterType) => {
	return {
		type: 'todolists/change_filter',
		payload: {
			todolistId,
			filter
		}
	} as const
}
export const changeTodolistTitleAC = (todolistId: string, title: string) => {
	return {
		type: 'todolists/change_todolist_title',
		payload: {
			todolistId,
			title
		}
	} as const
}
export const addTodolistAC = (title: string) => {
	const todolistId = v1()
	return {
		type: 'todolists/add_todolist',
		payload: {
			todolistId,
			title
		}
	} as const
}
export const removeTodolistAC = (todolistId: string) => {
	return {
		type: 'todolists/remove_todolist',
		payload: {
			todolistId
		}
	} as const
}

// export const fetchTodolists = (dispatch: Dispatch) => {
// 	todolistAPI.getTodolists().then((res) => {
// 		dispatch(setTodolistAC(res.data))
// 	})
// }
export const fetchTodolistsTC = () => (dispatch: Dispatch) => {
	todolistAPI.getTodolists().then((res) => {
		const todolists = res.data
		dispatch(setTodolistAC(todolists))
	})
}

export type TodolistsActionType =
	| ReturnType<typeof removeTodolistAC>
	| ReturnType<typeof addTodolistAC>
	| ReturnType<typeof changeFilterAC>
	| ReturnType<typeof changeTodolistTitleAC>
	| ReturnType<typeof setTodolistAC>
export type TodolistDomainType = TodolistType & { filter: FilterType }
