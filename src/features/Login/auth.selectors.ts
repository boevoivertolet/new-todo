import { AppRootStateType } from 'app/store'

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
