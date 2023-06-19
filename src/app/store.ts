import {
	AnyAction,
	applyMiddleware,
	combineReducers,
	legacy_createStore as createStore
} from 'redux'
import { tasksReducer } from '../features/taskReducer'
import thunk, { ThunkDispatch } from 'redux-thunk'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { todolistsReducer } from '../features/todolistsReducer'
import {appReducer} from "./app-reducer";
import {authReducer} from "../features/Login/auth-reducer";

const rootReducer = combineReducers({
	tasks: tasksReducer,
	todolists: todolistsReducer,
	app: appReducer,
	auth:authReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>

export type ThunkAppDispatchType = ThunkDispatch<
	AppRootStateType,
	any,
	AnyAction
>
export const useAppDispatch = () => useDispatch<ThunkAppDispatchType>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> =
	useSelector

// @ts-ignore
window.store = store
