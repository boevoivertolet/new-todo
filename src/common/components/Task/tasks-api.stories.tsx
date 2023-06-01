import React, { useEffect, useState } from 'react'
import { taskAPI } from '../../../api/task-api'

export default {
	title: 'API'
}

export const GetTasks = () => {
	const [state, setState] = useState<any>(null)
	const todolistId = '4380d5b6-88d7-4adc-ac5e-b41a8dfb73a2'
	useEffect(() => {
		taskAPI.getTasks(todolistId).then((res) => {
			setState(res.data.items)
		})
	}, [])

	return <div>{JSON.stringify(state)}</div>
}
export const CreateTask = () => {
	const [state, setState] = useState<any>(null)

	useEffect(() => {
		const todolistId = '4380d5b6-88d7-4adc-ac5e-b41a8dfb73a2'
		const title = 'Create Task another one'
		taskAPI.createTask(todolistId, title).then((res) => {
			setState(res.data.data)
		})
	}, [])

	return <div>{JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
	const [state, setState] = useState<any>(null)
	useEffect(() => {
		const todolistId = '4380d5b6-88d7-4adc-ac5e-b41a8dfb73a2'
		const taskId = '19f9ff3b-9bc3-498a-96cc-eefce61d67dd'
		taskAPI.deleteTasks(todolistId, taskId).then((res) => {
			setState(res.data)
		})
	}, [])

	return <div>{JSON.stringify(state)}</div>
}

export const UpdateTaskTitle = () => {
	const [state, setState] = useState<any>(null)
	useEffect(() => {
		const todolistId = '4380d5b6-88d7-4adc-ac5e-b41a8dfb73a2'
		const taskId = 'a1917a59-fd01-43c8-ad10-f53df26b44fa'
		taskAPI.updateTask(todolistId, taskId, 'New task Title').then((res) => {
			setState(res.data)
		})
	}, [])

	return <div> {JSON.stringify(state)}</div>
}
