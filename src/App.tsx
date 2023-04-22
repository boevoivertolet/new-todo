import React, {useState} from 'react';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import s from './App.module.scss'

function App() {
    const [todolists, setTodolists] = useState<Array<TodolistsType>>(
        [
            {id: v1(), title: 'What to learn', filter: 'all'},
            {id: v1(), title: 'What to buy', filter: 'all'},
        ]
    )

    const [tasks, setTasks] = useState<Array<TasksType>>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJs', isDone: false}
    ])


    const removeTask = (id: string) => setTasks(tasks.filter(el => el.id != id))
    const addTask = (title: string) => {
        setTasks([{id: v1(), title: title, isDone: false}, ...tasks])
    }
    const changeTaskStatus = (id: string, isDone: boolean) => {
        setTasks(tasks.map(el => el.id === id ? {...el, isDone: isDone} : el))
    }
    const changeFilter = (todolistId: string, filter: FilterType) => {
        setTodolists(todolists.map(tdl => tdl.id === todolistId ? {...tdl, filter: filter} : tdl))
    }


    return (
        <div className = {s.app}>
            <header> Header</header>
            <div className = {s.app__container}>
                {todolists.map((tdl) => {
                    return (
                        <Todolist
                            changeFilter = {changeFilter}
                            todolistId = {tdl.id}
                            title = {tdl.title}
                            tasks = {tasks}
                            removeTask = {removeTask}
                            addTask = {addTask}
                            changeTaskStatus = {changeTaskStatus}
                            filter = {tdl.filter}
                            key = {tdl.id}
                        />
                    )
                })

                }

            </div>
        </div>
    );
}

export type FilterType = 'all' | 'active' | 'complete'


export type TodolistsType = {
    id: string
    title: string
    filter: FilterType
}

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}


export default App;
