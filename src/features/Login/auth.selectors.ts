import { AppRootStateType, useAppSelector } from 'app/store';

export const selectIsLoggedIn = (state: AppRootStateType) => state.auth.isLoggedIn;
export const selectIsInitialized = (state: AppRootStateType) => state.auth.isInitialized;
export const selectTodolists = (state: AppRootStateType) => state.todolists;
export const selectTasks = (state: AppRootStateType) => state.tasks;
