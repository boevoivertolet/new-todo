import React, {MouseEvent} from "react";
import {TasksType} from "./App";

export const Todolist: React.FC<TodolistProps> = (props) => {
    const {title, tasks, removeTask, ...restProps} = props


    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input />
                <button>+</button>
            </div>
            <ul>
                {tasks.map(el => {
                    const onClickRemove = () => {
                        removeTask(el.id)
                        console.log(el.id)
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
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )

}
type TodolistProps = {
    title: string
    tasks: Array<TasksType>
    removeTask: (id: number) => void
}
