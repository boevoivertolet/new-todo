import React from 'react'
import {TodolistsList} from "../features/TodolistsList";
import s from "./App.module.scss";
import ButtonAppBar from "../common/components/AppBar/AppBar";
import {Login} from "../features/Login/Login";
import {Route, Routes} from "react-router-dom";


function App() {
    return (
        <div className = {s.app}>
            <ButtonAppBar />
                <Routes>
                    <Route path = '/' element = {<TodolistsList />}/>
                    <Route path = '/login' element = {<Login />} />
                </Routes>
        </div>
    )
}

export default App
