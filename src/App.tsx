import React, {useState} from 'react';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import s from './App.module.scss'
import {AddItemForm} from "./common/components/AddItemForm/AddItemForm";
import ButtonAppBar from "./common/components/AppBar/AppBar";
import {Paper} from "@mui/material";

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

// Tasks
    const removeTask = (todolistId: string, id: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== id)})


        // setTasks(tasks.filter(el => el.id != id))
    }
    const addTask = (todolistId: string, title: string) => {
        setTasks({...tasks, [todolistId]: [{id: v1(), title: title, isDone: false}, ...tasks[todolistId]]})


        // setTasks([{id: v1(), title: title, isDone: false}, ...tasks])
    }
    const changeTaskStatus = (todolistId: string, id: string, isDone: boolean) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(el => el.id === id ? {...el, isDone: isDone} : el)})

        // setTasks(tasks.map(el => el.id === id ? {...el, isDone: isDone} : el))
    }
    const changeFilter = (todolistId: string, filter: FilterType) => {
        setTodolists(todolists.map(tdl => tdl.id === todolistId ? {...tdl, filter: filter} : tdl))
    }

// Todolists
    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(tdl => tdl.id !== todolistId))
        delete tasks[todolistId]
        // setTasks({...tasks, [todolistId]: tasks[todolistId] = []})
        console.log(tasks)

    }

    const addTodolist = (title: string) => {
        const todolistId = v1()
        setTodolists([{id: todolistId, title: title, filter: 'all'}, ...todolists])
        setTasks({...tasks, [todolistId]: []})

    }


    return (
        <div className = {s.app}>
            <ButtonAppBar/>
            <div className = {s.app__container}>
                <div className={s.add__todolist}>
                    <AddItemForm title = {'+'} onEnterKey = {addTodolist} addItem = {addTodolist} />
                </div>
                {todolists.map((tdl) => {
                    console.log('todolist render')
                    return (
                        <Todolist
                                removeTodolist = {removeTodolist}
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
