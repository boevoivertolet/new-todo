import React, {useState} from 'react';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import s from './App.module.scss'

function App() {


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


    return (
        <div className = {s.app}>
            <Todolist
                title = {'what to learn'}
                tasks = {tasks}
                removeTask = {removeTask}
                addTask = {addTask}
                changeTaskStatus = {changeTaskStatus}
            />
        </div>
    );
}
export type FilterType = 'all' | 'active' | 'complete'
export type TasksType = {
    id: string
    title: string
    isDone: boolean
}



export default App;
