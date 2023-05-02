import {TaskType} from "../Todolist";

const InitialState: TaskType[] = []

export const tasksReducer = (state: TaskType[] = InitialState, action: TasksActionType) => {
    switch (action.type) {
        case 'tasks/removeTask' : {
            return state
        }
        default:
            return state
    }
}

const removeTask = () => {
    return {
        type: 'tasks/removeTask'
    } as const

}



export type TasksActionType = | ReturnType<typeof removeTask>
