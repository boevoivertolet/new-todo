import {todolistAPI, TodolistType} from '../api/todolist-api'
import {Dispatch} from 'redux'
import {FilterType} from "./TodolistsList";
import {AppActionType, RequestStatusType, setAppErrorAC, setAppStatusAC} from "../app/app-reducer";
import {handleServerNetworkError} from "../utils/error-utils";


const InitialState: TodolistDomainType[] = []

export const todolistsReducer = (
    state: TodolistDomainType[] = InitialState,
    action: TodolistsActionType
): TodolistDomainType[] => {
    switch (action.type) {
        case 'todolists/set_todolists': {
            return action.payload.todolists.map((tl) => ({...tl, filter: 'all', entityStatus:'idle'}))
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
        case 'todolists/change_todolist_entity_status':  {
            return state.map((tdl) =>
                tdl.id === action.payload.todolistId
                    ? {
                        ...tdl,
                        entityStatus: action.payload.status
                    }
                    : tdl
            )
        }
        case 'todolists/remove_todolist': {
            return state.filter((tdl) => tdl.id !== action.payload.todolistId)
        }
        case 'todolists/add_todolist': {
            return [{...action.payload.todolist, filter: 'all', entityStatus:'idle'}, ...state]
        }
        default:
            return state
    }
}
//actions
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
export const changeTodolistEntityStatusAC = (todolistId: string, status: RequestStatusType) => {
    return {
        type: 'todolists/change_todolist_entity_status',
        payload: {
            todolistId,
            status
        }
    } as const
}
export const addTodolistAC = (todolist: TodolistType) => ({
    type: 'todolists/add_todolist', payload: {
        todolist
    }
} as const)
export const removeTodolistAC = (todolistId: string) => {
    return {
        type: 'todolists/remove_todolist',
        payload: {
            todolistId
        }
    } as const
}

//thunks
export const fetchTodolistsTC = () => (dispatch: Dispatch<TodolistsActionType | AppActionType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.getTodolists()
        .then((res) => {
        const todolists = res.data
        dispatch(setTodolistAC(todolists))
        dispatch(setAppStatusAC('succeeded'))
    })
        .catch((error)=>{ handleServerNetworkError(error,dispatch)
        })
}
export const addTodolistTC = (title: string) => {
    return (dispatch: Dispatch<TodolistsActionType | AppActionType>) => {
        dispatch(setAppStatusAC('loading'))
        todolistAPI.createTodolists(title)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(addTodolistAC(res.data.data.item))
                    dispatch(setAppStatusAC('succeeded'))
                } else {
                    if (res.data.messages.length) {
                        dispatch(setAppErrorAC(res.data.messages[0]))
                    } else {
                        dispatch(setAppErrorAC('Some error occurred'))
                    }
                    dispatch(setAppStatusAC('failed'))
                }
            })
            .catch((error)=>{ handleServerNetworkError(error,dispatch)
            })
    }
}
export const changeTodolistTitleTC = (id: string, title: string) => {
    return (dispatch: Dispatch<TodolistsActionType | AppActionType>) => {
        dispatch(setAppStatusAC('loading'))
        todolistAPI.updateTodolist(id, title)
            .then((res) => {
                dispatch(changeTodolistTitleAC(id, title))
                dispatch(setAppStatusAC('succeeded'))
            })
            .catch((error)=>{ handleServerNetworkError(error,dispatch)
            })
    }
}
export const removeTodolistTC = (todolistId: string) => {
    return (dispatch: Dispatch<TodolistsActionType | AppActionType>) => {
        dispatch(setAppStatusAC('loading'))
        todolistAPI.deleteTodolist(todolistId)
            .then((res) => {
                dispatch(removeTodolistAC(todolistId))
                dispatch(setAppStatusAC('succeeded'))
            })
            .catch((error)=>{ handleServerNetworkError(error,dispatch)
            })

    }
}

//types
export type TodolistsActionType =
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeFilterAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof setTodolistAC>
    | ReturnType<typeof changeTodolistEntityStatusAC>

export type TodolistDomainType = TodolistType & {
    filter: FilterType
    entityStatus: RequestStatusType
}
