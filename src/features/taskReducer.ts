import { addTodolistAC, removeTodolistAC, setTodolistAC } from "./todolistsReducer";

import { Dispatch } from "redux";
import { taskAPI, TaskPriorities, TaskStatuses, TaskType, UpdateTaskModelType } from "api/task-api";
import { AppRootStateType, AppThunk } from "app/store";
// import { AppActionType, RequestStatusType, setAppStatusAC } from "../app/app-reducer";
import { handleServerAppError, handleServerNetworkError } from "utils/error-utils";
import { appActions, RequestStatusType } from "app/app-reducer";

const InitialState: TasksStateType = {};

export const tasksReducer = (state: TasksStateType = InitialState, action: TasksActionType): TasksStateType => {
    switch (action.type) {
        case "todolists/set_todolists": {
            const stateCopy = { ...state };
            action.payload.todolists.forEach((tl) => {
                stateCopy[tl.id] = [];
            });
            return stateCopy;
        }
        case "todolists/set_tasks": {
            const stateCopy = { ...state };
            stateCopy[action.payload.todolistId] = action.payload.tasks;
            return stateCopy;
        }
        case "tasks/remove": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter((t) => t.id !== action.payload.id),
            };
        }
        case "todolists/remove_todolist": {
            let copyState = { ...state };
            delete copyState[action.payload.todolistId];
            return copyState;
        }
        case "tasks/add": {
            return {
                ...state,
                [action.payload.task.todoListId]: [action.payload.task, ...state[action.payload.task.todoListId]],
            };
        }
        case "tasks/update": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map((t) =>
                    t.id === action.payload.taskId ? { ...t, ...action.payload.model } : t,
                ),
            };
        }
        case "todolists/add_todolist": {
            return { ...state, [action.payload.todolist.id]: [] };
        }
        case "tasks/change_task_entity_status": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map((t) =>
                    t.id === action.payload.taskId ? { ...t, entityStatus: action.payload.status } : t,
                ),
            };
        }

        default:
            return state;
    }
};
//actions
export const changeTaskEntityStatusAC = (todolistId: string, taskId: string, status: RequestStatusType) => {
    return {
        type: "tasks/change_task_entity_status",
        payload: {
            todolistId,
            taskId,
            status,
        },
    } as const;
};
export const setTasksAC = (todolistId: string, tasks: TaskType[]) => {
    return {
        type: "todolists/set_tasks",
        payload: {
            todolistId,
            tasks,
        },
    } as const;
};
export const removeAC = (todolistId: string, id: string) => {
    return {
        type: "tasks/remove",
        payload: {
            todolistId,
            id,
        },
    } as const;
};
export const addAC = (task: TaskType) => {
    return {
        type: "tasks/add",
        payload: {
            task,
        },
    } as const;
};
export const updateTaskAC = (todolistId: string, taskId: string, model: UpdateDomainTaskModelType) => {
    return {
        type: "tasks/update",
        payload: {
            todolistId,
            taskId,
            model,
        },
    } as const;
};

//thunks
export const fetchTasksTC =
    (todolistId: string): AppThunk =>
    (dispatch) => {
        dispatch(appActions.setAppStatus({ status: "loading" }));
        taskAPI
            .getTasks(todolistId)
            .then((res) => {
                const tasks = res.data.items;
                dispatch(setTasksAC(todolistId, tasks));
                dispatch(appActions.setAppStatus({ status: "succeeded" }));
            })

            .catch((error) => {
                handleServerNetworkError(error, dispatch);
            });
    };
export const addTasksTC =
    (todolistId: string, title: string): AppThunk =>
    (dispatch) => {
        dispatch(appActions.setAppStatus({ status: "loading" }));
        taskAPI
            .createTask(todolistId, title)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    const task = res.data.data.item;
                    dispatch(addAC(task));
                    dispatch(appActions.setAppStatus({ status: "succeeded" }));
                } else {
                    handleServerAppError(res.data, dispatch);
                }
            })

            .catch((error) => {
                handleServerNetworkError(error, dispatch);
            });
    };
export const removeTaskTC =
    (todolistId: string, taskId: string): AppThunk =>
    (dispatch) => {
        dispatch(appActions.setAppStatus({ status: "loading" }));
        taskAPI
            .deleteTasks(todolistId, taskId)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(changeTaskEntityStatusAC(todolistId, taskId, "loading"));
                    dispatch(removeAC(todolistId, taskId));
                    dispatch(appActions.setAppStatus({ status: "succeeded" }));
                } else {
                    handleServerAppError(res.data, dispatch);
                }
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch);
            });
    };
export const updateTaskTC =
    (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType): AppThunk =>
    (dispatch, getState: () => AppRootStateType) => {
        dispatch(changeTaskEntityStatusAC(todolistId, taskId, "loading"));
        const state = getState();
        const task = state.tasks[todolistId].find((t) => t.id === taskId);
        if (!task) {
            console.warn("task not found in the state");
            return;
        }

        const apiModel: UpdateTaskModelType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            title: task.title,
            status: task.status,
            ...domainModel,
        };
        dispatch(appActions.setAppStatus({ status: "loading" }));
        taskAPI
            .updateTask(todolistId, taskId, apiModel)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(updateTaskAC(todolistId, taskId, domainModel));
                    dispatch(appActions.setAppStatus({ status: "succeeded" }));
                    dispatch(changeTaskEntityStatusAC(todolistId, taskId, "succeeded"));
                } else {
                    handleServerAppError(res.data, dispatch);
                }
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch);
            });
    };
//types
export type TasksActionType =
    | ReturnType<typeof removeAC>
    | ReturnType<typeof addAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof setTodolistAC>
    | ReturnType<typeof setTasksAC>
    | ReturnType<typeof changeTaskEntityStatusAC>;

export type TasksStateType = {
    [key: string]: Array<TaskType>;
};

export type UpdateDomainTaskModelType = {
    title?: string;
    description?: string;
    status?: TaskStatuses;
    priority?: TaskPriorities;
    startDate?: string;
    deadline?: string;
};
