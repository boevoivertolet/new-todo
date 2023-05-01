import React, {useState} from "react";
import {FilterType, TasksType} from "./App";
import {MyButton} from "./common/components/MyButton/MyButton";
import s from './Todolist.module.scss'
import {MyCheckBox} from "./common/components/MyCheckBox/MyCheckBox";
import {AddItemForm} from "./common/components/AddItemForm/AddItemForm";
import {EditableInput} from "./common/components/EditableInput/EditableInput";
import {ButtonGroup, Paper} from "@mui/material";
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

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

    const styleRemoveButton = {
        maxWidth: '25px',
        maxHeight: '25px',
        minWidth: '25px',
        minHeight: '25px',
        borderRadius: '50%',
        background: '#16BCD6'
    }
    const styleButtonBlock = {
        background: '#16BCD6'
    }
    const styleCheckBox = {
        maxWidth: '15px',
        maxHeight: '15px',
        minWidth: '15px',
        minHeight: '15px',
        color: '#16BCD6'
    }

    const addItemHandler = (value: string) => addTask(todolistId, value)

    const removeTaskHandler = (todolistId: string, id: string) => {
        removeTask(id, todolistId)

    }


    let filteredTasks = tasks[todolistId]
    if (filter === 'active') {
        filteredTasks = tasks[todolistId].filter(el => !el.isDone)
    }

    if (filter === 'complete') {
        filteredTasks = tasks[todolistId].filter(el => el.isDone)
    }


    const onChangeCheckboxHandler = (todolistId: string, id: string, checked: boolean) => {
        changeTaskStatus(todolistId, id, checked)
    }

    const removeTodolistHandler = () => {
        removeTodolist(todolistId)
    }

    return (
        <Paper elevation={3} className = {s.todolist}>
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
                        <div className = {el.isDone ? `${s.task + ' ' + s.isDone}` : s.task} key = {el.id}>
                            <MyCheckBox style = {styleCheckBox} checked = {el.isDone}
                                        callBack = {(checked) => onChangeCheckboxHandler(todolistId, el.id, checked)} />
                            <EditableInput value = {el.title} />
                            <DeleteForeverIcon style={{color:'#16BCD6'}}
                                onClick = {() => removeTaskHandler(el.id, todolistId)}>-</DeleteForeverIcon>
                        </div>
                    )
                })}
            </div>
            <ButtonGroup variant = "contained" aria-label = "outlined primary button group">
                <MyButton style = {styleButtonBlock} disabled = {filter === 'all'} active = {filter === 'all'}
                          callBack = {() => {
                              changeFilter(todolistId, 'all')
                          }}>all</MyButton>
                <MyButton style = {styleButtonBlock} disabled = {filter === 'active'} active = {filter === 'active'}
                          callBack = {() => {
                              changeFilter(todolistId, 'active')
                          }}>active
                </MyButton>
                <MyButton style = {styleButtonBlock} disabled = {filter === 'complete'} active = {filter === 'complete'}
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
