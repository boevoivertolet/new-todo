import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterType, TasksType} from "./App";
import {MyButton} from "./components/MyButton";
import s from './Todolist.module.css'

export const Todolist: React.FC<TodolistProps> = (props) => {
    const {title, tasks, removeTask, addTask, changeTaskStatus, ...restProps} = props

    let [filter, setFilter] = useState<FilterType>('all')
    let [inputValue, setInputValue] = useState<string>('')
    let [error, setError] = useState<boolean>(false)


    const onChangeTextHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
        setError(false)
    }
    const addTaskHandler = () => {
        if (inputValue === '') {
            setError(true)
            return
        }
        addTask(inputValue.trim())
        setInputValue('')
    }
    const enterPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTask(inputValue)
            setInputValue('')
        }
    }

    const removeTaskHandler = (id: string) => {
        removeTask(id)
    }


    const tasksFilter = (filter: FilterType) => {
        setFilter(filter)
    }

    let filteredTasks = tasks
    if (filter === 'active') {
        filteredTasks = tasks.filter(el => !el.isDone)
    }

    if (filter === 'complete') {
        filteredTasks = tasks.filter(el => el.isDone)
    }


    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input
                    className = {error ? s.error : ''}
                    onKeyDown = {enterPressHandler}
                    onChange = {onChangeTextHandler}
                    value = {inputValue} />
                <MyButton callBack = {addTaskHandler}>+</MyButton>
            </div>
            {error && <span className = {s.error__message}>Field is required</span>}
            <ul>
                {filteredTasks.map(el => {
                    const onChangeCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        changeTaskStatus(el.id, e.currentTarget.checked)
                    }

                    return (
                        <li key = {el.id}><input type = "checkbox" checked = {el.isDone}
                                                 onChange = {onChangeCheckboxHandler} />
                            <span>{el.title}</span>
                            <MyButton callBack = {() => removeTaskHandler(el.id)}>-</MyButton>
                        </li>
                    )
                })}
            </ul>
            <div>
                <MyButton callBack = {() => {
                    tasksFilter('all')
                }}>all</MyButton>
                <MyButton callBack = {() => {
                    tasksFilter('active')
                }}>active
                </MyButton>
                <MyButton callBack = {() => {
                    tasksFilter('complete')
                }}>complete
                </MyButton>
            </div>
        </div>
    )

}
type TodolistProps = {
    title: string
    tasks: Array<TasksType>
    removeTask: (id: string) => void
    addTask: (title: string) => void
    changeTaskStatus: (id: string, isDone: boolean) => void

}
