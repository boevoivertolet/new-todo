import React from 'react'
import {TodolistsList} from "../features/TodolistsList";
import s from "./App.module.scss";
import ButtonAppBar from "../common/components/AppBar/AppBar";
import {Login} from "../features/Login/Login";


function App() {
	return (
		<div className={s.app}>
				<ButtonAppBar />
			<div>
				<TodolistsList/>

			</div>
		</div>
	)
}




export default App
