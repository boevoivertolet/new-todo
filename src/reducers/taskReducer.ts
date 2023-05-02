import {TasksType} from "../App";
import {v1} from "uuid";
import {todolistID1, todolistID2} from "./todolistsReducer";



const InitialState: TasksType = {
    [todolistID1]: [
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},

    ],
    [todolistID2]: [
        {id: v1(), title: 'Rest API', isDone: true},
        {id: v1(), title: 'GraphQL', isDone: false},
    ]
}

export const tasksReducer = (state: TasksType = InitialState, action: TasksActionType) => {
    switch (action.type) {
        case 'tasks/remove' : {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(t => t.id !== action.payload.id)
            }
        }
        default:
            return state
    }
}

export const remove = (todolistId: string, id: string) => {
    return {
        type: 'tasks/remove',
        payload: {
            todolistId, id
        }
    } as const

}


export type TasksActionType = | ReturnType<typeof remove>
