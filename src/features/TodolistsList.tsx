import React, { useCallback, useEffect } from 'react';
import s from '../app/App.module.scss';
import { AddItemForm } from 'common/components/AddItemForm/AddItemForm';
import { Todolist } from './Todolist/Todolist';
import { useAppDispatch } from 'app/store';
import { addTasksTC, removeTaskTC, updateTaskTC } from './taskReducer';
import {
    addTodolistTC,
    changeTodolistTitleTC,
    fetchTodolistsTC,
    removeTodolistTC,
    todolistActions,
    TodolistDomainType,
} from './todolistsReducer';
import { TaskStatuses } from 'api/task-api';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn, selectTasks, selectTodolists } from 'features/Login/auth.selectors';

export const TodolistsList = () => {
    const dispatch = useAppDispatch();
    // const tasks = useAppSelector<TasksStateType>((state) => state.tasks);
    const tasks = useSelector(selectTasks);
    // const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
    const isLoggedIn = useSelector(selectIsLoggedIn);
    // const todolists = useAppSelector<TodolistDomainType[]>((state) => state.todolists);
    const todolists = useSelector(selectTodolists);

    // Tasks
    const removeTask = useCallback((todolistId: string, id: string) => {
        dispatch(removeTaskTC(todolistId, id));
    }, []);
    const addTask = useCallback((todolistId: string, title: string) => {
        dispatch(addTasksTC(todolistId, title));
    }, []);
    const changeTaskStatus = useCallback(function (todolistId: string, id: string, status: TaskStatuses) {
        dispatch(updateTaskTC(todolistId, id, { status }));
    }, []);
    const changeTaskTitle = useCallback((id: string, taskId: string, title: string) => {
        dispatch(updateTaskTC(id, taskId, { title }));
    }, []);

    const changeFilter = useCallback((todolistId: string, filter: FilterType) => {
        dispatch(todolistActions.changeFilter({ todolistId, filter }));
    }, []);

    // Todolists
    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(removeTodolistTC(todolistId));
    }, []);

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title));
    }, []);

    const changeTodolistTitle = useCallback((id: string, title: string) => {
        dispatch(changeTodolistTitleTC(id, title));
    }, []);

    useEffect(() => {
        if (!isLoggedIn) return;
        dispatch(fetchTodolistsTC());
    }, []);

    if (!isLoggedIn) {
        return <Navigate to={'/login'} />;
    }

    return (
        <div className={s.app__container}>
            <div className={s.add__todolist}>
                <AddItemForm title={'+'} onEnterKey={addTodolist} addItem={addTodolist} />
            </div>
            {todolists.length ? (
                todolists.map((tdl) => {
                    let allTodolistTasks = tasks[tdl.id];
                    return (
                        <Todolist
                            entityStatus={tdl.entityStatus}
                            changeTodolistTitle={changeTodolistTitle}
                            removeTodolist={removeTodolist}
                            changeFilter={changeFilter}
                            todolistId={tdl.id}
                            title={tdl.title}
                            tasks={allTodolistTasks}
                            removeTask={removeTask}
                            addTask={addTask}
                            changeTaskStatus={changeTaskStatus}
                            changeTaskTitle={changeTaskTitle}
                            filter={tdl.filter}
                            key={tdl.id}
                        />
                    );
                })
            ) : (
                <h1 style={{ color: 'black' }}>to get started, create your first to-do list...</h1>
            )}
        </div>
    );
};
export type FilterType = 'all' | 'active' | 'complete';
