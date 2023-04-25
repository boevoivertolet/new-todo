import React from 'react';
import {MyInput} from "../MyInput/MyInput";
import {MyButton} from "../MyButton/MyButton";
import s from "./AddItemForm.module.scss";

export const AddItemForm: React.FC<AddItemFormProps> = (props) => {

    const {
        onChange,
        onClick,
        error,
        value,
        onEnterKey,
        placeholder,
        disabled,
        children,
        title,
        active,
        ...restProps
    } = props

    return (
        <div className={s.add__item__form}>
            <div className={s.input__button__block}>
                <MyInput callBack = {onChange} value = {value} onEnterKey = {onEnterKey} error = {error}
                         placeholder = {placeholder} />
                <MyButton callBack = {onClick}>{title}</MyButton>
            </div>

            {error && <span className = {s.error__message}>{error}</span>}
        </div>
    );
};
type AddItemFormProps = {
    error?: string | null
    onChange: (value: string) => void
    value: string
    onEnterKey: (key: string) => void
    placeholder?: string
    onClick: () => void
    disabled?: boolean
    children?: React.ReactNode
    title?: string
    active?: boolean
}
