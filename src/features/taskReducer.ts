import { taskAPI, TaskPriorities, TaskStatuses, TaskType, UpdateTaskModelType } from 'api/task-api';
import { AppRootStateType, AppThunk } from 'app/store';
import { handleServerAppError, handleServerNetworkError } from 'utils/error-utils';
import { appActions, RequestStatusType } from 'app/app-reducer';
import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';

import { todolistActions } from 'features/todolistsReducer';

const slice = createSlice({
    name: 'tasks',
    initialState: {} as TasksStateType,
    reducers: {
        removeTask: (state, action: PayloadAction<{ todolistId: string; taskId: string }>) => {
            const taskForTodolist = state[action.payload.todolistId];
            const index = taskForTodolist.findIndex((task) => task.id === action.payload.taskId);
            if (index !== -1) taskForTodolist.splice(index, 1);
        },
        addTask: (state, action: PayloadAction<{ task: TaskType }>) => {
            const tasksForCurrentTodolist = state[action.payload.task.todoListId];
            tasksForCurrentTodolist.unshift(action.payload.task);
        },
        updateTask: (
            state,
            action: PayloadAction<{ todolistId: string; taskId: string; domainModel: UpdateDomainTaskModelType }>,
        ) => {
            const taskForTodolist = state[action.payload.todolistId];
            const index = taskForTodolist.findIndex((task) => task.id === action.payload.taskId);
            if (index !== -1) {
                taskForTodolist[index] = { ...taskForTodolist[index], ...action.payload.domainModel };
            }
        },
        setTasks: (state, action: PayloadAction<{ todolistId: string; tasks: TaskType[] }>) => {
            state[action.payload.todolistId] = action.payload.tasks;
        },
        changeTaskEntityStatus: (
            state,
            action: PayloadAction<{ todolistId: string; taskId: string; entityStatus: RequestStatusType }>,
        ) => {
            const tasksForTodolist = state[action.payload.todolistId];
            const index = tasksForTodolist.findIndex((todo) => todo.id === action.payload.todolistId);
            if (index !== -1) {
                tasksForTodolist[index] = { ...tasksForTodolist[index], entityStatus: action.payload.entityStatus };
            }
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

//

//thunks
export const fetchTasksTC =
    (todolistId: string): AppThunk =>
    (dispatch) => {
        dispatch(appActions.setAppStatus({ status: 'loading' }));
        taskAPI
            .getTasks(todolistId)
            .then((res) => {
                const tasks = res.data.items;
                dispatch(tasksActions.setTasks({ todolistId, tasks }));
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
                    dispatch(tasksActions.addTask({ task }));
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
                    dispatch(tasksActions.changeTaskEntityStatus({ todolistId, taskId, entityStatus: 'loading' }));
                    dispatch(tasksActions.removeTask({ todolistId, taskId }));
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
        dispatch(tasksActions.changeTaskEntityStatus({ todolistId, taskId, entityStatus: 'loading' }));
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
                    dispatch(tasksActions.updateTask({ todolistId, taskId, domainModel }));
                    dispatch(appActions.setAppStatus({ status: 'succeeded' }));
                    dispatch(tasksActions.changeTaskEntityStatus({ todolistId, taskId, entityStatus: 'succeeded' }));
                } else {
                    handleServerAppError(res.data, dispatch);
                }
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch);
            });
    };
//types

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
