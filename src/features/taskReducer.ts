import { taskAPI, TaskPriorities, TaskStatuses, TaskType, UpdateTaskModelType } from 'api/task-api';
import { AppRootStateType, AppThunk } from 'app/store';
import { handleServerAppError, handleServerNetworkError } from 'utils/error-utils';
import { appActions, RequestStatusType } from 'app/app-reducer';
import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';

import { todolistActions } from 'features/todolistsReducer';

const InitialState: TasksStateType = {};

export const _tasksReducer = (state: TasksStateType = InitialState, action: TasksActionType): TasksStateType => {
    switch (action.type) {
        // case 'todolists/set_tasks': {
        //     const stateCopy = { ...state };
        //     stateCopy[action.payload.todolistId] = action.payload.tasks;
        //     return stateCopy;
        // }
        case 'tasks/change_task_entity_status': {
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

const slice = createSlice({
    name: 'tasks',
    initialState: {} as TasksStateType,
    reducers: {
        removeTask: (state, action: PayloadAction<{ todolistId: string; id: string }>) => {
            const taskForTodolist = state[action.payload.todolistId];
            const index = taskForTodolist.findIndex((task) => task.id === action.payload.id);
            if (index !== -1) taskForTodolist.splice(index, 1);
        },
        addTask: (state, action: PayloadAction<{ task: TaskType }>) => {
            const tasksForCurrentTodolist = state[action.payload.task.id];
            tasksForCurrentTodolist.unshift(action.payload.task);
        },
        updateTask: (
            state,
            action: PayloadAction<{ todolistId: string; taskId: string; model: UpdateDomainTaskModelType }>,
        ) => {
            const taskForTodolist = state[action.payload.todolistId];
            const index = taskForTodolist.findIndex((task) => task.id === action.payload.taskId);
            if (index !== -1) {
                taskForTodolist[index] = { ...taskForTodolist[index], ...action.payload.model };
            }
        },
        setTasks: (state, action: PayloadAction<{ todolistId: string; tasks: TaskType[] }>) => {
            state[action.payload.todolistId] = action.payload.tasks;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(todolistActions.addTodolist, (state, action) => {
            state[action.payload.todolist.id] = [];
        });
        builder.addCase(todolistActions.removeTodolist, (state, action) => {
            delete state[action.payload.todolistId];
        });
        builder.addCase(todolistActions.setTodolist, (state, action) => {
            action.payload.todolists.forEach((tl) => {
                state[tl.id] = [];
            });
        });
    },
});
export const tasksReducer = slice.reducer;
export const tasksActions = slice.actions;
export type tasksInitialState = ReturnType<typeof slice.getInitialState>;

export const changeTaskEntityStatusAC = (todolistId: string, taskId: string, status: RequestStatusType) => {
    return {
        type: 'tasks/change_task_entity_status',
        payload: {
            todolistId,
            taskId,
            status,
        },
    } as const;
};

//thunks
export const fetchTasksTC =
    (todolistId: string): AppThunk =>
    (dispatch) => {
        dispatch(appActions.setAppStatus({ status: 'loading' }));
        taskAPI
            .getTasks(todolistId)
            .then((res) => {
                const tasks = res.data.items;
                dispatch(setTasksAC(todolistId, tasks));
                dispatch(appActions.setAppStatus({ status: 'succeeded' }));
            })

            .catch((error) => {
                handleServerNetworkError(error, dispatch);
            });
    };
export const addTasksTC =
    (todolistId: string, title: string): AppThunk =>
    (dispatch) => {
        dispatch(appActions.setAppStatus({ status: 'loading' }));
        taskAPI
            .createTask(todolistId, title)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    const task = res.data.data.item;
                    dispatch(addAC(task));
                    dispatch(appActions.setAppStatus({ status: 'succeeded' }));
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
        dispatch(appActions.setAppStatus({ status: 'loading' }));
        taskAPI
            .deleteTasks(todolistId, taskId)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(changeTaskEntityStatusAC(todolistId, taskId, 'loading'));
                    dispatch(removeAC(todolistId, taskId));
                    dispatch(appActions.setAppStatus({ status: 'succeeded' }));
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
        dispatch(changeTaskEntityStatusAC(todolistId, taskId, 'loading'));
        const state = getState();
        const task = state.tasks[todolistId].find((t) => t.id === taskId);
        if (!task) {
            console.warn('task not found in the state');
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
        dispatch(appActions.setAppStatus({ status: 'loading' }));
        taskAPI
            .updateTask(todolistId, taskId, apiModel)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(updateTaskAC(todolistId, taskId, domainModel));
                    dispatch(appActions.setAppStatus({ status: 'succeeded' }));
                    dispatch(changeTaskEntityStatusAC(todolistId, taskId, 'succeeded'));
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
    // | ReturnType<typeof addTodolistAC>
    // | ReturnType<typeof removeTodolistAC>
    // | ReturnType<typeof setTodolistAC>
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
