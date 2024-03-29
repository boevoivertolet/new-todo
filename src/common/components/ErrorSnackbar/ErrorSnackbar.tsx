import React, { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { useAppDispatch, useAppSelector } from "app/store";
import { appActions, ErrorType } from "app/app-reducer";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function ErrorSnackbar() {
	const error = useAppSelector<ErrorType>((state) => state.app.error);
	const dispatch = useAppDispatch();
	const [open, setOpen] = useState(true);

	const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
		if (reason === "clickaway") {
			return;
		}
		setOpen(false);
		dispatch(appActions.setAppError({ error: null }));
	};
	return (
		<Snackbar
			anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
			open={error !== null}
			autoHideDuration={6000}
			onClose={handleClose}
		>
			<Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
				{error}
			</Alert>
		</Snackbar>
	);
}
