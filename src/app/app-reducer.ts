import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const slice = createSlice({
	name: 'app',
	initialState: {
		status: 'loading' as RequestStatusType,
		error: null as ErrorType,
	},
	reducers: {
		setAppStatus: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
			state.status = action.payload.status;
		},
		setAppError: (state, action: PayloadAction<{ error: ErrorType }>) => {
			state.error = action.payload.error;
		},
	},
});
export const appReducer = slice.reducer;
export const appActions = slice.actions;
export type AppInitialState = ReturnType<typeof slice.getInitialState>;

//types
export type ErrorType = string | null;
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';
