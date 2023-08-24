import React from "react";
import Button from "@mui/material/Button";
import { Dialog, DialogActions, DialogTitle } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import { logoutTC } from "../../../features/Login/auth-reducer";

export default function AlertDialog() {
    const dispatch = useAppDispatch();
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleYesClose = () => {
        dispatch(logoutTC());
        setOpen(false);
    };

    return (
        <div>
            <Button variant="text" color="inherit" onClick={handleClickOpen}>
                {isLoggedIn && "logout"}
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Sign out?"}</DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        No
                    </Button>
                    <Button onClick={handleYesClose} color="primary" autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
