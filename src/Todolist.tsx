import React from "react";
import {FilterType, TasksType} from "./App";
import {MyButton} from "./common/components/MyButton/MyButton";
import s from './Todolist.module.scss'
import {AddItemForm} from "./common/components/AddItemForm/AddItemForm";
import {EditableInput} from "./common/components/EditableInput/EditableInput";
import {ButtonGroup, Paper} from "@mui/material";
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import {Task} from "./common/components/Task/Task";

export const Todolist: React.FC<TodolistProps> = (props) => {
    const {
        title,
        tasks,
        removeTask,
        addTask,
        changeTaskStatus,
        changeFilter,
        removeTodolist,
        filter,
        todolistId,
        ...restProps
    } = props


    const addItemHandler = (value: string) => addTask(todolistId, value)


    let filteredTasks = tasks[todolistId]
    if (filter === 'active') {
        filteredTasks = tasks[todolistId].filter(el => !el.isDone)
    }

    if (filter === 'complete') {
        filteredTasks = tasks[todolistId].filter(el => el.isDone)
    }


    const removeTodolistHandler = () => {
        removeTodolist(todolistId)
    }

    return (
        <Paper elevation = {3} className = {s.todolist}>
            <ClearOutlinedIcon style = {{alignSelf: 'end'}} onClick = {removeTodolistHandler}></ClearOutlinedIcon>
            <div className = {s.title__block}>
                <EditableInput value = {title} />
            </div>

            <div>
                <AddItemForm placeholder = {'whats to do?'} onEnterKey = {addItemHandler}
                             addItem = {addItemHandler} title = {'+'} />
            </div>

            <div className = {s.tasks__block}>
                {filteredTasks.map(el => {
                    return (
                        <Task todolistId = {todolistId} removeTask = {removeTask} title = {el.title} id = {el.id}
                              isDone = {el.isDone} changeTaskStatus = {changeTaskStatus} />
                    )
                })}
            </div>
            <ButtonGroup variant = "contained" aria-label = "outlined primary button group">
                <MyButton disabled = {filter === 'all'} active = {filter === 'all'}
                          callBack = {() => {
                              changeFilter(todolistId, 'all')
                          }}>all</MyButton>
                <MyButton disabled = {filter === 'active'} active = {filter === 'active'}
                          callBack = {() => {
                              changeFilter(todolistId, 'active')
                          }}>active
                </MyButton>
                <MyButton disabled = {filter === 'complete'} active = {filter === 'complete'}
                          callBack = {() => {
                              changeFilter(todolistId, 'complete')
                          }}>complete
                </MyButton>
            </ButtonGroup>
            <div className = {s.btn__block}>


            </div>
        </Paper>
    )

}
type TodolistProps = {
    removeTodolist: (todolistId: string) => void
    todolistId: string
    title: string
    tasks: TasksType
    removeTask: (todolistId: string, id: string) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, id: string, isDone: boolean) => void
    filter: FilterType
    changeFilter: (todolistId: string, filter: FilterType) => void
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
