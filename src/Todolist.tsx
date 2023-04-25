import React, {useState} from "react";
import {FilterType, TasksType} from "./App";
import {MyButton} from "./common/components/MyButton/MyButton";
import s from './Todolist.module.scss'
import {MyCheckBox} from "./common/components/MyCheckBox/MyCheckBox";
import {AddItemForm} from "./common/components/AddItemForm/AddItemForm";

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
        <div className = {s.todolist}>
            <h3>
                {title}
                <MyButton callBack = {removeTodolistHandler}>-</MyButton>
            </h3>

            <div>
                <AddItemForm placeholder = {'whats to do ?'} onEnterKey = {(value) => addTask(todolistId, value)}
                             addItem = {(value) => addTask(todolistId, value)} title = {'+'} />
            </div>

            <div className = {s.tasks__block}>
                {filteredTasks.map(el => {
                    return (
                        <div className = {el.isDone ? s.isDone : ''} key = {el.id}>
                            <MyCheckBox checked = {el.isDone}
                                        callBack = {(checked) => onChangeCheckboxHandler(todolistId, el.id, checked)} />
                            <span>{el.title}</span>
                            <MyButton callBack = {() => removeTaskHandler(el.id, todolistId)}>-</MyButton>
                        </div>
                    )
                })}
            </div>
            <div className = {s.btn__block}>
                <MyButton active = {filter === 'all'} callBack = {() => {
                    changeFilter(todolistId, 'all')
                }}>all</MyButton>
                <MyButton active = {filter === 'active'} callBack = {() => {
                    changeFilter(todolistId, 'active')
                }}>active
                </MyButton>
                <MyButton active = {filter === 'complete'} callBack = {() => {
                    changeFilter(todolistId, 'complete')
                }}>complete
                </MyButton>
            </div>
        </div>
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
