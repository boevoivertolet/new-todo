import {
	AnyAction,
	applyMiddleware,
	combineReducers,
	legacy_createStore as createStore
} from 'redux'
import { tasksReducer } from '../reducers/taskReducer'
import thunk, { ThunkDispatch } from 'redux-thunk'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { todolistsReducer } from '../reducers/todolistsReducer'

const rootReducer = combineReducers({
	tasks: tasksReducer,
	todolists: todolistsReducer
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
