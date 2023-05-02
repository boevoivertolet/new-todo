import {FilterType, TodolistsType} from "../App";
import {v1} from "uuid";

export let todolistID1 = v1()
export let todolistID2 = v1()

const InitialState: TodolistsType[] = [
    {id: todolistID1, title: 'What to learn', filter: 'all'},
    {id: todolistID2, title: 'What to buy', filter: 'all'},
]

export const todolistReducer = (state: TodolistsType[] = InitialState, action: TodolistsActionType) => {
    switch (action.type) {
        case 'todolists/change_filter' : {
            return state.map(tdl => tdl.id === action.payload.todolistId ? {
                ...tdl,
                filter: action.payload.filter
            } : tdl)
        }
        case 'todolists/remove_todolist' : {
            return state.filter(tdl => tdl.id !== action.payload.todolistId)
        }
        case 'todolists/add_todolist' : {
            return [{id: action.payload.todolistId, title: action.payload.title, filter: 'all'}, ...state]
        }
        default:
            return state
    }

}

export const changeFilterAC = (todolistId: string, filter: FilterType) => {
    return {
        type: 'todolists/change_filter',
        payload: {
            todolistId, filter
        }
    } as const

}
export const addTodolistAC = (title: string) => {
    const todolistId = v1()
    return {
        type: 'todolists/add_todolist',
        payload: {
            todolistId,title
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


export type TodolistsActionType =
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeFilterAC>
