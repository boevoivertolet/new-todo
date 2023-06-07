const initialState = {
    status: 'loading' as RequestStatusType,
    error: null as ErrorType
}

export type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: AppActionType): InitialStateType => {
    switch (action.type) {
        case 'app/set_status':
            return {...state, status: action.payload.status}
        case 'app/set_error':
            return {...state, error: action.payload.error}
        default:
            return {...state}
    }
}

//actions

export const setAppStatusAC = (status: RequestStatusType) => {
    return (
        {type: 'app/set_status', payload: {status}} as const
    )

}
export const setAppErrorAC = (error: ErrorType) => {
    return (
        {type: 'app/set_error', payload: {error}} as const
    )

}
export type ErrorType = string | null
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type AppActionType =
    | ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setAppErrorAC>
