import {Dispatch} from 'redux'
import {SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from '../../app/app-reducer'
import {authAPI, LoginParamsType} from "../../api/auth-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";

const initialState = {
    isInitialized: false,
    isLoggedIn: false,
    userName: ''
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/set_is_logged_in':
            return {...state, isLoggedIn: action.value}
        case 'login/initialized':
            return {...state, isInitialized: action.value}
        case 'login/set_user_name':
            return {...state, userName: action.value}
        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/set_is_logged_in', value} as const)

export const setIsInitializedAC = (value: boolean) =>
    ({type: 'login/initialized', value} as const)

export const setUserNameAC = (value: string) =>
    ({type: 'login/set_user_name', value} as const)

// thunks
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.login(data)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch);
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
export const meTC = () => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.me()
        .then(res => {
            if (res.resultCode === 0) {
                dispatch(setUserNameAC(res.data.login))
                dispatch(setIsLoggedInAC(true))
                dispatch(setIsInitializedAC(true))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                dispatch(setIsInitializedAC(true))
                handleServerAppError(res, dispatch);
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

// types
type ActionsType =
    ReturnType<typeof setIsLoggedInAC>
    | SetAppStatusActionType
    | SetAppErrorActionType
    | ReturnType<typeof setIsInitializedAC>
    | ReturnType<typeof setUserNameAC>
