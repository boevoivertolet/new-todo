import React, {ChangeEvent, KeyboardEvent} from 'react';
import s from './MyInput.module.scss'

export const MyInput: React.FC<MyInputProps> = (props) => {
    const {callBack, value, onEnterKey, placeholder, error, ...restProps} = props

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        callBack(e.currentTarget.value)
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        onEnterKey(e.key)
    }


    return (
        <>
            <input className = {error ? s.error : s.input} type = {'text'} onChange = {onChangeHandler}
                   onKeyDown = {onKeyDownHandler} value = {value} placeholder = {placeholder} />

        </>

    );
};

type MyInputProps = {
    error?: string | null
    callBack: (value: string) => void
    value: string
    onEnterKey: (key: string) => void
    placeholder?: string

}
