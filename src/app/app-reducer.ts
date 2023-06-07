export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'loading' as RequestStatusType
}

export type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: AppActionType): InitialStateType => {
    switch (action.type) {
        case 'app/set_status':
            return {...state, status: action.payload.status}
        default:
            return state
    }
}

//actions

export const setAppStatusAC = (status: RequestStatusType) => {
    return (
        {type: 'app/set_status', payload: {status}}
    )

}




export type AppActionType = ReturnType<typeof setAppStatusAC>
