import { appActions, AppInitialState, appReducer } from "app/app-reducer";

let startState: AppInitialState;
beforeEach(() => {
	startState = {
		error: null,
		status: "idle",
	};
});

test("correct message should be set", () => {
	const endState = appReducer(startState, appActions.setAppError({ error: "some error" }));
	expect(endState.error).toBe("some error");
});

test("correct status should be set", () => {
	const endState = appReducer(startState, appActions.setAppStatus({ status: "loading" }));
	expect(endState.status).toBe("loading");
});
