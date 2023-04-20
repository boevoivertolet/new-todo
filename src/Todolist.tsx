import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterType, TasksType} from "./App";

export const Todolist: React.FC<TodolistProps> = (props) => {
    const {title, tasks, removeTask, ...restProps} = props

    let [filter, setFilter] = useState<FilterType>('all')
    let [inputValue, setInputValue] = useState<string>('')
    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)

    }
    const addTask = () => {
        restProps.addTask(inputValue)
        setInputValue('')
    }
    const enterPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            restProps.addTask(inputValue)
            setInputValue('')
        }
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
                <input onKeyDown = {enterPress} onChange = {onChangeInput} value = {inputValue} />
                <button onClick = {addTask}>+
                </button>
            </div>
            <ul>
                {filteredTasks.map(el => {
                    const onClickRemove = () => {
                        removeTask(el.id)
                    }
                    return (
                        <li key = {el.id}><input type = "checkbox" checked = {el.isDone} />
                            <span>{el.title}</span>
                            <button onClick = {onClickRemove}>-</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button onClick = {() => {
                    tasksFilter('all')
                }}>All
                </button>
                <button onClick = {() => {
                    tasksFilter('active')
                }}>Active
                </button>
                <button onClick = {() => {
                    tasksFilter('complete')
                }}>Completed
                </button>
            </div>
        </div>
    )

}
type TodolistProps = {
    title: string
    tasks: Array<TasksType>
    removeTask: (id: string) => void
    addTask: (title: string) => void

}
