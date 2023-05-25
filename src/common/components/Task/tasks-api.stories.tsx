import React, { useEffect, useState } from 'react'
import { taskAPI } from '../../../api/task-api'

export default {
	title: 'API'
}

export const GetTasks = () => {
	const [state, setState] = useState<any>(null)
	useEffect(() => {
		taskAPI.getTasks().then((res) => {
			setState(res.data)
		})
	}, [])

	return <div>{JSON.stringify(state)}</div>
}
export const CreateTask = () => {
	const [state, setState] = useState<any>(null)
	useEffect(() => {
		const title = 'New NEW TiTLE'
		taskAPI.createTasks(title).then((res) => {
			setState(res.data)
		})
	}, [])

	return <div>{JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
	const [state, setState] = useState<any>(null)
	useEffect(() => {
		const taskId = ''
		taskAPI.deleteTasks(taskId).then((res) => {
			setState(res.data)
		})
	}, [])

	return <div>{JSON.stringify(state)}</div>
}

export const UpdateTaskTitle = () => {
	const [state, setState] = useState<any>(null)
	useEffect(() => {
		const taskId = ''
		taskAPI
			.updateTask(taskId, '19234619826734918762349186273419823764')
			.then((res) => {
				setState(res.data)
			})
	}, [])

	return <div> {JSON.stringify(state)}</div>
}
