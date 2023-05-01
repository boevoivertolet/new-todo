import React from 'react';
import s from './Task.module.scss';
import {MyCheckBox} from "../MyCheckBox/MyCheckBox";
import {EditableInput} from "../EditableInput/EditableInput";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

export const Task: React.FC<TaskProps> = (props) => {

    const {id, isDone, title, removeTask, todolistId, changeTaskStatus, ...restProps} = props
    const removeTaskHandler = (todolistId: string, id: string) => {
        removeTask(id, todolistId)

    }
    const onChangeCheckboxHandler = (todolistId: string, id: string, checked: boolean) => {
        changeTaskStatus(todolistId, id, checked)
    }


    return (
        <div className = {isDone ? `${s.task + ' ' + s.isDone}` : s.task} key = {id}>
            <MyCheckBox checked = {isDone}
                        callBack = {(checked) => onChangeCheckboxHandler(todolistId, id, checked)} />
            <EditableInput value = {title} />
            <DeleteForeverIcon style = {{color: '#16BCD6'}}
                               onClick = {() => removeTaskHandler(id, todolistId)}>-</DeleteForeverIcon>
        </div>
    );
};

type TaskProps = {
    todolistId: string
    id: string
    isDone: boolean
    title: string
    removeTask: (todolistId: string, id: string) => void
    changeTaskStatus: (todolistId: string, id: string, isDone: boolean) => void

}
