import { todolistAPI, TodolistType } from 'api/todolist-api';
import { FilterType } from './TodolistsList';
import { handleServerAppError, handleServerNetworkError } from 'utils/error-utils';
import { fetchTasksTC } from './taskReducer';
import { appActions, RequestStatusType } from 'app/app-reducer';
import { AppThunk } from 'app/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// const InitialState: TodolistDomainType[] = [];

// export const todolistsReducer = (
// 	state: TodolistDomainType[] = InitialState,
// 	action: TodolistsActionType,
// ): TodolistDomainType[] => {
// 	switch (action.type) {
// 		case "todolists/set_todolists": {
// 			return action.payload.todolists.map((tl) => ({ ...tl, filter: "all", entityStatus: "idle" }));
// 		}
// 		case "todolists/change_filter": {
// 			return state.map((tdl) =>
// 				tdl.id === action.payload.todolistId
// 					? {
// 							...tdl,
// 							filter: action.payload.filter,
// 					  }
// 					: tdl,
// 			);
// 		}
// 		case "todolists/change_todolist_title": {
// 			return state.map((tdl) =>
// 				tdl.id === action.payload.todolistId
// 					? {
// 							...tdl,
// 							title: action.payload.title,
// 					  }
// 					: tdl,
// 			);
// 		}
// 		case "todolists/change_todolist_entity_status": {
// 			return state.map((tdl) =>
// 				tdl.id === action.payload.todolistId
// 					? {
// 							...tdl,
// 							entityStatus: action.payload.status,
// 					  }
// 					: tdl,
// 			);
// 		}
// 		case "todolists/remove_todolist": {
// 			return state.filter((tdl) => tdl.id !== action.payload.todolistId);
// 		}
// 		case "todolists/add_todolist": {
// 			return [{ ...action.payload.todolist, filter: "all", entityStatus: "idle" }, ...state];
// 		}
// 		default:
// 			return state;
// 	}
// };

const slice = createSlice({
    name: 'todolists',
    initialState: {
        todolists: [] as TodolistDomainType[],
    },
    reducers: {
        setTodolist: (state, action: PayloadAction<{ todolists: Array<TodolistType> }>) => {
            state.todolists = action.payload.todolists.map((tl) => ({ ...tl, filter: 'all', entityStatus: 'idle' }));
        },
        changeFilter: (state, action: PayloadAction<{ todolistId: string; filter: FilterType }>) => {
            state.todolists.map((tdl) =>
                tdl.id === action.payload.todolistId
                    ? {
                          ...tdl,
                          filter: action.payload.filter,
                      }
                    : tdl,
            );
        },
        changeTodolistTitle: (state, action: PayloadAction<{ todolistId: string; title: string }>) => {
            state.todolists.map((tdl) =>
                tdl.id === action.payload.todolistId
                    ? {
                          ...tdl,
                          title: action.payload.title,
                      }
                    : tdl,
            );
        },
        changeTodolistEntityStatus: (
            state,
            action: PayloadAction<{ todolistId: string; status: RequestStatusType }>,
        ) => {
            state.todolists.map((tdl) =>
                tdl.id === action.payload.todolistId
                    ? {
                          ...tdl,
                          entityStatus: action.payload.status,
                      }
                    : tdl,
            );
        },
        addTodolist: (state, action: PayloadAction<{ todolist: TodolistType }>) => {
            state.todolists.unshift({ ...action.payload.todolist, filter: 'all', entityStatus: 'idle' });
        },
        removeTodolist: (state, action: PayloadAction<{ todolistId: string }>) => {
            state.todolists = state.todolists.filter((tdl) => tdl.id !== action.payload.todolistId);
        },
    },
});
export const todolistsReducer = slice.reducer;
export const todolistActions = slice.actions;
export type TodolistInitialState = ReturnType<typeof slice.getInitialState>;

//actions

// export const setTodolistAC = (todolists: Array<TodolistType>) => {
//     return {
//         type: 'todolists/set_todolists',
//         payload: {
//             todolists,
//         },
//     } as const;
// };
// export const changeFilterAC = (todolistId: string, filter: FilterType) => {
//     return {
//         type: 'todolists/change_filter',
//         payload: {
//             todolistId,
//             filter,
//         },
//     } as const;
// };
// export const changeTodolistTitleAC = (todolistId: string, title: string) => {
//     return {
//         type: 'todolists/change_todolist_title',
//         payload: {
//             todolistId,
//             title,
//         },
//     } as const;
// };
// export const changeTodolistEntityStatusAC = (todolistId: string, status: RequestStatusType) => {
//     return {
//         type: 'todolists/change_todolist_entity_status',
//         payload: {
//             todolistId,
//             status,
//         },
//     } as const;
// };
// export const addTodolistAC = (todolist: TodolistType) =>
//     ({
//         type: 'todolists/add_todolist',
//         payload: {
//             todolist,
//         },
//     }) as const;
// export const removeTodolistAC = (todolistId: string) => {
//     return {
//         type: 'todolists/remove_todolist',
//         payload: {
//             todolistId,
//         },
//     } as const;
// };

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
