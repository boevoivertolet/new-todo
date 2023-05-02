import {TodolistsType} from "../App";


const InitialState: TodolistsType[] = []

export const todolistReducer = (state: TodolistsType[] = InitialState, action: TodolistsActionType) => {
    switch (action.type) {
        case 'todolists/removeTodolist' : {
            return state
        }
        default:
            return state
    }
}

const removeTodolist = (id: string) => {
    return {
        type: 'todolists/removeTodolist',
        payload: {
            id
        }
    } as const

}


export type TodolistsActionType = | ReturnType<typeof removeTodolist>
