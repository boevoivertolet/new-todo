import { todolistAPI, TodolistType } from 'api/todolist-api';
import { FilterType } from './TodolistsList';
import { handleServerAppError, handleServerNetworkError } from 'utils/error-utils';
import { fetchTasksTC } from './taskReducer';
import { appActions, RequestStatusType } from 'app/app-reducer';
import { AppThunk } from 'app/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const slice = createSlice({
    name: 'todolists',
    initialState: [] as TodolistDomainType[],
    reducers: {
        setTodolist: (state, action: PayloadAction<{ todolists: TodolistType[] }>) => {
            // state = action.payload.todolists.map((tl) => ({ ...tl, filter: 'all', entityStatus: 'idle' }));
            return action.payload.todolists.map((tl) => ({ ...tl, filter: 'all', entityStatus: 'idle' }));
        },
        changeFilter: (state, action: PayloadAction<{ todolistId: string; filter: FilterType }>) => {
            const index = state.findIndex((todo) => todo.id === action.payload.todolistId);
            if (index !== -1) state[index].filter = action.payload.filter;
        },
        changeTodolistTitle: (state, action: PayloadAction<{ todolistId: string; title: string }>) => {
            const index = state.findIndex((todo) => todo.id === action.payload.todolistId);
            if (index !== -1) state[index].title = action.payload.title;
        },
        changeTodolistEntityStatus: (
            state,
            action: PayloadAction<{ todolistId: string; entityStatus: RequestStatusType }>,
        ) => {
            const index = state.findIndex((todo) => todo.id === action.payload.todolistId);
            if (index !== -1) state[index].entityStatus = action.payload.entityStatus;
        },
        addTodolist: (state, action: PayloadAction<{ todolist: TodolistType }>) => {
            state.unshift({ ...action.payload.todolist, filter: 'all', entityStatus: 'idle' });
        },
        removeTodolist: (state, action: PayloadAction<{ todolistId: string }>) => {
            const index = state.findIndex((todo) => todo.id === action.payload.todolistId);
            if (index !== -1) state.splice(index, 1);
        },
    },
});
export const todolistsReducer = slice.reducer;
export const todolistActions = slice.actions;
export type TodolistInitialState = ReturnType<typeof slice.getInitialState>;

//thunks
export const fetchTodolistsTC = (): AppThunk => (dispatch) => {
    dispatch(appActions.setAppStatus({ status: 'loading' }));
    todolistAPI
        .getTodolists()
        .then((res) => {
            const todolists = res.data;
            dispatch(todolistActions.setTodolist({ todolists: todolists }));
            dispatch(appActions.setAppStatus({ status: 'succeeded' }));
            return todolists;
        })
        .then((todolists) => {
            todolists.forEach((tl) => {
                dispatch(fetchTasksTC(tl.id));
            });
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch);
        });
};

export const addTodolistTC = (title: string): AppThunk => {
    return (dispatch) => {
        dispatch(appActions.setAppStatus({ status: 'loading' }));
        todolistAPI
            .createTodolists(title)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(todolistActions.addTodolist({ todolist: res.data.data.item }));
                    dispatch(appActions.setAppStatus({ status: 'succeeded' }));
                } else {
                    handleServerAppError(res.data, dispatch);
                }
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch);
            });
    };
};
export const changeTodolistTitleTC = (id: string, title: string): AppThunk => {
    return (dispatch) => {
        dispatch(appActions.setAppStatus({ status: 'loading' }));
        todolistAPI
            .updateTodolist(id, title)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(todolistActions.changeTodolistTitle({ todolistId: id, title: title }));
                    dispatch(appActions.setAppStatus({ status: 'succeeded' }));
                } else {
                    handleServerAppError(res.data, dispatch);
                }
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch);
            });
    };
};
export const removeTodolistTC = (todolistId: string): AppThunk => {
    return (dispatch) => {
        dispatch(appActions.setAppStatus({ status: 'loading' }));
        todolistAPI
            .deleteTodolist(todolistId)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(todolistActions.removeTodolist({ todolistId }));
                    dispatch(appActions.setAppStatus({ status: 'succeeded' }));
                } else {
                    handleServerAppError(res.data, dispatch);
                }
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch);
            });
    };
};

//types

export type TodolistDomainType = TodolistType & {
    filter: FilterType;
    entityStatus: RequestStatusType;
};
