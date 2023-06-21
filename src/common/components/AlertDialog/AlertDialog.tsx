import React from 'react';
import Button from "@mui/material/Button";
import {Dialog, DialogActions, DialogTitle} from "@mui/material";
import {useAppSelector} from "../../../app/store";

export default function AlertDialog() {
    const userName = useAppSelector(state => state.auth.userName)
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant = "text" color = "inherit" onClick = {handleClickOpen}>
                {userName}
            </Button>
            <Dialog
                open = {open}
                onClose = {handleClose}
                aria-labelledby = "alert-dialog-title"
                aria-describedby = "alert-dialog-description"
            >
                <DialogTitle id = "alert-dialog-title">{"Sign out?"}</DialogTitle>
                <DialogActions>
                    <Button onClick = {handleClose} color = "primary">
                        No
                    </Button>
                    <Button onClick = {handleClose} color = "primary" autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
