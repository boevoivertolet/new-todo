import React, {useState} from 'react';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import s from './App.module.scss'
import {AddItemForm} from "./common/components/AddItemForm/AddItemForm";
import ButtonAppBar from "./common/components/AppBar/AppBar";
import {useAppDispatch, useAppSelector} from "./store/store";
import {remove} from "./reducers/taskReducer";


function App() {
    const dispatch = useAppDispatch()
    const tasks = useAppSelector(state => state.tasks)
    const todolists = useAppSelector(state => state.todolists)




// Tasks
    const removeTask = (todolistId: string, id: string) => {
        dispatch(remove(todolistId, id))


        // setTasks(tasks.filter(el => el.id != id))
    }
    const addTask = (todolistId: string, title: string) => {
        // setTasks({...tasks, [todolistId]: [{id: v1(), title: title, isDone: false}, ...tasks[todolistId]]})


        // setTasks([{id: v1(), title: title, isDone: false}, ...tasks])
    }
    const changeTaskStatus = (todolistId: string, id: string, isDone: boolean) => {
        // setTasks({...tasks, [todolistId]: tasks[todolistId].map(el => el.id === id ? {...el, isDone: isDone} : el)})

        // setTasks(tasks.map(el => el.id === id ? {...el, isDone: isDone} : el))
    }
    const changeFilter = (todolistId: string, filter: FilterType) => {
        // setTodolists(todolists.map(tdl => tdl.id === todolistId ? {...tdl, filter: filter} : tdl))
    }

// Todolists
    const removeTodolist = (todolistId: string) => {
        // setTodolists(todolists.filter(tdl => tdl.id !== todolistId))
        // delete tasks[todolistId]
        // setTasks({...tasks, [todolistId]: tasks[todolistId] = []})


    }

    const addTodolist = (title: string) => {
        const todolistId = v1()
        // setTodolists([{id: todolistId, title: title, filter: 'all'}, ...todolists])
        // setTasks({...tasks, [todolistId]: []})

    }


    return (
        <div className = {s.app}>
            <header><ButtonAppBar /></header>
            <div className = {s.app__container}>
                <div className = {s.add__todolist}>
                    <AddItemForm title = {'+'} onEnterKey = {addTodolist} addItem = {addTodolist} />
                </div>
                {todolists.length
                    ? todolists.map((tdl) => {
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
                    : <h1 style = {{color: 'black'}}>to get started, create your first to-do list...</h1>

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

// export type TasksType = {
//     [key: string]: TaskType[]
// }
export type TasksType = {
    [key: string]: TaskType[]
}


export default App;
