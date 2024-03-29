import { Dispatch } from "redux";
import { ResponseType } from "api/todolist-api";
import { appActions } from "app/app-reducer";

// generic function
export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: ErrorUtilsDispatchType) => {
	if (data.messages.length) {
		dispatch(appActions.setAppError({ error: data.messages[0] }));
	} else {
		dispatch(appActions.setAppError({ error: "Some error occurred" }));
	}
	dispatch(appActions.setAppStatus({ status: "failed" }));
};

export const handleServerNetworkError = (error: { message: string }, dispatch: ErrorUtilsDispatchType) => {
	dispatch(appActions.setAppError({ error: error.message }));
	dispatch(appActions.setAppStatus({ status: "failed" }));
};

type ErrorUtilsDispatchType = Dispatch;
