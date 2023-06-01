import React, { useCallback } from 'react'
import s from './Task.module.scss'
import { MyCheckBox } from '../MyCheckBox/MyCheckBox'
import { EditableInput } from '../EditableInput/EditableInput'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { Paper } from '@mui/material'

export const Task: React.FC<TaskProps> = React.memo((props) => {
	const {
		id,
		title,
		removeTask,
		todolistId,
		changeTaskStatus,
		changeTaskTitle,
		...restProps
	} = props
	const removeTaskHandler = useCallback(
		(todolistId: string, id: string) => {
			removeTask(id, todolistId)
		},
		[removeTask, id, todolistId]
	)
	const onChangeCheckboxHandler = useCallback(
		(todolistId: string, id: string, checked: boolean) => {
			changeTaskStatus(todolistId, id, checked)
		},
		[changeTaskStatus, todolistId, id]
	)

	const changeTaskTitleHandler = useCallback(
		(title: string) => {
			changeTaskTitle(todolistId, id, title)
		},
		[changeTaskTitle, todolistId, id]
	)

	return (
		<Paper
			style={{ transition: '1s' }}
			// className={isDone ? `${s.task + ' ' + s.isDone}` : s.task}
			className={s.task}
			key={id}>
			<MyCheckBox
				checked={false}
				callBack={(checked) =>
					onChangeCheckboxHandler(todolistId, id, checked)
				}
			/>
			<EditableInput
				changeTodolistTitle={changeTaskTitleHandler}
				value={title}
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
	changeTaskTitle: (id: string, taskId: string, title: string) => void
	todolistId: string
	id: string
	title: string
	removeTask: (todolistId: string, id: string) => void
	changeTaskStatus: (todolistId: string, id: string, isDone: boolean) => void
}
