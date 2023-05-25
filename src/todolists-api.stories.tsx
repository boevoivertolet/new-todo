import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default {
	title: 'API'
}

const settings = {
	withCredentials: true,
	'API-KEY': 'b9a47b16-0cbb-4fe2-8152-303706b5e3c1' as const
}

export const GetTodolists = () => {
	const [state, setState] = useState<any>(null)
	useEffect(() => {
		axios
			.get(
				'https://social-network.samuraijs.com/api/1.1/todo-lists',
				settings
			)
			.then((res) => {
				setState(res.data)
			})
	}, [])

	return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
	const [state, setState] = useState<any>(null)
	useEffect(() => {
		axios
			.post(
				'https://social-network.samuraijs.com/api/1.1/todo-lists',
				{ title: 'new Todolist 2' },
				settings
			)
			.then((res) => {
				setState(res.data)
			})
	}, [])

	return <div>{JSON.stringify(state)}</div>
}

const todolistId = 'd9f995f4-d173-46a2-ad7b-0d2be4b41543'

export const DeleteTodolist = () => {
	const [state, setState] = useState<any>(null)
	useEffect(() => {
		axios
			.delete(
				`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`,
				settings
			)
			.then((res) => {
				setState(res.data)
			})
	}, [])

	return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
	const [state, setState] = useState<any>(null)
	useEffect(() => {
		axios
			.put(
				`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`,
				{ title: 'REACT>>>>>>>>' },
				settings
			)
			.then((res) => {
				setState(res.data)
			})
	}, [])

	return <div>{JSON.stringify(state)}</div>
}
