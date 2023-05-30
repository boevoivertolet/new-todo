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
			setState(res.data)
		})
	}, [])

	return <div>{JSON.stringify(state)}</div>
}
export const CreateTask = () => {
	const [state, setState] = useState<any>(null)

	useEffect(() => {
		const todolistId = '4380d5b6-88d7-4adc-ac5e-b41a8dfb73a2'
		const title = 'Task Title'
		taskAPI.createTasks(todolistId, title).then((res) => {
			setState(res.data)
		})
	}, [])

	return <div>{JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
	const [state, setState] = useState<any>(null)
	useEffect(() => {
		const todolistId = '4380d5b6-88d7-4adc-ac5e-b41a8dfb73a2'
		const taskId = 'c9e46600-36cf-4eb2-91cd-ffe55667027d'
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
		const taskId = 'bba8cd5b-50e4-4756-a584-98aa517db0cb'
		taskAPI.updateTask(todolistId, taskId, 'New task Title').then((res) => {
			setState(res.data)
		})
	}, [])

	return <div> {JSON.stringify(state)}</div>
}
