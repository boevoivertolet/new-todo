import {TodolistsType} from "../App";
import {v1} from "uuid";
export let todolistID1 = v1()
export let todolistID2 = v1()

const InitialState: TodolistsType[] = [
    {id: todolistID1, title: 'What to learn', filter: 'all'},
    {id: todolistID2, title: 'What to buy', filter: 'all'},
]

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
