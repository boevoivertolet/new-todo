import React, {ChangeEvent, useCallback} from 'react'
import s from './Task.module.scss'

import { EditableInput } from '../../../common/components/EditableInput/EditableInput'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import {Checkbox, Paper} from '@mui/material'
import { TaskStatuses, TaskType } from '../../../api/task-api'

export const Task: React.FC<TaskProps> = React.memo((props) => {
	const {
		id,
		disabled,
		task,
		removeTask,
		todolistId,
		changeTaskStatus,
		changeTaskTitle,
		...restProps
	} = props
	const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		let newIsDoneValue = e.currentTarget.checked
		changeTaskStatus(todolistId,task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New, )
	}, [task.id, todolistId]);


	const removeTaskHandler = useCallback(
		(todolistId: string, id: string) => {
			removeTask(id, todolistId)
		},
		[removeTask, id, todolistId]
	)
	// const onChangeCheckboxHandler = useCallback(
	// 	(todolistId: string, id: string, status: TaskStatuses) => {
	// 		changeTaskStatus(todolistId, id, status)
	// 	},
	// 	[changeTaskStatus, todolistId, id]
	// )

	const changeTaskTitleHandler = useCallback(
		(title: string) => {
			changeTaskTitle(todolistId, id, title)
		},
		[changeTaskTitle, todolistId, id]
	)

	return (
		<Paper
			style={{ transition: '1s' }}
			className={s.task}
			key={id}>
			<Checkbox
				checked={task.status === TaskStatuses.Completed}
				color="primary"
				onChange={onChangeHandler}
			/>

			<EditableInput
				disabled={disabled}
				changeTodolistTitle={changeTaskTitleHandler}
				value={task.title}
			/>
			<DeleteForeverIcon

				style={{ color: '#2374CE' }}
				onClick={() => removeTaskHandler(id, todolistId)}>
				-
			</DeleteForeverIcon>
		</Paper>
	)
})



type TaskProps = {
	disabled?: boolean
	changeTaskTitle: (id: string, taskId: string, title: string) => void
	todolistId: string
	id: string
	task: TaskType
	removeTask: (todolistId: string, id: string) => void
	changeTaskStatus: (
		todolistId: string,
		id: string,
		status: TaskStatuses
	) => void
}
