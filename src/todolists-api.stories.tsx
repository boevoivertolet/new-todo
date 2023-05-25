import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { todolistAPI } from './api/todolist-api'

export default {
	title: 'API'
}

export const GetTodolists = () => {
	const [state, setState] = useState<any>(null)
	useEffect(() => {
		todolistAPI.getTodolists().then((res) => {
			setState(res.data)
		})
	}, [])

	return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
	const [state, setState] = useState<any>(null)
	useEffect(() => {
		const title = 'New NEW TiTLE'
		todolistAPI.createTodolists(title).then((res) => {
			setState(res.data)
		})
	}, [])

	return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
	const [state, setState] = useState<any>(null)
	useEffect(() => {
		const todolistId = 'c5c136b4-2757-4fc7-8990-c51a264abd42'
		todolistAPI.deleteTodolist(todolistId).then((res) => {
			setState(res.data)
		})
	}, [])

	return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
	const [state, setState] = useState<any>(null)
	useEffect(() => {
		const todolistId = 'c5c136b4-2757-4fc7-8990-c51a264abd42'
		todolistAPI
			.updateTodolist(todolistId, '19234619826734918762349186273419823764')
			.then((res) => {
				setState(res.data)
			})
	}, [])

	return <div> {JSON.stringify(state)}</div>
}
