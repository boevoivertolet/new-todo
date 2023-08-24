import { AnyAction, combineReducers } from "redux";
import { tasksReducer } from "features/taskReducer";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { todolistsReducer } from "features/todolistsReducer";
import { appReducer } from "./app-reducer";
import { authReducer } from "features/Login/auth-reducer";
import { configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
	tasks: tasksReducer,
	todolists: todolistsReducer,
	app: appReducer,
	auth: authReducer,
});

// export const store = createStore(rootReducer, applyMiddleware(thunk)); redux store
export const store = configureStore({ reducer: rootReducer }); // toolkit store

// export type AppRootStateType = ReturnType<typeof rootReducer>; // redux type
export type AppRootStateType = ReturnType<typeof store.getState>; // toolkit type

export type ThunkAppDispatchType = ThunkDispatch<AppRootStateType, any, AnyAction>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AnyAction>;
export const useAppDispatch = () => useDispatch<ThunkAppDispatchType>();
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;

// @ts-ignore
window.store = store;
