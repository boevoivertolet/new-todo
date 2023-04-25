import React, {useState} from 'react';
import {MyInput} from "../MyInput/MyInput";
import s from './EditableInput.module.scss'

export const EditableInput: React.FC<EditableInputProps> = (props) => {

    const {...restProps} = props
    const [editMode, setEditMode] = useState<boolean>(false)
    const [value, setValue] = useState(restProps.value)

    const activateEditMod = () => {
        setEditMode(true)
    }

    const deActivateEditMod = () => {
        setEditMode(false)
    }


    return (
        <div className = {s.editable__input}>
            {!editMode
                ? <div onDoubleClick = {activateEditMod}>{value}</div>
                :
                <MyInput blurCallBack = {deActivateEditMod} callBack = {setValue} value = {value} onEnterKey = {() => {
                }} />

            }

        </div>
    );
};

type EditableInputProps = {
    value: string
}
