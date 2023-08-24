import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { LinearProgress } from "@mui/material";
import { useAppSelector } from "../../../app/store";
import { RequestStatusType } from "../../../app/app-reducer";
import { ErrorSnackbar } from "../ErrorSnackbar/ErrorSnackbar";
import AlertDialog from "../AlertDialog/AlertDialog";

export default function ButtonAppBar() {
    const status = useAppSelector<RequestStatusType>((state) => state.app.status);
    const userName = useAppSelector((state) => state.auth.userName);

    return (
        <Box sx={{ flexGrow: 1 }} style={{ marginTop: "64px" }}>
            <ErrorSnackbar />
            <AppBar position="static">
                <Toolbar>
                    <IconButton size="small" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {userName}
                    </Typography>
                    <AlertDialog />
                </Toolbar>
                {status === "loading" && <LinearProgress />}
            </AppBar>
        </Box>
    );
}
