import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

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
        console.log(tasks[2].isDone +' ' + ' '+  tasks[2].title)
    }


    return (
        <div className = "App">
            <Todolist
                title = {'what to learn'}
                tasks = {tasks}
                removeTask = {removeTask}
                addTask = {addTask}
                changeTaskStatus={changeTaskStatus}
            />
        </div>
    );
}

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterType = 'all' | 'active' | 'complete'




export default App;
