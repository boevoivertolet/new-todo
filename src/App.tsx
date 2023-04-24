import React, {useState} from 'react';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import s from './App.module.scss'

function App() {


    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TasksType>({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},

        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    })


    const removeTask = (todolistId: string, id: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== id)})


        // setTasks(tasks.filter(el => el.id != id))
    }
    const addTask = (todolistId: string, title: string) => {
         setTasks({...tasks, [todolistId]:[...tasks[todolistId],{id: v1(), title: title, isDone: false}]})


        // setTasks([{id: v1(), title: title, isDone: false}, ...tasks])
    }
    const changeTaskStatus = (todolistId: string,id: string, isDone: boolean) => {
        setTasks({...tasks, [todolistId]:tasks[todolistId].map(el => el.id === id ? {...el, isDone: isDone} : el)})

        // setTasks(tasks.map(el => el.id === id ? {...el, isDone: isDone} : el))
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
    [key: string]: TaskType[]
}


export default App;
