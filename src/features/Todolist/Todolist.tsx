import React, {useCallback, useEffect} from 'react'
import {MyButton} from '../../common/components/MyButton/MyButton'
import s from './Todolist.module.scss'
import {AddItemForm} from '../../common/components/AddItemForm/AddItemForm'
import {EditableInput} from '../../common/components/EditableInput/EditableInput'
import {ButtonGroup, Paper} from '@mui/material'
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined'
import {Task} from './Task/Task'
import {TaskStatuses, TaskType} from '../../api/task-api'
import {useAppDispatch} from '../../app/store'
import {fetchTasksTC} from '../taskReducer'
import {FilterType} from "../TodolistsList";
import {RequestStatusType} from "../../app/app-reducer";
import IconButton from "@mui/material/IconButton";
import {Delete} from "@mui/icons-material";
import {changeTodolistEntityStatusAC} from "../todolistsReducer";

export const Todolist: React.FC<TodolistProps> = React.memo((props) => {
    const dispatch = useAppDispatch()
    console.log('Todolist called')
    const {
        entityStatus,
        title,
        tasks,
        changeTaskTitle,
        removeTask,
        addTask,
        changeTaskStatus,
        changeFilter,
        removeTodolist,
        changeTodolistTitle,
        filter,
        todolistId,
        ...restProps
    } = props

    const addItemHandler = useCallback(
        (value: string) => addTask(todolistId, value),
        [addTask, todolistId]
    )

    let filteredTasks = tasks
    if (filter === 'active') {
        filteredTasks = tasks.filter(t => t.status === TaskStatuses.New)
    }

    if (filter === 'complete') {
        filteredTasks = tasks.filter(t => t.status === TaskStatuses.Completed)
    }

    const removeTodolistHandler = useCallback(() => {
        removeTodolist(todolistId)
        dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'))
    }, [removeTodolist, todolistId])
    const changeTodolistTitleHandler = useCallback(
        (title: string) => {
            changeTodolistTitle(todolistId, title)
        },
        [changeTodolistTitle, todolistId]
    )

    useEffect(() => {
        dispatch(fetchTasksTC(todolistId))
    }, [])

    return (
        <Paper elevation = {3} className = {s.todolist}>
            <IconButton
                disabled = {entityStatus === 'loading'}
                style = {{alignSelf: 'end'}}
                onClick = {removeTodolistHandler}>
                <Delete />
            </IconButton>
            <div className = {s.title__block}>
                <EditableInput
                    changeTodolistTitle = {changeTodolistTitleHandler}
                    value = {title}
                />
            </div>

            <div>
                <AddItemForm
                    disabled = {entityStatus === 'loading'}
                    placeholder = {'whats to do?'}
                    onEnterKey = {addItemHandler}
                    addItem = {addItemHandler}
                    title = {'+'}
                />
            </div>

            <div className = {s.tasks__block}>
                {filteredTasks.map((el) => <Task
                        disabled = {el.entityStatus === 'loading'}
                        task = {el}
                        id = {el.id}
                        todolistId = {todolistId}
                        changeTaskTitle = {changeTaskTitle}
                        removeTask = {removeTask}
                        changeTaskStatus = {changeTaskStatus}
                    />
                )}
            </div>
            <ButtonGroup
                variant = 'contained'
                aria-label = 'outlined primary button group'>
                <MyButton
                    disabled = {filter === 'all'}
                    active = {filter === 'all'}
                    callBack = {useCallback(() => {
                        changeFilter(todolistId, 'all')
                    }, [changeFilter, todolistId])}>
                    all
                </MyButton>
                <MyButton
                    disabled = {filter === 'active'}
                    active = {filter === 'active'}
                    callBack = {useCallback(() => {
                        changeFilter(todolistId, 'active')
                    }, [changeFilter, todolistId])}>
                    active
                </MyButton>
                <MyButton
                    disabled = {filter === 'complete'}
                    active = {filter === 'complete'}
                    callBack = {useCallback(() => {
                        changeFilter(todolistId, 'complete')
                    }, [changeFilter, todolistId])}>
                    complete
                </MyButton>
            </ButtonGroup>
            <div className = {s.btn__block}></div>
        </Paper>
    )
})

type TodolistProps = {
    entityStatus: RequestStatusType
    changeTodolistTitle: (id: string, title: string) => void
    changeTaskTitle: (id: string, taskId: string, title: string) => void
    removeTodolist: (todolistId: string) => void
    todolistId: string
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistId: string, id: string) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (
        todolistId: string,
        id: string,
        status: TaskStatuses
    ) => void
    filter: FilterType
    changeFilter: (todolistId: string, filter: FilterType) => void
}
