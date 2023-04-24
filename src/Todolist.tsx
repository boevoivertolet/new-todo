import React, {useState} from "react";
import {FilterType, TasksType} from "./App";
import {MyButton} from "./common/components/MyButton";
import s from './Todolist.module.scss'
import {MyCheckBox} from "./common/components/MyCheckBox";
import {MyInput} from "./common/components/MyInput";

export const Todolist: React.FC<TodolistProps> = (props) => {
    const {title, tasks, removeTask, addTask, changeTaskStatus, changeFilter, filter, todolistId, ...restProps} = props

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

    const removeTaskHandler = (todolistId: string, id: string) => {
        removeTask(id, todolistId)
        console.log(id, todolistId)
    }


    let filteredTasks = tasks[todolistId]
    if (filter === 'active') {
        filteredTasks = tasks[todolistId].filter(el => !el.isDone)
    }

    if (filter === 'complete') {
        filteredTasks = tasks[todolistId].filter(el => el.isDone)
    }


    const onChangeCheckboxHandler = (id: string, checked: boolean) => {
        changeTaskStatus(id, checked)
    }


    return (
        <div className = {s.todolist}>
            <h3>{title}</h3>
            <div>
                <MyInput
                    placeholder = {'whats to do ?                                                                                                           '}
                    error = {error}
                    onEnterKey = {enterPressHandler}
                    callBack = {onChangeTextHandler}
                    value = {inputValue} />

                <MyButton callBack = {addTaskHandler}>+</MyButton>
            </div>
            {error && <span className = {s.error__message}>{error}</span>}
            <div className = {s.tasks__block}>
                {filteredTasks.map(el => {

                    return (
                        <div className = {el.isDone ? s.isDone : ''} key = {el.id}>
                            <MyCheckBox checked = {el.isDone}
                                        callBack = {(checked) => onChangeCheckboxHandler(el.id, checked)} />
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
    todolistId: string
    title: string
    tasks: TasksType
    removeTask: (todolistId: string, id: string) => void
    addTask: (title: string) => void
    changeTaskStatus: (id: string, isDone: boolean) => void
    filter: FilterType
    changeFilter: (todolistId: string, filter: FilterType) => void
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
