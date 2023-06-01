import React, { useCallback, useEffect } from 'react'
import { Todolist } from './Todolist'
import s from './App.module.scss'
import { AddItemForm } from './common/components/AddItemForm/AddItemForm'
import ButtonAppBar from './common/components/AppBar/AppBar'
import { useAppDispatch, useAppSelector } from './store/store'
import {
	TasksStateType,
	addAC,
	addTasksTC,
	changeStatusAC,
	changeTaskTitleAC,
	removeAC,
	removeTasksTC
} from './reducers/taskReducer'
import {
	TodolistDomainType,
	addTodolistAC,
	changeFilterAC,
	changeTodolistTitleAC,
	fetchTodolistsTC,
	removeTodolistAC
} from './reducers/todolistsReducer'

function App() {
	const dispatch = useAppDispatch()
	const tasks = useAppSelector<TasksStateType>((state) => state.tasks)
	const todolists = useAppSelector<TodolistDomainType[]>(
		(state) => state.todolists
	)

	// Tasks
	const removeTask = useCallback((todolistId: string, id: string) => {
		dispatch(removeTasksTC(todolistId, id))
	}, [])
	const addTask = useCallback((todolistId: string, title: string) => {
		dispatch(addTasksTC(todolistId, title))
	}, [])
	const changeTaskStatus = useCallback(
		(todolistId: string, id: string, isDone: boolean) => {
			dispatch(changeStatusAC(todolistId, id, isDone))
		},
		[]
	)

	const changeFilter = useCallback(
		(todolistId: string, filter: FilterType) => {
			dispatch(changeFilterAC(todolistId, filter))
		},
		[]
	)

	// Todolists
	const removeTodolist = useCallback((todolistId: string) => {
		dispatch(removeTodolistAC(todolistId))
	}, [])

	const addTodolist = useCallback((title: string) => {
		dispatch(addTodolistAC(title))
	}, [])

	const changeTodolistTitle = useCallback((id: string, title: string) => {
		dispatch(changeTodolistTitleAC(id, title))
	}, [])
	const changeTaskTitle = useCallback(
		(id: string, taskId: string, title: string) => {
			dispatch(changeTaskTitleAC(id, taskId, title))
		},
		[]
	)
	useEffect(() => {
		dispatch(fetchTodolistsTC())
	}, [])

	return (
		<div className={s.app}>
			<header>
				<ButtonAppBar />
			</header>
			<div className={s.app__container}>
				<div className={s.add__todolist}>
					<AddItemForm
						title={'+'}
						onEnterKey={addTodolist}
						addItem={addTodolist}
					/>
				</div>
				{todolists.length ? (
					todolists.map((tdl) => {
						let allTodolistTasks = tasks[tdl.id]
						return (
							<Todolist
								changeTodolistTitle={changeTodolistTitle}
								removeTodolist={removeTodolist}
								changeFilter={changeFilter}
								todolistId={tdl.id}
								title={tdl.title}
								tasks={allTodolistTasks}
								removeTask={removeTask}
								addTask={addTask}
								changeTaskStatus={changeTaskStatus}
								changeTaskTitle={changeTaskTitle}
								filter={tdl.filter}
								key={tdl.id}
							/>
						)
					})
				) : (
					<h1 style={{ color: 'black' }}>
						to get started, create your first to-do list...
					</h1>
				)}
			</div>
		</div>
	)
}

export type FilterType = 'all' | 'active' | 'complete'

// export type TasksType = {
// 	[key: string]: TaskType[]
// }

export default App
