import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";

function App() {
    const [tasks, setTasks] = useState<Array<TasksType>>([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJs', isDone: false}
    ])


    const removeTask = (id: number) => {
        setTasks(tasks.filter(el => el.id != id))

    }

    return (
        <div className = "App">
            <Todolist
                title = {'what to learn'}
                tasks = {tasks}
                removeTask = {removeTask}
            />
        </div>
    );
}

export type TasksType = {
    id: number
    title: string
    isDone: boolean
}


export default App;
