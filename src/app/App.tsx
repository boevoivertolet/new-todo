import React, {useEffect} from 'react'
import {TodolistsList} from "../features/TodolistsList";
import s from "./App.module.scss";
import ButtonAppBar from "../common/components/AppBar/AppBar";
import {Login} from "../features/Login/Login";
import {Navigate, Route, Routes} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "./store";
import {meTC} from "../features/Login/auth-reducer";
import {CircularProgress} from "@mui/material";


function App() {
    const dispatch = useAppDispatch()
    const isInitialized = useAppSelector<boolean>((state) => state.auth.isInitialized)


    useEffect(() => {
        dispatch(meTC())
    }, [])


    if (!isInitialized) {
        return <div
            style = {{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress />
        </div>
    }
    return (
        <div className = {s.app}>
            <ButtonAppBar />
            <Routes>
                <Route path = '/' element = {<TodolistsList />} />
                <Route path = '/login' element = {<Login />} />

                <Route path = '/404' element = {<h1 style = {{textAlign: 'center'}}>404: PAGE NOT FOUND</h1>} />
                <Route path = '*' element = {<Navigate to = {'/404'} />} />
            </Routes>
        </div>
    )
}

export default App
