import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default {
	title: 'API'
}

const settings = {
	withCredentials: true,
	'API-KEY': 'b9a47b16-0cbb-4fe2-8152-303706b5e3c1'
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
		axios.post(
			'https://social-network.samuraijs.com/api/1.1/todo-lists',
			{ title: 'new Todolist' },
			settings
		)
	}, [])

	return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
	const [state, setState] = useState<any>(null)
	useEffect(() => {}, [])

	return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
	const [state, setState] = useState<any>(null)
	useEffect(() => {}, [])

	return <div>{JSON.stringify(state)}</div>
}
