import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterType, TasksType} from "./App";
import {MyButton} from "./common/components/MyButton";
import s from './Todolist.module.scss'
import {MyCheckBox} from "./common/components/MyCheckBox";
import {MyInput} from "./common/components/MyInput";

export const Todolist: React.FC<TodolistProps> = (props) => {
    const {title, tasks, removeTask, addTask, changeTaskStatus, ...restProps} = props

    let [filter, setFilter] = useState<FilterType>('all')
    let [inputValue, setInputValue] = useState<string>('')
    let [error, setError] = useState<string | null>(null)


    const onChangeTextHandler = (value: string) => {
        setInputValue(value)
        setError(null)
    }
    const addTaskHandler = () => {
        if (inputValue === '') {
            setError('Field is required')
            return
        }
        addTask(inputValue.trim())
        setInputValue('')
    }
    const enterPressHandler = (key: string) => {
        if (key === 'Enter') {
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


    const onChangeCheckboxHandler = (id: string, checked: boolean) => {
        changeTaskStatus(id, checked)
    }


    return (
        <div className = {s.todolist}>
            <h3>{title}</h3>
            <div>
                <MyInput
                    placeholder={'whats to do ?'}
                    error={error}
                    onEnterKey={enterPressHandler}
                    callBack = {onChangeTextHandler}
                    value = {inputValue} />

                <MyButton callBack = {addTaskHandler}>+</MyButton>
            </div>
            {error && <span className = {s.error__message}>{error}</span>}
            <ul>
                {filteredTasks.map(el => {

                    return (
                        <li className = {el.isDone ? s.isDone : ''} key = {el.id}>
                            <MyCheckBox checked = {el.isDone}
                                        callBack = {(checked) => onChangeCheckboxHandler(el.id, checked)} />
                            <span>{el.title}</span>
                            <MyButton callBack = {() => removeTaskHandler(el.id)}>-</MyButton>
                        </li>
                    )
                })}
            </ul>
            <div className = {s.btn__block}>
                <MyButton active = {filter === 'all'} callBack = {() => {
                    tasksFilter('all')
                }}>all</MyButton>
                <MyButton active = {filter === 'active'} callBack = {() => {
                    tasksFilter('active')
                }}>active
                </MyButton>
                <MyButton active = {filter === 'complete'} callBack = {() => {
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
