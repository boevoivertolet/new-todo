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
        case 'tasks/add' : {
            return{
                ...state,
                [action.payload.todolistId]: [{id: v1(), title: action.payload.title, isDone: false}, ...state[action.payload.todolistId]]
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
export const add = (todolistId: string,title: string) => {
    return {
        type: 'tasks/add',
        payload: {
            todolistId,title
        }
    } as const
}


export type TasksActionType = | ReturnType<typeof remove> | ReturnType<typeof add>
