import React, {ChangeEvent, KeyboardEvent} from 'react';
import s from './MyInput.module.scss'

export const MyInput: React.FC<MyInputProps> = (props) => {
    const {callBack, value, onEnterKeyCallBack, placeholder, error, blurCallBack, ...restProps} = props

    const onChangeCallBackHandler = (e: ChangeEvent<HTMLInputElement>) => {
        callBack(e.currentTarget.value)
    }
    const onEnterKeyHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onEnterKeyCallBack(e.key)
        }
    }


    return (
        <>
            <input className = {error ? s.error : s.input} type = {'text'}
                   onBlur = {blurCallBack}
                   onChange = {onChangeCallBackHandler}
                   onKeyDown = {onEnterKeyHandler} value = {value} placeholder = {placeholder} autoFocus />

        </>

    );
};

type MyInputProps = {
    error?: string | null
    callBack: (value: string) => void
    value: string
    onEnterKeyCallBack: (key: string) => void
    placeholder?: string
    blurCallBack?: () => void


}
