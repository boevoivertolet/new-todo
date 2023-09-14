import { authAPI, LoginParamsType } from 'api/auth-api';
import { handleServerAppError, handleServerNetworkError } from 'utils/error-utils';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from 'app/store';
import { appActions } from 'app/app-reducer';
import { todolistActions } from 'features/todolistsReducer';

const slice = createSlice({
    name: 'auth',
    initialState: {
        isInitialized: false,
        isLoggedIn: false,
        userName: '',
    },
    reducers: {
        setIsLoggedIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
            // return { ...state, isLoggedIn: action.value };
            state.isLoggedIn = action.payload.isLoggedIn;
        },
        setIsInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
            // return { ...state, isInitialized: action.value };
            state.isInitialized = action.payload.isInitialized;
        },
        setUserName: (state, action: PayloadAction<{ userName: string }>) => {
            // return { ...state, userName: action.value };
            state.userName = action.payload.userName;
        },
    },
});
export const authReducer = slice.reducer;
export const authActions = slice.actions;

// thunks
export const logoutTC = (): AppThunk => (dispatch) => {
    dispatch(appActions.setAppStatus({ status: 'loading' }));
    authAPI
        .logout()
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(authActions.setUserName({ userName: '' }));
                dispatch(authActions.setIsLoggedIn({ isLoggedIn: false }));
                dispatch(appActions.setAppStatus({ status: 'succeeded' }));
                dispatch(todolistActions.clearData);
            } else {
                handleServerAppError(res.data, dispatch);
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch);
        });
};

export const loginTC =
    (data: LoginParamsType): AppThunk =>
    (dispatch) => {
        dispatch(appActions.setAppStatus({ status: 'loading' }));
        authAPI
            .login(data)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    // dispatch(setIsLoggedInAC(true));
                    dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }));
                    dispatch(appActions.setAppStatus({ status: 'succeeded' }));
                } else {
                    handleServerAppError(res.data, dispatch);
                }
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch);
            });
    };
export const meTC = (): AppThunk => (dispatch) => {
    dispatch(appActions.setAppStatus({ status: 'loading' }));
    authAPI
        .me()
        .then((res) => {
            if (res.resultCode === 0) {
                dispatch(authActions.setUserName({ userName: res.data.login }));
                dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }));
                dispatch(authActions.setIsInitialized({ isInitialized: true }));
                dispatch(appActions.setAppStatus({ status: 'succeeded' }));
            } else {
                dispatch(authActions.setIsInitialized({ isInitialized: true }));
                handleServerAppError(res, dispatch);
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch);
        });
};
