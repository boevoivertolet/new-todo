import { AppRootStateType } from 'app/store'

// export const selectIsLoggedIn = (state: AppRootStateType) => state.auth.isLoggedIn
// export const selectIsInitialized = (state: AppRootStateType) => state.auth.isInitialized
// export const selectTodolists = (state: AppRootStateType) => state.todolists
// export const selectTasks = (state: AppRootStateType) => state.tasks

export const selectors = {
    selectIsLoggedIn(state: AppRootStateType) {
        return state.auth.isLoggedIn
    },
    selectIsInitialized(state: AppRootStateType) {
        return state.auth.isInitialized
    },
    selectTodolists(state: AppRootStateType) {
        return state.todolists
    },
    selectTasks(state: AppRootStateType) {
        return state.tasks
    },
}
