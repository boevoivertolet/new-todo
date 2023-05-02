import React from 'react';
import {TaskType, Todolist} from "./Todolist";
import s from './App.module.scss'
import {AddItemForm} from "./common/components/AddItemForm/AddItemForm";
import ButtonAppBar from "./common/components/AppBar/AppBar";
import {useAppDispatch, useAppSelector} from "./store/store";
import {addAC, changeStatusAC, removeAC} from "./reducers/taskReducer";
import {addTodolistAC, changeFilterAC, removeTodolistAC} from "./reducers/todolistsReducer";


function App() {
    const dispatch = useAppDispatch()
    const tasks = useAppSelector(state => state.tasks)
    const todolists = useAppSelector<TodolistsType[]>(state => state.todolists)


// Tasks
    const removeTask = (todolistId: string, id: string) => {
        dispatch(removeAC(todolistId, id))
    }
    const addTask = (todolistId: string, title: string) => {
        dispatch(addAC(todolistId, title))
    }
    const changeTaskStatus = (todolistId: string, id: string, isDone: boolean) => {
        dispatch(changeStatusAC(todolistId, id, isDone))
    }


    const changeFilter = (todolistId: string, filter: FilterType) => {
        dispatch(changeFilterAC(todolistId, filter))
    }

// Todolists
    const removeTodolist = (todolistId: string) => {
        dispatch(removeTodolistAC(todolistId))
        delete tasks[todolistId]
    }

    const addTodolist = (title: string) => {
        dispatch(addTodolistAC(title))


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
